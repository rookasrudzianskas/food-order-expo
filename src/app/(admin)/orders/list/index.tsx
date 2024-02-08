import { FlatList } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import OrderListItem from "@/src/components/order-list-item";
import {useAdminOrderList} from "@/src/api/orders";
import React, {useEffect} from "react";
import IsLoading from "@/src/components/ui/is-loading";
import ErrorAPI from "@/src/components/ui/error-api";
import {supabase} from "@/src/app/lib/supabase";
import {useQueryClient} from "@tanstack/react-query";

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useAdminOrderList({ archived: false });
  if(isLoading) return <IsLoading />
  if(error) return <ErrorAPI error={error} />
  const queryClient = useQueryClient();

  useEffect(() => {
    const orders = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          console.log('Change received!', payload);
          // @ts-ignore
          queryClient.invalidateQueries(['orders']);
        }
      )
      .subscribe();
    return () => {
      orders.unsubscribe();
    };
  }, [])

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
