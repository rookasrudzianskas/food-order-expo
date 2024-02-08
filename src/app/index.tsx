import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import Button from '../components/ui/button';
import { useAuth } from '../providers/auth-provider';
import { Link, Redirect } from 'expo-router';
import {supabase} from "@/src/app/lib/supabase";

const index = () => {
  const { loading, session, isAdmin } = useAuth();

  if(loading) return <ActivityIndicator />;
  if(!session) return <Redirect href="/sign-in" />;
  if(!isAdmin) return <Redirect href="/(user)" />;

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
};

export default index;
