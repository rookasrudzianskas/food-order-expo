// tab one screen
import { vars, useColorScheme } from "nativewind";
import { Pressable, Text, View, PressableProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const TabOneScreen = () => {
  return (
    <View className="bg-gray-100 flex-1 p-3">
      <View className="flex-1 bg-white rounded-xl pt-6 items-center justify-center">
        <Text className="text-2xl uppercase font-bold text-gray-700 text-center">
          Nativewind v4
        </Text>
      </View>
    </View>
  );
};

export default TabOneScreen;
