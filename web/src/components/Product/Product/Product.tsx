/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './style.css'

import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import type {
  DeleteProductMutationVariables,
  FindProductById,
} from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ReturnPage from 'src/components/returnPage'

const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProductMutation($id: Int!) {
    deleteProduct(id: $id) {
      id
    }
  }
`

interface Props {
  product: NonNullable<FindProductById['product']>
}

const Product = ({ product }: Props) => {
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
    onCompleted: () => {
      toast.success('Product deleted')
      navigate(routes.products())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteProductMutationVariables['id']) => {
    if (confirm('Você quer deletar esse produto da lista?')) {
      deleteProduct({ variables: { id } })
    }
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
        gap={'2.5rem'}
      >
        <Center w={'100%'} h={'auto'}>
          <Heading
            as="h2"
            color={'white'}
            fontWeight={'bold'}
            cursor={'default'}
          >
            Produto {product.name}
          </Heading>
        </Center>

        <Center w={'100%'} h={'auto'}>
          <Box w={'100%'} p={'6'}>
            <Box
              w={'100%'}
              p={'4'}
              textAlign={'center'}
              bg={'whiteAlpha.700'}
              borderRadius={'10px'}
              className="product_box"
            >
              <Box
                w={'100%'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Heading
                  as="h3"
                  fontSize={'1.4rem'}
                  fontWeight={'bold'}
                  textAlign={'center'}
                >
                  {product.name}
                </Heading>

                <img
                  src={product.image}
                  alt={`Produto ${product.name}`}
                  className="view_product_image"
                />

                <Stack gap={'1rem'}>
                  <Text fontSize={'1.2rem'} textAlign={'center'}>
                    Marca: <strong>{product.brand}</strong>
                  </Text>

                  <Text fontSize={'1.2rem'} textAlign={'center'}>
                    Preço: R$ <strong>{product.price}</strong>
                  </Text>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Center>

        <Center w={'100%'} h="auto">
          <nav className="rw-button-group">
            <Stack as="div" gap={'2rem'} direction={'row'}>
              <Link to={routes.editProduct({ id: product.id })}>
                <Button
                  type="button"
                  variant={'solid'}
                  color={'white'}
                  colorScheme="blue"
                >
                  Atualizar
                </Button>
              </Link>

              <Button
                type="button"
                variant={'solid'}
                color={'white'}
                colorScheme="red"
                onClick={() => onDeleteClick(product.id)}
              >
                Apagar
              </Button>
            </Stack>
          </nav>
        </Center>
      </Flex>
    </Container>
  )
}

export default Product
