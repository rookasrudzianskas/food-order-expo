import {FlatList, View} from "react-native";
import React from "react";
import ProductListItem from "@/src/components/product-list-item";
import {useProductList} from "@/src/api/products";
import IsLoading from "@/src/components/ui/is-loading";
import ErrorAPI from "@/src/components/ui/error-api";

const MenuScreen = () => {
  const { data: products, error, isLoading } = useProductList();
  if(isLoading) return <IsLoading />
  if(error) return <ErrorAPI error={error} />

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
