import { Image, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { VideoView } from 'expo-video';
import FeedScrollView from '@/components/FeedScrollView';
import { useCustomVideoPlayer } from '@/hooks/useCustomVideoPlayer';

// Importation des assets (image en mode paysage, image portrait et 2 vidéos)
const landscape = require('@/assets/images/paysage.jpg');
const portrait = require('@/assets/images/portrait.jpg');

const videoSource1 = require('@/assets/videos/kl.mov');
const videoSource2 = require('@/assets/videos/river.mov');

export default function HomeScreen() {

  // Initialisation des lecteurs vidéos
  const player1 = useCustomVideoPlayer(videoSource1)
  const player2 = useCustomVideoPlayer(videoSource2)

  return (
    // les éléments images et vidéos ont la même structure -> factorisation possible
    <FeedScrollView>
      <ThemedView style={styles.stepContainer}>
      <Image source={landscape}
        style={styles.landscapePost}
       />
       </ThemedView>
       <ThemedView style={styles.stepContainer}>
      <Image source={portrait}
        style={styles.portraitPost}
       />
       </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <VideoView 
        style={styles.reelPost}
        player={player1}
      />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <VideoView 
        style={styles.reelPost}
        player={player2}
      />
      </ThemedView>
    </FeedScrollView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    marginBottom: 10
  },
  portraitPost: {
    width: '100%',
    height: 450 ,
    resizeMode: 'cover' // L'image remplit l'espace sans distortion
  },
  landscapePost: {
    width: '100%',
    height: 245,
    resizeMode: 'cover'
  },
  reelPost: {
    width: '100%',
    height: 580,
    resizeMode: 'cover'
  }
});
