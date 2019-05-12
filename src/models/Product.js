import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
  title: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    default: 1
  },
  stock: {
    type: Number,
    required: true,
    default: 10,
    min: 0,
    max: 100
  }
});

export const Product = mongoose.model('products', productSchema);
