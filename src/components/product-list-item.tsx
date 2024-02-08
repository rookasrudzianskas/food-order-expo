import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Image} from "expo-image";
import Colors from "@/src/constants/Colors";

type Product = {
  product: {
    image: string;
    price: number;
    name: string;
  }
}

const ProductListItem = ({product}: Product) => {
  return (
    <View className="bg-white p-3 rounded-xl">
      <Image
        source={product.image}
        style={styles.image}
        contentFit="cover"
        transition={1000}
      />
      <Text className="text-xl font-semibold mb-2">{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  price: {
    fontWeight: '600',
    color: Colors.light.tint,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  }
})
