import {FlatList, View} from "react-native";
import React from "react";
import products from '../../../assets/data/products';
import ProductListItem from "@/src/components/product-list-item";

const MenuScreen = () => {

  return (
    <View className="bg-gray-100 pt-16">
      <FlatList
        data={products}
        renderItem={({item}) => (
          <ProductListItem product={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MenuScreen;
