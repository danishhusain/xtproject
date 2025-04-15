import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaView} from 'react-native-safe-area-context';
import Routes from './src/navigation/Routes';
import {StatusBar, StyleSheet} from 'react-native';
import {colors} from './src/constants/colors';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Routes />
      </SafeAreaView>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
