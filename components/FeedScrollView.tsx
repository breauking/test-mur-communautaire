import { ScrollView, ScrollViewProps } from 'react-native';
import { PropsWithChildren } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { StyleSheet } from 'react-native';

/**
 * Composant ScrollView personnalisé.
 */
export default function FeedScrollView({ children, ...props } : PropsWithChildren<ScrollViewProps>) {
  // Récupère l’espace nécessaire pour éviter que le contenu soit masqué par la barre de navigation
  const bottom = useBottomTabOverflow() ?? 0;

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        {...props}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={[styles.contentContainer, { paddingBottom: bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.content}>{children}</ThemedView>
      </ScrollView>
    </ThemedView>
    
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'light'
  },
  contentContainer: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});