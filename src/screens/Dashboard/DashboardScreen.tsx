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
import ErrorView from '../../components/ErrorView';
import LoadingSpinner from '../../components/Loading';
import { AuthContext } from '../../context/AuthContext';
import { useUsers } from '../../hooks/useUsers';
import { MainStackParamList } from '../../types/auth';
import { clearAuthToken, getUserEmail } from '../../utils/auth';
import UserCard from '../../components/UserCard';
import { User } from '../../types/user';
import EmptyState from '../../components/EmptyState';

type DashboardNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Dashboard'
>;

export default function DashboardScreen() {
  const [userEmail, setUserEmail] = useState('');
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation<DashboardNavigationProp>();
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

  if (error && users === null) {
    return <ErrorView message={error} onRetry={refetch} />;
  }
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
      </View>
      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{error}</Text>
        </View>
      )}

      <FlatList
        data={users??[]}
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 14,
    color: '#6B7280',
  },
  emailText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  logoutButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorBanner: {
    backgroundColor: '#FEE2E2',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 8,
  },
  errorBannerText: {
    color: '#991B1B',
    fontSize: 14,
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
  },
});
