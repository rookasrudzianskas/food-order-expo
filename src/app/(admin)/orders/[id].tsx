import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import orders from '../../../../assets/data/orders';
import OrderListItem from "@/src/components/order-list-item";
import OrderItemListItem from "@/src/components/order-item-list";
import Colors from '@/src/constants/Colors';
import {OrderStatusList, Tables} from "@/types";
import {useOrderDetails, useUpdateOrder} from "@/src/api/orders";
import IsLoading from "@/src/components/ui/is-loading";
import ErrorAPI from "@/src/components/ui/error-api";
import React from "react";
import {notifyUserAboutOrderUpdate} from "@/src/lib/notifications";

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(id);
  const { mutate: updateOrder } = useUpdateOrder();
  if(isLoading) return <IsLoading />
  if(error) return <ErrorAPI error={error} />

  const updateStatus = async (status: string) => {
    await updateOrder({
      id: id,
      updatedFields: { status },
    });

    if (order) {
      await notifyUserAboutOrderUpdate({ ...order, status });
    }
  }

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
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: 'bold' }}>Status</Text>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? 'white' : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>

        )}
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
