import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import LoadingSpinner from '../components/Loading';
import { AuthThemeContext } from '../context/AuthThemeContext';
import { RootStackParamList } from '../types/auth';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { token ,isLoading} = useContext(AuthThemeContext);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <LoadingSpinner message="Please wait..."/>
      </View>
    );
  }
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <Stack.Screen name="Main" component={MainStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
