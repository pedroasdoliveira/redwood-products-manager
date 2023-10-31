import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditProductById, UpdateProductInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormProduct = NonNullable<EditProductById['product']>

interface ProductFormProps {
  product?: EditProductById['product']
  onSave: (data: UpdateProductInput, id?: FormProduct['id']) => void
  error: RWGqlError
  loading: boolean
}

const ProductForm = (props: ProductFormProps) => {
  const onSubmit = (data: FormProduct) => {
    props.onSave(data, props?.product?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormProduct> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.product?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="brand"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Brand
        </Label>

        <TextField
          name="brand"
          defaultValue={props.product?.brand}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="brand" className="rw-field-error" />

        <Label
          name="price"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Price
        </Label>

        <TextField
          name="price"
          defaultValue={props.product?.price}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="price" className="rw-field-error" />

        <Label
          name="image"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Image
        </Label>

        <TextField
          name="image"
          defaultValue={props.product?.image}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="image" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ProductForm
