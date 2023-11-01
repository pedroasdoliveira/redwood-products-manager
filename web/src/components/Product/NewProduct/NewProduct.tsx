/* eslint-disable @typescript-eslint/no-unused-vars */

import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  IconButton,
} from '@chakra-ui/react'
import { toast } from 'react-toastify'
import type { CreateProductInput } from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import ProductForm from 'src/components/Product/ProductForm'

const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProductMutation($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
    }
  }
`

const NewProduct = () => {
  const [createProduct, { loading, error }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      onCompleted: () => {
        // toast.success('Produto criado e adicionada na listagem!', {
        //   position: 'top-right',
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        // })
        alert('Produto criado e adicionada na listagem!')

        navigate(routes.products())
      },
      onError: (error) => {
        // toast.error(`Erro ao salvar informações: ${error.message}`, {
        //   position: 'top-right',
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        // })
        alert(`Erro ao salvar informações: ${error.message}`)
      },
    }
  )

  const onSave = (input: CreateProductInput) => {
    createProduct({ variables: { input } })
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
      <Box as="div" w={'100%'} marginBottom={'1rem'}>
        <Link to={routes.products()}>
          <IconButton
            isRound={true}
            variant="solid"
            colorScheme="gray"
            aria-label="Create"
            fontSize="1.5rem"
            w={'40px'}
            h={'40px'}
            icon={<ArrowBackIcon />}
          />
        </Link>
      </Box>

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
          <Heading as="h2" size={'lg'} color={'white'}>
            Adicionar novo produto
          </Heading>
        </Center>

        <Center w={'100%'}>
          <ProductForm onSave={onSave} loading={loading} error={error} />
        </Center>
      </Flex>
    </Container>
  )
}

export default NewProduct
