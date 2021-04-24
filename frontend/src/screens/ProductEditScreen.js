import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  const categoryList = useSelector((state) => state.categoryList);
  const { loadingCategory, errorCategory, categories } = categoryList;

  const dispatch = useDispatch();

  const currencyDetails = useSelector((state) => state.currencyDetails);
  const { error: currencyDetailsError } = currencyDetails;

  const currencyPrice = useSelector((state) => state.currencyPrice);
  const {
    loading: loadingCurrencyPrice,
    error: errorCurrencyPrice,
    countrycode,
  } = currencyPrice;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
      }
    }
  }, [dispatch, history, product, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        description,
        image,
        category,
        brand,
        countInStock,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };

      const {
        data: { image },
      } = await axios.post(`/api/upload/image`, formData, config);

      setImage(image);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <>
      <FormContainer>
        <Link to={`/admin/productlist`} className='btn btn-dark my-3'>
          Go Back
        </Link>
        <h1>Edit product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter product name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>
                {loadingCurrencyPrice ? (
                  <Loader />
                ) : errorCurrencyPrice || currencyDetailsError ? (
                  `Price (Rs)`
                ) : (
                  `Price (${countrycode.split('-')[0]})`
                )}
              </Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter product price'
                value={
                  loadingCurrencyPrice ? (
                    <Loader />
                  ) : errorCurrencyPrice || currencyDetailsError ? (
                    price
                  ) : (
                    (Number(countrycode.split('-')[1]) * price).toFixed(2)
                  )
                }
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='textarea'
                placeholder='Enter product description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter product image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter product brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as='select'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value=''>Select category</option>
                {loadingCategory ? (
                  <Loader />
                ) : errorCategory ? (
                  <Message variant='danger'>{errorCategory}</Message>
                ) : (
                  categories.map((category) => (
                    <option value={category._id}>{category.name}</option>
                  ))
                )}
              </Form.Control>
            </Form.Group>

            {/* <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter product category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group> */}
            <Form.Group controlId='countInStock'>
              <Form.Label>Inventory</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter inventory stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' onClick={submitHandler}>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
