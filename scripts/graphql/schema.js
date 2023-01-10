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
    getDataById (id: ID!): Product,
  }

  type Mutation {
    saveData (data: ProductInput): Product, 
    updateDataById (id: ID!): Product, 
    deleteI (id: ID!): Product,
  }
`);

export default ProductSchema;
