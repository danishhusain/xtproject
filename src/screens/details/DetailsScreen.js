import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Responsive from '../../constants/responsive';
import CustomTextInput from '../../components/CustomTextInput';
import CustomHeader from '../../components/CustomHeader';
import {colors} from '../../constants/colors';
import {DetailsScreenHelper} from '.';
import {showToast} from '../../constants/toast';
import {useMutation} from '@tanstack/react-query';
import {getUpdatedImageUrl} from '../../constants/commonLogic';
import applicationProperties from '../../factories/application.properties';

const DetailsScreen = ({route, navigation}) => {
  const {item, imageDimensions} = route.params || {};
  const imageUrl = item?.xt_image || applicationProperties.noImageUrl;
  const updatedImageUrl = getUpdatedImageUrl(imageUrl);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 10) {
      newErrors.phone = 'Phone number must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });
    setErrors({});
  };

  const mutation = useMutation({
    mutationFn: async formDataToSend => {
      return await DetailsScreenHelper.saveUserData(formDataToSend);
    },
    onSuccess: resp => {
      showToast(resp?.message);
      resetForm();
    },
    onError: error => {
      showToast('Failed to save user. Please try again.');
    },
  });

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const imageInfo = DetailsScreenHelper.extractImageInfo(item);
    const formDataToSend = new FormData();

    formDataToSend.append('first_name', formData.firstName);
    formDataToSend.append('last_name', formData.lastName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('user_image', {
      uri: imageInfo.uri,
      name: imageInfo.name,
      type: imageInfo.type,
    });

    mutation.mutate(formDataToSend);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Detail Screen" back={true} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? Responsive.height(90) : Responsive.height(50)
        }>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {/* Image placeholder */}
          <View style={[styles.imagePlaceholder]}>
            {item?.xt_image ? (
              <Image
                source={{uri: updatedImageUrl}}
                style={[
                  styles.image,
                  {
                    height: imageDimensions.height,
                    width: imageDimensions.width,
                  },
                ]}
                resizeMode="cover"
              />
            ) : (
              <>
                <View style={styles.placeholderCross1} />
                <View style={styles.placeholderCross2} />
              </>
            )}
          </View>

          {/* My CustomTextInput component */}
          <View style={styles.formContainer}>
            <CustomTextInput
              label="First name"
              value={formData.firstName}
              onChangeText={text => handleInputChange('firstName', text)}
              error={errors.firstName}
              required
            />

            <CustomTextInput
              label="Last name"
              value={formData.lastName}
              onChangeText={text => handleInputChange('lastName', text)}
              error={errors.lastName}
              required
            />

            <CustomTextInput
              label="Email"
              value={formData.email}
              onChangeText={text => handleInputChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              required
            />

            <CustomTextInput
              label="Phone"
              value={formData.phone}
              onChangeText={text => handleInputChange('phone', text)}
              keyboardType="phone-pad"
              error={errors.phone}
              required
              maxLength={10}
            />

            <View style={styles.submitContainer}>
              {mutation.isPending ? (
                <View style={styles.submitButton}>
                  <ActivityIndicator />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}>
                  <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Responsive.width(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: Responsive.width(5),
  },
  backButtonText: {
    fontSize: Responsive.width(18),
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: Responsive.width(16),
    fontWeight: '600',
    marginLeft: Responsive.width(10),
  },
  scrollContent: {
    flexGrow: 1,
    padding: Responsive.width(16),
  },
  imagePlaceholder: {
    backgroundColor: colors.placeholderBackground,
    marginBottom: Responsive.width(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderCross1: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: colors.placeholderLine,
    transform: [{rotate: '45deg'}],
  },
  placeholderCross2: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: colors.placeholderLine,
    transform: [{rotate: '-45deg'}],
  },
  image: {
    borderRadius: Responsive.width(5),
  },
  formContainer: {
    width: '100%',
  },
  submitContainer: {
    alignItems: 'flex-end',
    marginTop: Responsive.width(10),
  },
  submitButton: {
    backgroundColor: colors.white,
    paddingVertical: Responsive.width(8),
    paddingHorizontal: Responsive.width(16),
    borderRadius: Responsive.width(4),
    borderWidth: 1,
    borderColor: colors.buttonBorder,
  },
  submitText: {
    fontSize: Responsive.width(14),
    color: colors.textPrimary,
  },
  keyboardContainer: {
    flex: 1,
  },
});

export default DetailsScreen;
