import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import {
  Home,
  Activity,
  MessageCircle,
  Search,
  User,
} from 'lucide-react-native';
import { Colors, Shadows } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: Platform.OS === 'ios' ? 'transparent' : Colors.card,
          borderTopWidth: 0,
          height: 85,
          paddingBottom: 20,
          paddingTop: 10,
          ...Shadows.lg,
        },
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView tint="light" intensity={90} style={StyleSheet.absoluteFill} />
          ) : null,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 11,
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          title: 'Health',
          tabBarIcon: ({ size, color }) => (
            <Activity size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'AI Chat',
          tabBarIcon: ({ size, color }) => (
            <View style={styles.chatTabIcon}>
              <MessageCircle size={size} color={color} strokeWidth={2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: 'Appoint',
          tabBarIcon: ({ size, color }) => (
            <Search size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  chatTabIcon: {
    position: 'relative',
  },
});
