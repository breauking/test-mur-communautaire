import React, { useState } from 'react';
import { TextInput, Button, View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const login = async (email: string, password: string) => {

      try {
        const response = await axios.post('http://192.168.1.54:3000/auth/login', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        router.replace('/(tabs)/feed');
      } catch (error) {
        console.error(error);
      }
  };

  const handleLogin = () => {
    login(email,password)
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput 
        placeholder="Email"
        placeholderTextColor={'gray'}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput 
        placeholder="Mot de passe"
        placeholderTextColor={'gray'}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Se connecter" onPress={handleLogin} />
      <Button title="Créer un compte" onPress={() => router.push("/signUp")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});