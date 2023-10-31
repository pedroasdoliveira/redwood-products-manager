/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

type ProductsType = {
  name: string
  brand: string
  price: number
  image: string
}

export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //
    const products: ProductsType[] = [
      {
        name: 'Coca-cola 2L',
        brand: 'Coca-cola',
        price: 10.9,
        image:
          'https://files.passeidireto.com/1777ee32-579a-43f2-b69c-1487eb962bf6/1777ee32-579a-43f2-b69c-1487eb962bf6.png',
      },
      {
        name: 'Guarana Antarctica 2L',
        brand: 'AmBev',
        price: 8.9,
        image:
          'https://choppbrahmaexpress.vtexassets.com/arquivos/ids/155720/guaran_2.png?v=637353454730230000',
      },
      {
        name: 'Pepsi 2L',
        brand: 'Pepsico Inc',
        price: 9.9,
        image:
          'https://giassi.vtexassets.com/arquivos/ids/644048/Refrigerante-Cola-Pepsi-Garrafa-2l.png?v=638211560060330000',
      },
      {
        name: 'Macarrão Penne',
        brand: 'Barilla',
        price: 10.9,
        image:
          'https://www.barilla.com//-/media/images/pt_br/products/cards/massa-com-ovos/novo/fb_aw_3d_11154_swwe_penne_500g_blu_v1.png?la=pt-BR',
      },
      {
        name: 'Atum Ralado em óleo Enlatado',
        brand: 'Gomes da Costa',
        price: 8.7,
        image:
          'https://www.castelao.com.br/media/catalog/product/cache/1/image/600x392.53731343284/9df78eab33525d08d6e5fb8d27136e95/a/t/atum_ralado_gomes_lata_170.png',
      },
    ]

    console.log(
      "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
    )

    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    await Promise.all(
      products.map(async (data: ProductsType) => {
        const record = await db.product.createMany({ data })

        console.log(record)
      })
    )
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
