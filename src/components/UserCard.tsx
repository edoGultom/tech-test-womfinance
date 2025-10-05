import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User } from '../types/user';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

interface UserCardProps {
  user: User;
  onPress?: () => void;
}

export default function UserCard({ user, onPress }: UserCardProps) {
  const CardContent = (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="person" color="#3B82F6" size={24} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>@{user.email.split('@')[0]}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <MaterialIcons name="mail" color="#6B7280" size={16} />
          <Text style={styles.infoText}>{user.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="phone" color="#6B7280" size={16} />
          <Text style={styles.infoText}>{user.phone}</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="home-work" color="#6B7280" size={16} />
          <Text style={styles.infoText}>{user.company.name}</Text>
        </View>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {CardContent}
      </TouchableOpacity>
    );
  }

  return CardContent;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  username: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoContainer: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
});
