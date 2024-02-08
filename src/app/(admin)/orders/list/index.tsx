import { FlatList } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import OrderListItem from "@/src/components/order-list-item";
import {useAdminOrderList} from "@/src/api/orders";
import React from "react";
import IsLoading from "@/src/components/ui/is-loading";
import ErrorAPI from "@/src/components/ui/error-api";
import {useInsertOrderSubscription} from "@/src/api/orders/subscriptions";

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useAdminOrderList({ archived: false });
  if(isLoading) return <IsLoading />
  if(error) return <ErrorAPI error={error} />

  useInsertOrderSubscription();

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
