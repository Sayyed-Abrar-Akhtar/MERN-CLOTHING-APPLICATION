import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import categories from './data/categories.js';
import productsInAccessory from './data/accessory.js';
import productsInBlazer from './data/blazer.js';
import productsInDress from './data/dress.js';
import productsInFootwear from './data/footwear.js';
import productsInJacket from './data/jacket.js';
import productsInShirt from './data/shirt.js';
import productsInTrouser from './data/trouser.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import Category from './models/categoryModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();

    const createdUsers = await User.insertMany(users);
    const createdCategory = await Category.insertMany(categories);

    const adminUser = createdUsers[0]._id;

    // INSERT ALL PRODUCTS OF FOOTWEAR
    const footwearCategory = createdCategory[0]._id;
    const footwearProducts = productsInFootwear.map((product) => {
      return { ...product, user: adminUser, category: footwearCategory };
    });

    try {
      await Product.insertMany(footwearProducts);
    } catch (error) {
      console.error(error);
    }

    // INSERT ALL PRODUCTS OF ACCESSORY
    const accessoryCategory = createdCategory[1]._id;
    const accessoryProducts = productsInAccessory.map((product) => {
      return { ...product, user: adminUser, category: accessoryCategory };
    });

    try {
      await Product.insertMany(accessoryProducts);
    } catch (error) {
      console.error(error);
    }

    // INSERT ALL PRODUCTS OF JACKET
    const jacketCategory = createdCategory[2]._id;
    const jacketProducts = productsInJacket.map((product) => {
      return { ...product, user: adminUser, category: jacketCategory };
    });

    try {
      await Product.insertMany(jacketProducts);
    } catch (error) {
      console.error(error);
    }

    // INSERT ALL PRODUCTS OF BLAZER
    const blazerCategory = createdCategory[3]._id;
    const blazerProducts = productsInBlazer.map((product) => {
      return { ...product, user: adminUser, category: blazerCategory };
    });

    try {
      await Product.insertMany(blazerProducts);
    } catch (error) {
      console.error(error);
    }

    // INSERT ALL PRODUCTS OF DRESS
    const dressCategory = createdCategory[4]._id;
    const dressProducts = productsInDress.map((product) => {
      return { ...product, user: adminUser, category: dressCategory };
    });

    try {
      await Product.insertMany(dressProducts);
    } catch (error) {
      console.error(error);
    }

    // INSERT ALL PRODUCTS OF TROUSER
    const trouserCategory = createdCategory[5]._id;
    const trouserProducts = productsInTrouser.map((product) => {
      return { ...product, user: adminUser, category: trouserCategory };
    });

    try {
      await Product.insertMany(trouserProducts);
    } catch (error) {
      console.error(error);
    }

    // INSERT ALL PRODUCTS OF SHIRT
    const shirtCategory = createdCategory[6]._id;
    const shirtProducts = productsInShirt.map((product) => {
      return { ...product, user: adminUser, category: shirtCategory };
    });

    try {
      await Product.insertMany(shirtProducts);
    } catch (error) {
      console.error(error);
    }

    console.log(`Data imported!`.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`$error`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();

    console.log(`Data destroyed!`.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
