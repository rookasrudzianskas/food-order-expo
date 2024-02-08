import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import orders from '../../../../assets/data/orders';
import OrderListItem from "@/src/components/order-list-item";
import OrderItemListItem from "@/src/components/order-item-list";
import {useOrderDetails} from "@/src/api/orders";
import IsLoading from "@/src/components/ui/is-loading";
import ErrorAPI from "@/src/components/ui/error-api";
import React from "react";

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(id);
  if(isLoading) return <IsLoading />
  if(error) return <ErrorAPI error={error} />

  if (!order) {
    return <Text>Order not found!</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        // @ts-ignore
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetailScreen;
