import { TextInput, Text, View, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const signUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [error, setError] = useState('');
    const router = useRouter();

    const register = async (username: string, email: string, password: string) => {
      try {
        const response = await axios.post('http://192.168.1.54:3000/auth/signup', {
          username,
          email,
          password,
        });
        await AsyncStorage.setItem('token', response.data.token);
        router.replace('/(tabs)/feed');
        console.log('Utilisateur créé avec succès', response.data);
      } catch (e) {
        console.error('Erreur lors de la création du compte', e);
      }
    };

    const handleRegister = () => {
      register(username, email, password);
      router.replace
    };
  

    return (
        <View style={styles.container}>
              <Text style={styles.title}>Créer un compte</Text>
              <TextInput 
                placeholder="Nom utilisateur"
                placeholderTextColor={'gray'}
                value={username}
                onChangeText={setUsername}
                style={styles.input}
              />
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
              <Button title="Créer mon compte" onPress={handleRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom:200
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
    backgroundColor: 'light'
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default signUp