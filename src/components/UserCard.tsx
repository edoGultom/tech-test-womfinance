import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { User } from '../types/user';
import { useTheme } from '../theme/ThemeContext';

interface UserCardProps {
  user: User;
  onPress?: () => void;
}

export default function UserCard({ user, onPress }: UserCardProps) {
  const { theme } = useTheme();
  const styles = getStyles(theme);

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
const getStyles = (theme: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.background,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: theme.shadowPrimary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme.shadowOpacity,
      shadowRadius: 4,
      borderWidth: 1,
      borderColor: theme.borderColor,
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
      backgroundColor: theme.bgIconPrimary,
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
      color: theme.textName,
      marginBottom: 2,
    },
    username: {
      fontSize: 14,
      color: theme.textUsername,
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
      color: theme.textInfo,
      flex: 1,
    },
  });
