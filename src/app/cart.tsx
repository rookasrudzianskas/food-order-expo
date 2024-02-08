import React from 'react';
import {Text, View, Platform, FlatList} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {useCart} from "@/src/providers/cart-provider";
import CartListItem from "@/src/components/cart-list-item";
import Button from '../components/ui/button';

const Cart = () => {
  const { items , total } = useCart();

  if(items.length === 0) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <Text className="font-semibold text-xl">
          Your cart is empty
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View className="flex flex-1">
        <FlatList
          data={items}
          renderItem={({item}) => (
            <CartListItem cartItem={item} />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 10, gap: 10 }}
        />
      </View>

      <View className="px-3 mb-10">
        <View>
          <Text className="text-xl font-semibold pt-1">Total: ${total.toFixed(2)}</Text>
        </View>
        <Button text="Checkout" />
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default Cart;
