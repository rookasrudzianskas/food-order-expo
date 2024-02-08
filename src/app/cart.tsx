import React from 'react';
import {Text, View, Platform, FlatList} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {useCart} from "@/src/providers/cart-provider";
import CartListItem from "@/src/components/cart-list-item";

const Cart = () => {
  const { items } = useCart();
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <CartListItem cartItem={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default Cart;
