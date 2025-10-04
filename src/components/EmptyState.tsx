import { View, Text, StyleSheet } from 'react-native';

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({ message = 'No data available' }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {/* <Inbox size={64} color="#9CA3AF" /> */}
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
