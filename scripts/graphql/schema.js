import { buildSchema } from 'graphql';

const ProductSchema = buildSchema(`
  type Product {
    id: ID!,
    title: String,
    desc: String,
    code: String,
    thumbnail: String,
    price: Int,
    timestamp: String,
    stock: Int
  }
  input ProductInput {
    title: String,
    desc: String,
    code: String,
    thumbnail: String,
    price: Int,
    timestamp: String,
    stock: Int
  }
  type Query {
    getData: [Product],
    returnProductById (id: ID!): [Product],
  }

  type Mutation {
    saveProduct (title: String, price: Int, thumbnail: String, timestamp: String, desc: String, stock: Int, code: String): Product, 
    updateProduct (id: ID!, title: String, price: Int, thumbnail: String, timestamp: String, desc: String, stock: Int, code: String): Product, 
    deleteProductById (id: ID!): Product,
  }
`);

export default ProductSchema;
