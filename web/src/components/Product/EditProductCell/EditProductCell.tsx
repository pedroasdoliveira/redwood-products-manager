import { Center, Container, Flex, Heading } from '@chakra-ui/react'
import type { EditProductById, UpdateProductInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ProductForm from 'src/components/Product/ProductForm'
import ReturnPage from 'src/components/returnPage'

export const QUERY = gql`
  query EditProductById($id: Int!) {
    product: product(id: $id) {
      id
      name
      brand
      price
      image
      createdAt
      updatedAt
    }
  }
`
const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProductMutation($id: Int!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      brand
      price
      image
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Carregando...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ product }: CellSuccessProps<EditProductById>) => {
  const [updateProduct, { loading, error }] = useMutation(
    UPDATE_PRODUCT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Product updated')
        navigate(routes.products())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateProductInput,
    id: EditProductById['product']['id']
  ) => {
    updateProduct({ variables: { id, input } })
  }

  return (
    <Container
      as="main"
      maxW={'100%'}
      h={'100%'}
      px={'8'}
      py={'12'}
      style={{ backgroundColor: '#212529' }}
    >
      <ReturnPage />

      <Flex
        as="section"
        width={'100%'}
        h={'auto'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={'3rem'}
      >
        <Center w={'100%'}>
          <Heading as="h2" size={'lg'} fontWeight={'bold'} color={'white'}>
            Editar o Produto {product.name}
          </Heading>
        </Center>

        <Center w={'100%'}>
          <ProductForm
            product={product}
            onSave={onSave}
            error={error}
            loading={loading}
          />
        </Center>
      </Flex>
    </Container>
  )
}
