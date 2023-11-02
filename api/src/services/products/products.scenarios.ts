import type { Prisma, Product } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ProductCreateArgs>({
  product: {
    one: {
      data: {
        name: 'String',
        brand: 'String',
        price: 2286899.074206985,
        image: 'String',
        updatedAt: '2023-10-31T23:09:10.048Z',
      },
    },
    two: {
      data: {
        name: 'String',
        brand: 'String',
        price: 7295703.56675411,
        image: 'String',
        updatedAt: '2023-10-31T23:09:10.048Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Product, 'product'>
