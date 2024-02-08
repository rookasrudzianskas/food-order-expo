import React, {useContext} from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {useCart} from "@/src/providers/cart-provider";

const Cart = () => {
  const { items } = useCart();
  return (
    <View>
      <Text>
        byrookas 🚀 {items.length}
      </Text>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default Cart;
