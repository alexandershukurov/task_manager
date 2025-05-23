import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const systemScheme = useColorScheme(); // 'dark' or 'light'
  const [useSystemTheme, setUseSystemTheme] = useState(true);
  const [manualTheme, setManualTheme] = useState('light'); // or 'dark'

  const theme = useSystemTheme
    ? systemScheme === 'dark'
      ? DarkTheme
      : DefaultTheme
    : manualTheme === 'dark'
    ? DarkTheme
    : DefaultTheme;

  return (
    <NavigationContainer theme={theme}>
      <AppNavigator
        useSystemTheme={useSystemTheme}
        setUseSystemTheme={setUseSystemTheme}
        manualTheme={manualTheme}
        setManualTheme={setManualTheme}
      />
    </NavigationContainer>
  );
}