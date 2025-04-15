import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {HomeScreenHelper} from '.';
import PhotoList from './components/PhotoList';
import {useNavigation} from '@react-navigation/native';
import Responsive from '../../constants/responsive';
import {showToast} from '../../constants/toast';
import CustomHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    offset: 0,
    images: [],
  });

  const mutation = useMutation({
    mutationFn: async offset => {
      return await HomeScreenHelper.getPost(offset);
    },
    onSuccess: resp => {
      if (resp?.length === 0) {
        showToast('No more data');
      }
      setState(prev => {
        const newUniqueImages = resp?.filter(
          item => !prev.images.some(existing => existing.id === item.id),
        );

        return {
          ...prev,
          images: [...prev.images, ...newUniqueImages],
          offset: prev.offset + 1,
        };
      });
    },
    onError: error => {
      console.error('Error fetching images:', error);
      showToast('Failed to load images. Please try again.');
    },
  });

  useEffect(() => {
    mutation.mutate(0);
  }, []);

  const renderItem = ({item}) => (
    <PhotoList item={item} navigation={navigation} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Home Screen" count={state?.images?.length} />

      <FlatList
        data={state.images}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          mutation.isPending ? (
            <ActivityIndicator size="large" style={styles.loder} />
          ) : (
            <View
              style={{
                paddingHorizontal: Responsive.width(10),
              }}>
              <CustomButton
                title="Click here to load more"
                onPress={() => mutation.mutate(state.offset)}
              />
            </View>
          )
        }
        initialNumToRender={10}
        windowSize={5}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loder: {
    marginVertical: Responsive.width(10),
  },
});

export default HomeScreen;
