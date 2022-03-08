/** 
 * 
 * To Import Data to mongoDB then destroy these files after import
 * 
*/

import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors'
import users from './data/users.js';
import products from "./data/products.js";
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from "./config/db";

dotenv.config();

connectDB();

// Since we're dealing with mongoose/Database everything returns a promise so we use async/await
const importData = async () => {
  try {
    // wipeout
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // import users, createdUsers=[{users}]
    const createdUsers = await User.insertMany(users);

    // get the first item in the createdUser which is admin
    const adminUser = createdUsers[0]._id;

    // products
    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser
      }
    })

    // insert products to DB
    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse);

    // exit from the porocess after importing
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse)
    // if any error exit with error = 1
    process.exit(1)
  }
}




// DESTROY DATA
const destroyData = async () => {
  try {
    // wipeout
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.green.red);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse)
    // if any error exit with error = 1
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
