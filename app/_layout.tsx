import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
import { Stack } from 'expo-router';

export default function Layout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Une fois l'authentification terminée, arrêter l'indicateur de chargement
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Affiche un indicateur de chargement pendant la vérification de l'authentification
  }
  
  return (
    <Stack>
        <Stack.Screen name="index" // login
        options={{headerShown: false}}
        />
        <Stack.Screen name="signUp"
        />
        <Stack.Screen name="(tabs)"
        options={{headerShown: false}}
        />
    </Stack>
    
  );
}
