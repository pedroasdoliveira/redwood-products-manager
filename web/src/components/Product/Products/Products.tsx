/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from '@chakra-ui/react'
import type {
  DeleteProductMutationVariables,
  FindProducts,
} from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Product/ProductsCell'

const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProductMutation($id: Int!) {
    deleteProduct(id: $id) {
      id
    }
  }
`

const ProductsList = ({ products }: FindProducts) => {
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
    onCompleted: () => {
      toast.success('Produto deletado!')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteProductMutationVariables['id']) => {
    if (confirm('Tem certeza que deseja deletar o produto' + id + '?')) {
      deleteProduct({ variables: { id } })
    }
  }

  return (
    <Container
      as="main"
      maxW={'100%'}
      h={'100%'}
      p={'10'}
    ></Container>
  )
}

export default ProductsList
