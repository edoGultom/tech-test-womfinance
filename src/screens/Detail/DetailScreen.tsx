import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ErrorView from '../../components/ErrorView';
import LoadingSpinner from '../../components/Loading';
import UserCard from '../../components/UserCard';
import { AuthThemeContext } from '../../context/AuthThemeContext';
import { useUserDetail } from '../../hooks/useUserDetail';
import { MainStackParamList } from '../../types/auth';

type Props = NativeStackScreenProps<MainStackParamList, 'Detail'>;

type ScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Dashboard'
>;

export default function DetailScreen({ route }: Props) {
  const { userId } = route.params || {};
  const { data: user, loading, error, refresh } = useUserDetail(userId);
  const navigation = useNavigation<ScreenNavigationProp>();
  const {  theme } = useContext(AuthThemeContext);
  const styles = getStyles(theme);

  if (loading) {
    return <LoadingSpinner message="Loading user details..." />;
  }
  if (error || !user) {
    return <ErrorView message={error || 'User not found'} onRetry={refresh} />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" color={theme.primary} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Details</Text>
        <View style={styles.headerSpacer} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.cardContainer}>
          <UserCard user={user} />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <MaterialIcons name="place" color="#3B82F6" size={20} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Street</Text>
                <Text style={styles.detailValue}>
                  {user.address.street}, {user.address.suite}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <MaterialIcons name="location-city" color="#3B82F6" size={20} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>City</Text>
                <Text style={styles.detailValue}>
                  {user.address.city}, {user.address.zipcode}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <MaterialIcons name="my-location" color="#3B82F6" size={20} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Coordinates</Text>
                <Text style={styles.detailValue}>
                  Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company</Text>
          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <MaterialIcons name="work" color="#10B981" size={20} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Name</Text>
                <Text style={styles.detailValue}>{user.company.name}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <MaterialIcons name="business" color="#10B981" size={20} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Business</Text>
                <Text style={styles.detailValue}>{user.company.bs}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Website</Text>
          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <MaterialIcons name="web" color="#8B5CF6" size={20} />
              <View style={styles.detailContent}>
                <Text style={styles.detailValue}>{user.website}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: theme.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.bgIconPrimary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
    },
    headerSpacer: {
      width: 40,
    },
    content: {
      padding: 16,
    },
    cardContainer: {
      marginBottom: 24,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.textName,
      marginBottom: 12,
    },
    detailCard: {
      backgroundColor: theme.background,
      borderRadius: 12,
      padding: 16,
      shadowColor: theme.shadowPrimary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme.shadowOpacity,
      shadowRadius: 4,
      elevation: 3,
      gap: 16,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
    },
    detailContent: {
      flex: 1,
    },
    detailLabel: {
      fontSize: 14,
      color: theme.textLabel,
      marginBottom: 2,
    },
    detailValue: {
      fontSize: 16,
      color:theme.textName,
      fontWeight: '500',
    },
  });
