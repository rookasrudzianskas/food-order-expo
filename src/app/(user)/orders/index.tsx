import { FlatList } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import OrderListItem from "@/src/components/order-list-item";
import {useMyOrderList} from "@/src/api/orders";
import IsLoading from "@/src/components/ui/is-loading";
import ErrorAPI from "@/src/components/ui/error-api";
import React from "react";

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useMyOrderList();
  if(isLoading) return <IsLoading />
  if(error) return <ErrorAPI error={error} />
  return (
    <>
      <Stack.Screen options={{ title: 'Orders' }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}
