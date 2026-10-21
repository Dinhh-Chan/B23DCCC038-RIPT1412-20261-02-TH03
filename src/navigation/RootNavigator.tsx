import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { useApp } from '../contexts/AppContext';
import ChatScreen from '../screens/ChatScreen';
import LoginScreen from '../screens/LoginScreen';
import MainTabs from './MainTabs';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { account, colors, darkMode } = useApp();
  const base = darkMode ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer
      theme={{
        ...base,
        colors: {
          ...base.colors,
          background: colors.bg,
          card: colors.card,
          text: colors.text,
          primary: colors.primary,
          border: colors.border,
        },
      }}
    >
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {account ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </>
        ) : (
          // Khi đăng xuất, account = null -> tự động quay về màn hình Đăng nhập
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
