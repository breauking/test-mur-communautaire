import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, FlatList, View, ActivityIndicator, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Feed() {

  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setUserToken(token);
      }
    };
    checkLogin();
  }, []);

  

  const getFileExtension = (url: string) => {
    if (typeof url !== 'string' || !url) {
      return ''; // Retourner une chaîne vide si l'URL n'est pas valide
    }
    const cleanUrl = url.split('?')[0]; // Enlever la query string
    const extension = cleanUrl.split('.').pop(); // Récupérer l'extension après le dernier point
    return extension ? extension.toLowerCase() : '';
  };

  const isVideo = (url: string) => {
    return getFileExtension(url) === 'mp4'; // Vérification basée sur l'extension .mp4 (à remplacer avec mediatype)
  };

  const isImage = (url: string) => {
    const extension = getFileExtension(url);
    return extension === 'jpg' || extension === 'png'; // Vérification basée sur les extensions d'image
  };


  const fetchMedias = async () => {
    try {
      const response = await fetch('http://192.168.1.54:3000/storage/files');
      const data = await response.json();
      if (Array.isArray(data)){
        setMediaItems(data);
      }
    } catch (error) {
      console.error('Erreur de récupération des images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedias();

    // à remplacer avec une websocket
    const interval = setInterval(() => {
      fetchMedias();
    }, 3000); // On met à jour le feed toutes les 3 secondes en récupérant les nouvelles images/vidéos (nouveaux fichiers upload dans le bucket)

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={mediaItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ThemedView style={styles.mediaItem}>
            <Text style={styles.customText}>{item.username}</Text>
            {isImage(item.url) ? (
              <Image source={{ uri: item.url }} style={styles.portraitPost} />
            ) : isVideo(item.url) ? (
              <Video 
                source={{uri: item.url}}
                style={styles.reelPost}
                shouldPlay={true}
                isLooping={true}
              />
            ) : (
              <Text>Type de média inconnu </Text>
            )}
          </ThemedView>
        )}
      />
    </View>
  );


}

const styles = StyleSheet.create({
  stepContainer: {
    marginBottom: 10,
  },
  portraitPost: {
    width: '100%',
    height: 450,
    resizeMode: 'cover',
  },
  landscapePost: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  reelPost: {
    width: '100%',
    height: 580,
    resizeMode: 'cover',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'light',
    marginBottom: 30
  },
  mediaItem: {
    padding:32,
    paddingBottom:16,
    gap:0
  },
  customText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'gray',
    padding: 10
  }
});