import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  Image,
} from 'react-bootstrap';
import { logout } from '../actions/userActions';
import { getCurrencyDetails } from '../actions/currencyActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import SearchBox from '../components/SearchBox';

const Header = () => {
  const dispatch = useDispatch();

  const [code, setCode] = useState('Rs-1');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const currencyDetails = useSelector((state) => state.currencyDetails);
  const {
    loading: currencyLoading,
    error: currencyError,
    currency,
  } = currencyDetails;

  useEffect(() => {
    dispatch(getCurrencyDetails(code));
  }, [dispatch, code]);

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar
        bg='dark'
        variant='dark'
        expand='lg'
        collapseOnSelect
        className='menubar'
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand href='#'>
              <img
                alt=''
                src='/logo.svg'
                height='45'
                className='d-inline-block align-top'
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ml-auto'>
              <NavDropdown
                title='currency'
                id='currency'
                className='currency--container'
              >
                {currencyLoading ? (
                  <Loader />
                ) : currencyError ? (
                  <Message variant='danger'>"Failed to load"</Message>
                ) : (
                  currency.map((item) => (
                    <Nav.Item className='currency' key={item.name}>
                      <Form.Label className='btn btn-dark sm btn-block btn-currency'>
                        {item.name}
                        <Form.Check
                          hidden
                          name='currency'
                          type='radio'
                          id={item.name}
                          value={
                            item.symbol !== undefined
                              ? `${item.symbol}-${item.rate}`
                              : `${item.name}-${item.rate}`
                          }
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </Form.Label>
                    </Nav.Item>
                  ))
                )}
              </NavDropdown>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i>&nbsp;Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo && (
                <LinkContainer to='/profile'>
                  <Nav.Item className='nav-profile'>
                    <Image
                      fluid
                      src={userInfo.image}
                      roundedCircle
                      className='profile-image'
                    />
                  </Nav.Item>
                </LinkContainer>
              )}
              {userInfo ? (
                <NavDropdown title={userInfo.lastName} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i>&nbsp;Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
