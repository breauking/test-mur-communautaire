import React, { useState, useEffect } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function UploadScreen() {
  const [media, setMedia] = useState<string | null>(null); // Stocke l'URI de l'image ou de la vidéo
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null); // Type de média (image ou vidéo)
  const [isLoading, setIsLoading] = useState(false); // Chargement du fichier

  // Sélection d'une image/vidéo depuis la galerie
  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Permet de choisir une image/vidéo
      //allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
      setMediaType(result.assets[0].type === 'video' ? 'video' : 'image');
    }
  };


  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('token');
    } catch (error) {
      console.error("Erreur lors de la récupération du token", error);
      return null;
    }
  };
  

  const logout = async () => {
    try {
      // Supprime le token d'AsyncStorage pour déconnecter l'utilisateur
      await AsyncStorage.removeItem('token');

      // Redirige vers l'écran de connexion
      router.replace('/');
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission de la caméra requise pour utiliser cette fonctionnalité');
      }
    })();
  }, []);

  // Prendre une photo/vidéo avec la caméra
  const takeMedia = async () => {

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Permet de prendre une photo ou vidéo
      //allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
      setMediaType(result.assets[0].type === 'video' ? 'video' : 'image');
    }
  };

  // Upload de l'image ou vidéo
  const uploadMedia = async () => {
    setIsLoading(true);

    if (!media || !mediaType) return;

    let formData = new FormData();
    formData.append('file', {
      uri: media,
      name: mediaType === 'video' ? 'upload.mp4' : 'upload.jpg',  // Adapter l'extension du fichier selon le type
      type: mediaType === 'video' ? 'video/mp4' : 'image/jpeg',   // Adapter le type MIME
    } as any);


    const token = await getToken();

    try {
      const response = await fetch('http://192.168.1.54:3000/storage/upload', {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${token}`,
         },
      });

      const result = await response.json();
      console.log(`${mediaType} uploaded:`, result.url);

      alert('Upload réussi !');
      setMedia(null);  // Réinitialiser l'état après l'upload
      setMediaType(null);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Échec de l’upload');
      setMedia(null);
      setMediaType(null);
    } finally {
      setIsLoading(false); // Débloque le bouton après l'upload
    }
  };

  return (
    
    <View style={styles.container}>
      <View>
        <Button color={'red'} title="Se déconnecter" onPress={logout} />
      </View>
    
      {media && mediaType === 'image' && <Image source={{ uri: media }} style={styles.image} />}
      {media && mediaType === 'video' && (
        <Video
          source={{ uri: media }}
          style={styles.video}
          useNativeControls={true} // Affiche les contrôles de lecture
          //resizeMode="contain"
          shouldPlay={false}
        />
      )}
      <Button title="Choisir une image ou vidéo" onPress={pickMedia} />
      <Button title="Prendre une photo ou vidéo" onPress={takeMedia} />
      {media && <Button title="Publier" onPress={uploadMedia}  disabled={isLoading} />}
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  video: {
    width: 250,
    height: 450,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});