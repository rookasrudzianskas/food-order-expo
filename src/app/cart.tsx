import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import {StatusBar} from "expo-status-bar";

const Cart = () => {
  return (
    <View>
      <Text>
        byrookas 🚀
      </Text>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default Cart;
