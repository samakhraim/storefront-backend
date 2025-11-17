import { ProductStore } from '../models/product'

const store = new ProductStore()

describe('Product Model', () => {
  let createdProductIds: number[] = []

  it('should have all CRUD methods defined', () => {
    expect(store.index).toBeDefined()
    expect(store.create).toBeDefined()
    expect(store.show).toBeDefined()
    expect(store.update).toBeDefined()
    expect(store.delete).toBeDefined()
  })

  it('create method should add multiple products', async () => {
    const products = [
      { name: 'Book', price: 15 },
      { name: 'Laptop', price: 1999 },
      { name: 'Smartphone', price: 899 },
      { name: 'Wireless Headphones', price: 250 },
      { name: 'Gaming Mouse', price: 79 },
      { name: 'Smartwatch', price: 350 },
      { name: 'Camera', price: 1100 },
      { name: 'Tablet', price: 550 },
      { name: 'External Hard Drive', price: 120 },
      { name: 'Bluetooth Speaker', price: 180 }
    ]

    for (const product of products) {
      const result = await store.create(product)

      // ✅ Safety check
      if (!result) {
        fail(`Product creation failed for ${product.name}`)
        return
      }

      expect(result.name).toBe(product.name)
      expect(result.price).toBe(product.price)

      if (typeof result.id === 'number') {
        createdProductIds.push(result.id)
      } else {
        fail(`Product ID missing for ${product.name}`)
      }

      console.log(`✅ Created product: ${product.name}`)
    }

    expect(createdProductIds.length).toBe(products.length)
  })

  it('index method should return a list of all products', async () => {
    const result = await store.index()

    expect(result).toBeDefined()
    expect(result.length).toBeGreaterThan(0)

    const first = result[0]
    // ✅ Type guard to satisfy strict TypeScript
    if (first === undefined) {
      throw new Error('No products returned from index()')
    }

    expect(first.name).toBeDefined()
    expect(first.price).toBeGreaterThan(0)
  })

  it('show method should return a specific product by id', async () => {
    const id = createdProductIds[0]
    if (id === undefined) {
      throw new Error('No product ID found in test setup')
    }

    const product = await store.show(id.toString())
    if (!product) throw new Error('Product not found')

    expect(product.id).toBe(id)
    expect(product.name).toBeDefined()
    expect(product.price).toBeGreaterThan(0)
  })

  it('update method should modify a product', async () => {
    const id = createdProductIds[0]
    if (id === undefined) {
      throw new Error('No product ID found to update')
    }

    const updatedData = { name: 'Updated Book', price: 20 }
    const result = await store.update(id.toString(), updatedData)

    if (!result) throw new Error('Update failed')

    expect(result.name).toBe('Updated Book')
    expect(result.price).toBe(20)
  })

  it('delete method should remove a product', async () => {
    const id = createdProductIds[createdProductIds.length - 1]
    if (id === undefined) {
      throw new Error('No product ID found to delete')
    }

    const result = await store.delete(id.toString())
    if (!result) throw new Error('Delete failed')

    expect(result.id).toBe(id)

    // Confirm product is deleted
    const remaining = await store.index()
    const deleted = remaining.find((p) => p.id === id)
    expect(deleted).toBeUndefined()
  })
})
