import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const products: QueryResolvers['products'] = () => {
  return db.product.findMany()
}

export const product: QueryResolvers['product'] = ({ id }) => {
  return db.product.findUnique({
    where: { id },
  })
}

export const createProduct: MutationResolvers['createProduct'] = ({
  input,
}) => {
  return db.product.create({
    data: input,
  })
}

export const updateProduct: MutationResolvers['updateProduct'] = ({
  id,
  input,
}) => {
  return db.product.update({
    data: input,
    where: { id },
  })
}

export const deleteProduct: MutationResolvers['deleteProduct'] = ({ id }) => {
  return db.product.delete({
    where: { id },
  })
}
