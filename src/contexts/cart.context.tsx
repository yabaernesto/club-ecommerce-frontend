import { ReactNode, createContext, useMemo, useState } from 'react'

import CartProduct from '../types/cart.types'
import Product from '../types/product.types'

interface ICartContext {
  isVisible: boolean
  productsTotalPrice: number
  products: CartProduct[]
  toggleCart: () => void
  addProductToCart: (product: Product) => void
  removeProductFromCart: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
  decreaseProductQuantity: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  productsTotalPrice: 0,
  products: [],
  toggleCart: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {}
})

interface CartContextProps {
  children: ReactNode
}

const CartContextProvider = ({ children }: CartContextProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<CartProduct[]>([])

  const productsTotalPrice = useMemo(() => {
    return products.reduce((acc, currentProduct) => {
      return acc + currentProduct.price * currentProduct.quantity
    }, 0)
  }, [products])

  const toggleCart = () => {
    setIsVisible((prevState) => !prevState)
  }

  // adicionar produto ao carrinho
  const addProductToCart = (product: Product) => {
    // verificar se o produto ja esta no carrinho
    const productIsAlreadyInCart = products.some(
      (item) => item.id === product.id
    )

    // se sim, aumentar sua quantidade
    if (productIsAlreadyInCart) {
      return setProducts((products) =>
        products.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    }

    // se nao -> adiciona-lo
    setProducts((prevState) => [...prevState, { ...product, quantity: 1 }])
  }

  // remover produto do carrinho
  const removeProductFromCart = (productId: string) => {
    setProducts(products =>
      products.filter((product) => product.id !== productId)
    )
  }

  // aumentar a quantidade do produto
  const increaseProductQuantity = (productId: string) {
    setProducts(products => 
      products.map((product) => 
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    )
  }

  // diminuir a quantidade do produto
  const decreaseProductQuantity = (productId: string) => {
    setProducts(products =>
      products.map(product => 
        product.id === productId ? { ...product, quantity: product.quantity - 1}
        : product
      )
      .filter(product => product.quantity > 0)
    )
  }

  return (
    <CartContext.Provider
      value={{
        isVisible,
        products,
        productsTotalPrice,
        toggleCart,
        addProductToCart,
        removeProductFromCart,
        increaseProductQuantity,
        decreaseProductQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
