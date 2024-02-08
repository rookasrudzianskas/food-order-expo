import {createContext, PropsWithChildren, useContext, useState} from "react";
import {CartItem, Tables} from "@/types";
import { randomUUID } from 'expo-crypto';
import {useInsertOrder} from "@/src/api/orders";
import {useRouter} from "expo-router";
import {useInsertOrderItems} from "@/src/api/order-items";

type Product = Tables<'products'>;

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem['size']) => void;
  updateQuantity: (itemId: string, amount: 1 | -1) => void;
  total: number;
  checkout: () => void;
  saveOrderItems: (order: Tables<'orders'>) => void;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
  saveOrderItems: () => {},
});

export default function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { mutate: insertOrder }= useInsertOrder();
  const { mutate: insertOrderItems }= useInsertOrderItems();
  const router = useRouter();
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const checkout = () => {
    console.warn('Checkout not implemented');
    insertOrder({
      total,
    }, {
      onSuccess: (data) => {
        saveOrderItems(data);
      }
    })
  }

  const addItem = (product: Product, size: CartItem['size']) => {
    const existingItem = items.find(
      (item) => item.product.id === product.id && item.size === size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newItem: CartItem = {
      id: randomUUID(),
      product_id: product.id,
      // @ts-ignore
      product,
      size,
      quantity: 1
    };

    setItems((prevItems) => [...prevItems, newItem]);
  };

  const updateQuantity = (itemId: string, amount: 1 | -1) => {
    setItems((existingItems) =>
      existingItems
        .map((it) =>
          it.id === itemId ? { ...it, quantity: it.quantity + amount } : it
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const saveOrderItems = (order: Tables<'orders'>) => {
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product.id,
      size: item.size,
      quantity: item.quantity,
    }));

    insertOrderItems(orderItems, {
      onSuccess: () => {
        setItems([]);
        router.push(`/(user)/orders/${order.id}`);
      }
    })
  }

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total, checkout, saveOrderItems }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
}
