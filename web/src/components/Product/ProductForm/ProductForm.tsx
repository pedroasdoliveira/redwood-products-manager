/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './style.css'

import { useEffect, useState } from 'react'

import {
  FormControl,
  Stack,
  Input,
  FormHelperText,
  Box,
  Flex,
} from '@chakra-ui/react'
import type { EditProductById, UpdateProductInput } from 'types/graphql'
import * as Yup from 'yup'

import { Form, FormError, FieldError, Submit } from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormProduct = NonNullable<EditProductById['product']>

interface ProductFormProps {
  product?: EditProductById['product']
  onSave: (data: UpdateProductInput, id?: FormProduct['id']) => void
  error: RWGqlError
  loading: boolean
}

type ProductType = {
  name: string
  brand: string
  price: number
  image: string
}

const ProductForm = (props: ProductFormProps) => {
  const [product, setProduct] = useState<ProductType>({
    name: '',
    brand: '',
    price: 0,
    image: '',
  })

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('O nome do produto é obrigatorio!'),
    brand: Yup.string().required('Coloque o nome da marca do produto!'),
    price: Yup.number()
      .required('Coloque o valor do produto!')
      .moreThan(0, 'O preço do ser maior do que zero!'),
    image: Yup.string().required('Coloque uma image do produto!'),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, value } = e.target

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }))
  }

  useEffect(() => {
    if (typeof props.product !== 'undefined') {
      setProduct({
        name: props.product.name,
        brand: props.product.brand,
        price: props.product.price,
        image: props.product.image,
      })
    } else {
      setProduct({
        name: '',
        brand: '',
        price: 0,
        image: '',
      })
    }
  }, [props.product])

  const onSubmit = async () => {
    try {
      if (typeof product.price === 'string') {
        const priceFloat = parseFloat(product.price)

        product.price = priceFloat
      }
      console.log(product)

      await validationSchema.validate(product, { abortEarly: false })

      if (typeof props.product !== 'undefined') {
        // Para atualizar
        props.onSave(product, props.product.id)
      }

      props.onSave(product, props?.product?.id) // Para criar
    } catch (error) {
      alert(`Erro ao cadastrar informações do formulario: ${error.message}`)
      console.error(error)
    }
  }

  return (
    <Flex
      as="div"
      w="80%"
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={'2rem'}
    >
      <Box
        as="div"
        w={'100%'}
        p={'8'}
        bg={'teal.800'}
        style={{ border: '1px solid transparent', borderRadius: '15px' }}
      >
        <Form<FormProduct>
          onSubmit={onSubmit}
          error={props.error}
          style={{ width: '100%' }}
        >
          <FormError
            error={props.error}
            wrapperClassName="rw-form-error-wrapper"
            titleClassName="rw-form-error-title"
            listClassName="rw-form-error-list"
          />

          <FormControl isRequired>
            <Stack gap={'2rem'}>
              <Input
                type="text"
                name="name"
                placeholder="Nome do produto*"
                bg={'whiteAlpha.900'}
                color={'black'}
                value={product.name}
                onChange={handleChange}
              />
              <FieldError name="name" className="rw-field-error" />

              <Input
                type="text"
                name="brand"
                placeholder="Marca do produto*"
                bg={'whiteAlpha.900'}
                color={'black'}
                value={product.brand}
                onChange={handleChange}
              />
              <FieldError name="brand" className="rw-field-error" />

              <Box>
                <Input
                  type="text"
                  name="price"
                  placeholder="Valor do produto*"
                  bg={'whiteAlpha.900'}
                  color={'black'}
                  value={product.price}
                  onChange={handleChange}
                />
                <FormHelperText color={'black'} fontWeight={'bold'}>
                  Ex: 10.90
                </FormHelperText>

                <FieldError name="price" className="rw-field-error" />
              </Box>

              <Box>
                <Input
                  type="text"
                  name="image"
                  placeholder="Link da image do produto produto*"
                  bg={'whiteAlpha.900'}
                  color={'black'}
                  value={product.image}
                  onChange={handleChange}
                />
                <FormHelperText color={'black'} fontWeight={'bold'}>
                  Utilize o link de uma imagem salva ou do google (preferencia
                  PNG).
                </FormHelperText>

                <FieldError name="image" className="rw-field-error" />
              </Box>
            </Stack>
          </FormControl>

          <Box className="rw-button-group">
            <Submit
              disabled={props.loading}
              className="rw-button rw-button-blue submit_btn"
            >
              {typeof props.product !== 'undefined' ? 'Atualizar' : 'Cadastrar'}
            </Submit>
          </Box>
        </Form>
      </Box>
    </Flex>
  )
}

export default ProductForm
