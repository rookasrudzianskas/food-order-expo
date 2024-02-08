import {createContext, PropsWithChildren, useContext, useState} from "react";
import {CartItem, Product} from "@/types";
import { randomUUID } from 'expo-crypto';

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem['size']) => void;
  updateQuantity: (itemId: string, amount: 1 | -1) => void;
  total: number;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
});

export default function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([]);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const addItem = (product: Product, size: CartItem['size']) => {

  };

  const updateQuantity = (itemId: string, amount: 1 | -1) => {

  };

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
}
