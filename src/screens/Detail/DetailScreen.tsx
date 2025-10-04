import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/auth';

type Props = NativeStackScreenProps<MainStackParamList, 'Detail'>;

export default function DetailScreen({ route }: Props) {
  const { itemId } = route.params || {};

  return (
    <View style={styles.container}>
      <Text>Detail Screen</Text>
      {itemId && <Text>Item ID: {itemId}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
 container:{
    flex: 1, justifyContent: 'center', alignItems: 'center'
  }
})