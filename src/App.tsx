import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './theme/ThemeContext';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AuthProvider>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
