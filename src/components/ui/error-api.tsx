//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const ErrorAPI = ({error}: {error: any}) => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-red-500">{error.message}</Text>
    </View>
  );
};

export default ErrorAPI;
