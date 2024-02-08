import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useLocalSearchParams} from "expo-router";
import products from "@/assets/data/products";
import {Stack} from "expo-router";
import {Image} from "expo-image";
import Button from "@/src/components/ui/button";
import {PizzaSize} from "@/types";

const SIZES: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const product = products.find((product) => product.id.toString() === id);
  const [selectedSize, setSelectedSize] = useState<PizzaSize | null>('M');

  const addToCart = () => {
    if(!selectedSize || !product) return;
    console.log('Added to cart:', product?.name, selectedSize);
  }

  if(!product) {
    return (
      <View className="flex-1 flex items-center justify-center">
        <Text className="text-lg font-semibold">
          Product not found
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-3">
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={product.image}
        style={styles.image}
        contentFit="cover"
        transition={1000}
      />
      <View className="px-3 flex-1">
        <View className="flex-1">
          <Text className="text-xl font-semibold">Select size:</Text>
          <View style={styles.sizes} className="my-5 flex-1">
            {SIZES.map((size) => (
              <TouchableOpacity
                onPress={() => setSelectedSize(size)}
                key={size}
                className="w-10 h-10 rounded-full items-center justify-center border-1 border-gray-200"
                style={
                  {
                    backgroundColor: size === selectedSize ? 'gainsboro' : 'white',
                  }
                }
              >
                <Text
                  className="text-lg font-semibold"
                  style={{ color: size === selectedSize ? 'black' : 'gray' }}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <>
          <Text className="text-xl font-semibold">Price: ${product.price.toFixed(2)}</Text>
          <Button onPress={addToCart} text="Add to cart" />
        </>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
})
