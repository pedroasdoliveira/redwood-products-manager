export const schema = gql`
  type Product {
    id: Int!
    name: String!
    brand: String!
    price: Float!
    image: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    products: [Product!]! @requireAuth
    product(id: Int!): Product @requireAuth
  }

  input CreateProductInput {
    name: String!
    brand: String!
    price: Float!
    image: String!
  }

  input UpdateProductInput {
    name: String
    brand: String
    price: Float
    image: String
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product! @requireAuth
    updateProduct(id: Int!, input: UpdateProductInput!): Product! @requireAuth
    deleteProduct(id: Int!): Product! @requireAuth
  }
`
