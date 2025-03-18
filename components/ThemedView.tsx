import React from "react";
import { View, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, children, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  // On vérifie si on a du texte null (puisqu'on ne veut pas de texte dans un view)
  const validChildren = React.Children.toArray(children).filter(
    (child) => !(typeof child === "string" && child.trim() === "")
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps}>{validChildren}</View>;
}
