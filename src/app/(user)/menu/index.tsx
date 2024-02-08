import {FlatList, View} from "react-native";
import React from "react";
import products from '../../../../assets/data/products';
import ProductListItem from "@/src/components/product-list-item";

const MenuScreen = () => {

  return (
    <View className="bg-gray-100">
      <FlatList
        data={products}
        renderItem={({item}) => (
          <ProductListItem product={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
};

export default MenuScreen;
