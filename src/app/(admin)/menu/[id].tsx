import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {Link, useLocalSearchParams, useRouter} from "expo-router";
import {Stack} from "expo-router";
import {Image} from "expo-image";
import Button from "@/src/components/ui/button";
import {PizzaSize} from "@/types";
import ThereIsNoProduct from "@/src/components/ui/no-product";
import {useCart} from "@/src/providers/cart-provider";
import {FontAwesome} from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import {useProduct} from "@/src/api/products";
import IsLoading from "@/src/components/ui/is-loading";
import ErrorAPI from "@/src/components/ui/error-api";

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
    addItem(product, selectedSize);
    router.push('/cart');
  };

  if(!product) return <ThereIsNoProduct />;

  return (
    <View className="flex-1 bg-white p-3">
      <Stack.Screen
        options={{
        title: 'Menu',
        headerRight: () => (
          <Link href={`/(admin)/menu/create?id=${id}`} asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="pencil"
                  size={17}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }} />
      <Image
        source={product.image}
        style={styles.image}
        contentFit="cover"
        transition={1000}
      />
      <Text className="text-xl font-semibold">Price: ${product.price.toFixed(2)}</Text>
      <Text className="text-lg font-semibold">Name: {product.name}</Text>
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
