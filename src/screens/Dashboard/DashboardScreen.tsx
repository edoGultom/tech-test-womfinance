import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { clearAuthToken, getUserEmail } from '../../utils/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/auth';

type DashboardNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Dashboard'
>;

export default function DashboardScreen() {
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation<DashboardNavigationProp>();

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
  async function handleDetail() {
    navigation.navigate('Detail', { itemId: '123' }); // contoh param
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
      <TouchableOpacity onPress={handleDetail}><Text>Go Detail</Text></TouchableOpacity>
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
