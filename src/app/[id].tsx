//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useLocalSearchParams} from "expo-router";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>
        byrookas 🚀 - ProductDetailsScreen {id}
      </Text>
    </View>
  );
};

export default ProductDetailsScreen;
