import { useAuth } from "@/src/providers/auth-provider";
import {Feather, MaterialCommunityIcons} from "@expo/vector-icons";
import {Link, Redirect, Tabs} from "expo-router";
import { Pressable, useColorScheme } from "react-native";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return <MaterialCommunityIcons size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={'/'} />;
  }
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ href: null }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="food-outline" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="format-list-bulleted" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
