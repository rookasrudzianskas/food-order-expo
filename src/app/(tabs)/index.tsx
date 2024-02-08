import {Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import products from '../../../assets/data/products';
import Colors from "@/src/constants/Colors";

const TabOneScreen = () => {
  const product = products[0];

  return (
    <View className="bg-gray-100 flex-1 p-3 items-center justify-center">
      <Image
        source={{ uri: product.image }}
        style={{
          width: 100,
          height: 100,
        }}
      />
      <Text className="text-xl font-semibold mb-2">{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default TabOneScreen;

const styles = StyleSheet.create({
  price: {
    fontWeight: '600',
    color: Colors.light.tint,
  }
})
