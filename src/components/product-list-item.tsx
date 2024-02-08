import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Image} from "expo-image";
import Colors from "@/src/constants/Colors";
import {Product} from "@/types";
import {useRouter} from "expo-router";

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({product}: ProductListItemProps) => {
  const router = useRouter()
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() => router.push(`/${product.id}`)}
      className="bg-white flex-1 p-3 rounded-xl"
    >
      <Image
        source={product.image}
        style={styles.image}
        contentFit="cover"
        transition={1000}
      />
      <Text className="text-xl font-semibold mb-2">{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </TouchableOpacity>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1.84,

    elevation: 5,
    maxWidth: '50%',
  },
  price: {
    fontWeight: '600',
    color: Colors.light.tint,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  }
})
