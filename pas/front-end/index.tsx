import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ParentsProvider } from './app/context/ParentsContext';
import AppNavigator from './app/navigation/AppNavigator';
import { ThemeProvider } from './app/styles/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ParentsProvider>
        <ThemeProvider>
          <StatusBar style="auto" />
          <AppNavigator />
        </ThemeProvider>
      </ParentsProvider>
    </SafeAreaProvider>
  );
}