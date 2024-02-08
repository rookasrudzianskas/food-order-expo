import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useLocalSearchParams, useRouter} from "expo-router";
import {Stack} from "expo-router";
import {Image} from "expo-image";
import Button from "@/src/components/ui/button";
import {PizzaSize} from "@/types";
import ThereIsNoProduct from "@/src/components/ui/no-product";
import {useCart} from "@/src/providers/cart-provider";
import {useProduct} from "@/src/api/products";

const SIZES: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
  const { data: product, error, isLoading } = useProduct(id);

  const { addItem } = useCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  const addToCart = () => {
    if (!product) {
      return;
    }
    // @ts-ignore
    addItem(product, selectedSize);
    router.push('/cart');
  };

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }
  if(!product) return <ThereIsNoProduct />;

  return (
    <View className="flex-1 bg-white p-3">
      {/* @ts-ignore */}
      <Stack.Screen options={{ title: product.name }} />
      <Image
        // @ts-ignore
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
