import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { View, Text, StyleSheet } from 'react-native';

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({
  message = 'No data available',
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="inbox" color="#9CA3AF" size={64} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 24,
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 16,
  },
});
