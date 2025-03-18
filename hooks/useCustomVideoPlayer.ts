import { useVideoPlayer } from 'expo-video';
import { useEffect } from 'react';

/**
 * Hook personnalisé pour gérer la lecture des vidéos.
 * Initialise le player avec la vidéo spécifiée et s'assure qu'elle se joue en boucle et en silence.
 */
export function useCustomVideoPlayer(videoSource: string) {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  // Vérifie que la vidéo est chargée avant de la lire
  useEffect(() => {
    if (player.duration > 0) {
      player.play();
    }
  }, [player.duration]);

  return player;
}