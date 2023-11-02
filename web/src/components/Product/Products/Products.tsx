/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './style.css'

import { useState } from 'react'

import { SearchIcon, SmallAddIcon } from '@chakra-ui/icons'
import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import type {
  DeleteProductMutationVariables,
  FindProducts,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { QUERY } from '../EditProductCell'

const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProductMutation($id: Int!) {
    deleteProduct(id: $id) {
      id
    }
  }
`

const ProductsList = ({ products }: FindProducts) => {
  const [search, setSearch] = useState<string>('')
  const [searchProduct, setSearchProduct] = useState<string>('')

  const handleSearch = () => {
    setSearchProduct(search)
  }

  const navigateProduct = (id: number) => {
      navigate(routes.product({id}), {replace: true})
  }

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
      px={'8'}
      py={'12'}
      style={{ backgroundColor: '#212529' }}
    >
      <Flex
        as="section"
        width={'100%'}
        h={'auto'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={'5rem'}
      >
        <Box
          as="div"
          w={'60%'}
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-around'}
          gap={'3rem'}
        >
          <Input
            placeholder="Pesquisar o nome do produto..."
            bg={'whiteAlpha.800'}
            color={'blackAlpha.900'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <IconButton
            aria-label="Search database"
            icon={<SearchIcon />}
            colorScheme="gray"
            onClick={handleSearch}
          />
        </Box>

        <Center width={'100%'} h={'auto'}>
          <Heading as="h2" color={'white'} fontWeight={"bold"} cursor={'default'}>
            {products.length} produtos disponíveis
          </Heading>
        </Center>

        <Center width={'100%'} h={'auto'}>
          <Grid
            w={'100%'}
            templateColumns="repeat(3, 1fr)"
            templateRows={'auto'}
            p={'6'}
            gap={10}
          >
            {products
              .filter((product) => {
                if (searchProduct === '') {
                  return product
                } else if (
                  product.name
                    .toLowerCase()
                    .includes(searchProduct.toLowerCase())
                ) {
                  return product
                }
              })
              .map((product) => (
                <GridItem
                  key={product.id}
                  w={'100%'}
                  minH={'415px'}
                  p={'4'}
                  textAlign={'center'}
                  bg={'whiteAlpha.900'}
                  borderRadius={'10px'}
                  className="grid_item"
                  onClick={() => navigateProduct(product.id)}
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
                      className="product_img"
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
                </GridItem>
              ))}
          </Grid>
        </Center>

        <Link to={routes.newProduct()}>
          <IconButton
            isRound={true}
            variant="solid"
            colorScheme="gray"
            aria-label="Create"
            fontSize="3rem"
            w={'80px'}
            h={'80px'}
            icon={<SmallAddIcon />}
          />
        </Link>
      </Flex>
    </Container>
  )
}

export default ProductsList
