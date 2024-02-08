import {ActivityIndicator, FlatList, Text, View} from "react-native";
import React, {useEffect} from "react";
import ProductListItem from "@/src/components/product-list-item";
import {supabase} from "@/src/app/lib/supabase";
import {useQuery} from "@tanstack/react-query";
import {Product} from "@/types";

const MenuScreen = () => {
  const {data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

  if(isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    )
  }

  if(error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">{error.message}</Text>
      </View>
    )
  }

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
