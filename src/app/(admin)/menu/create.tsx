//@ts-nocheck
import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Image} from "expo-image";
import Colors from '@/src/constants/Colors';
import {useRouter} from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import Button from "@/src/components/ui/button";

const CreateProductScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState('');
  const router = useRouter();

  const validateInput = () => {
    setErrors('');
    if (!name || !price || isNaN(parseFloat(price))) {
      setErrors(!name ? 'Name is required' : !price ? 'Price is required' : 'Price should be a number');
      return false;
    }
    return true;
  };

  const onCreate = () => {
    if (!validateInput()) return;

    console.warn('Creating dish');
    setName('');
    setPrice('');
    setImage('');
    router.back();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={styles.image}
        contentFit="contain"
        className="rounded-full"
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Margarita..."
        style={styles.input}
      />

      <Text className="text-gray-400">Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.error}>{errors}</Text>
      <Button onPress={onCreate} text="Create" />
    </View>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 40,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});
