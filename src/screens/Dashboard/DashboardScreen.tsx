import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../../components/EmptyState';
import ErrorView from '../../components/ErrorView';
import LoadingSpinner from '../../components/Loading';
import UserCard from '../../components/UserCard';
import { AuthContext } from '../../context/AuthContext';
import { useUsers } from '../../hooks/useUsers';
import { useTheme } from '../../theme/ThemeContext';
import { MainStackParamList } from '../../types/auth';
import { User } from '../../types/user';
import { clearAuthToken, getUserEmail } from '../../utils/auth';

type DashboardNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Dashboard'
>;

export default function DashboardScreen() {
  const [userEmail, setUserEmail] = useState('');
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation<DashboardNavigationProp>();
  const { theme, toggleTheme, mode } = useTheme();

  const {
    data: users,
    loading,
    error,
    isRefreshing,
    refetch,
    refresh,
  } = useUsers(); //custom hook

  useEffect(() => {
    loadUserData();
  }, []);

  async function handleLogout() {
    try {
      await clearAuthToken();
      logout();
    } catch (err) {
      console.error('Error logging out:', err);
    }
  }

  async function loadUserData() {
    try {
      const email = await getUserEmail();
      if (email) {
        setUserEmail(email);
      }
    } catch (err) {
      console.error('Error loading user data:', err);
    }
  }

  function handleUserPress(user: User) {
    navigation.navigate('Detail', { userId: user.id.toString() }); // contoh param
  }

  if (loading) {
    return <LoadingSpinner message="Loading users..." />;
  }

  if (error && !users) {
    return <ErrorView message={error} onRetry={refetch} />;
  }
  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.userIconContainer}>
            <MaterialIcons name="person" color="#3B82F6" size={24} />
          </View>
          <View>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.emailText}>{userEmail}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" color="#EF4444" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={toggleTheme}>
          {mode === 'light' ? (
            <MaterialIcons name="dark-mode" color={theme.text} size={32} />
          ) : (
            <MaterialIcons name="light-mode" color={theme.text} size={32} />
          )}
        </TouchableOpacity>
      </View>
      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{error}</Text>
        </View>
      )}

      <FlatList
        data={users ?? []}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard user={item} onPress={() => handleUserPress(item)} />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            colors={['#3B82F6']}
            tintColor="#3B82F6"
          />
        }
        ListEmptyComponent={<EmptyState message="No users found" />}
      />
    </SafeAreaView>
  );
}
const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      backgroundColor: theme.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    userIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.bgIconPrimary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcomeText: {
      fontSize: 14,
      color: theme.textLabel,
    },
    emailText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
    },
    logoutButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.bgIconDanger,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorBanner: {
      backgroundColor: theme.bgIconDanger,
      padding: 12,
      marginHorizontal: 16,
      marginTop: 12,
      borderRadius: 8,
    },
    errorBannerText: {
      color: theme.mode === 'light' ? '#991B1B' : '#FCA5A5',
      fontSize: 14,
      textAlign: 'center',
    },
    listContent: {
      padding: 16,
    },
    iconButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:
        theme.bgIconPrimary,
    },
  });
