import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
// Bring in Model
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @rout    GET /api/products
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
  const products = await Product.find({})

  res.json(products)
}))

// @desc    Fetch single product
// @rout    GET /api/products/:id
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found!')
  }
}))

export default router;
