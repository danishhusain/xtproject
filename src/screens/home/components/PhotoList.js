import {Image, Pressable, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Responsive from '../../../constants/responsive';
import {screenNames} from '../../../constants/screenNames';
import {colors} from '../../../constants/colors';
import applicationProperties from '../../../factories/application.properties';
import {getUpdatedImageUrl} from '../../../constants/commonLogic';
import {showToast} from '../../../constants/toast';

const PhotoList = ({item, navigation}) => {
  const [hasError, setHasError] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({width: 0, height: 0});

  const imageUrl = item?.xt_image || applicationProperties.noImageUrl;
  const updatedImageUrl = getUpdatedImageUrl(imageUrl);

  const containerMargin = Responsive.width(10) * 2;
  const availableWidth = Responsive.screenWidth() - containerMargin;

  useEffect(() => {
    if (updatedImageUrl) {
      Image.getSize(
        updatedImageUrl,
        (width, height) => {
          const calculatedHeight = (availableWidth * height) / width;
          setImageDimensions({width: availableWidth, height: calculatedHeight});
        },
        () => {
          showToast(`Failed to get image of item: ${item?.id}`);
          setImageDimensions({width: availableWidth, height: availableWidth}); // fallback
        },
      );
    }
  }, [updatedImageUrl, availableWidth, item.id]);

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate(screenNames.DETAILS, {item, imageDimensions})
      }>
      <Text style={styles.text}>Image Id {item?.id}</Text>

      {hasError ? (
        <Text style={styles.errorText}>Image not available</Text>
      ) : imageDimensions.height > 0 ? (
        <Image
          source={{uri: updatedImageUrl}}
          style={[styles.image, imageDimensions]}
          resizeMode="contain"
          onError={() => setHasError(true)}
        />
      ) : (
        <Text style={styles.errorText}>Image Loading...</Text>
      )}
    </Pressable>
  );
};

export default PhotoList;

const styles = StyleSheet.create({
  container: {
    marginVertical: Responsive.width(10),
    marginHorizontal: Responsive.width(10),
    backgroundColor: colors.placeholderBackground,
  },
  image: {
    borderRadius: Responsive.width(5),
    backgroundColor: colors.border,
    // Note: aspectRatio image ko squre me render karta hai original size me nhi
    // aspectRatio: 1,
  },
  text: {
    padding: Responsive.width(5),
    color: colors.textSecondary,
  },
});
