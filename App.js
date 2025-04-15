import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {RootSiblingParent} from 'react-native-root-siblings';
import Routes from './src/navigation/Routes';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <RootSiblingParent>
          <StatusBar barStyle="dark-content" />
          <Routes />
        </RootSiblingParent>
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
