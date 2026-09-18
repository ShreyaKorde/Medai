import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Moon,
  Globe,
  Bell,
  Lock,
  Shield,
  HelpCircle,
  Info,
  ChevronRight,
  LogOut,
  Trash2,
  Mail,
  Database,
} from 'lucide-react-native';
import { Colors, Gradients, Shadows, BorderRadius, Spacing } from '@/constants/theme';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [medicineReminders, setMedicineReminders] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => router.replace('/(auth)/login') },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. Are you sure you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive' },
      ]
    );
  };

  const SettingToggle = ({
    label,
    subtitle,
    value,
    onValueChange,
    icon: Icon,
    color,
  }: {
    label: string;
    subtitle?: string;
    value: boolean;
    onValueChange: (val: boolean) => void;
    icon: any;
    color: string;
  }) => (
    <View style={styles.settingItem}>
      <View style={[styles.settingIcon, { backgroundColor: `${color}15` }]}>
        <Icon size={22} color={color} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingLabel}>{label}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      <Switch
        trackColor={{ false: Colors.border, true: Colors.primary }}
        thumbColor={Colors.card}
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );

  const SettingButton = ({
    label,
    subtitle,
    onPress,
    icon: Icon,
    color,
    destructive = false,
  }: {
    label: string;
    subtitle?: string;
    onPress: () => void;
    icon: any;
    color: string;
    destructive?: boolean;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={[styles.settingIcon, { backgroundColor: destructive ? `${Colors.error}15` : `${color}15` }]}>
        <Icon size={22} color={destructive ? Colors.error : color} />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingLabel, destructive && styles.destructiveText]}>{label}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      <ChevronRight size={20} color={Colors.textMuted} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.card}>
            <SettingToggle
              label="Dark Mode"
              subtitle="Switch to dark theme"
              value={darkMode}
              onValueChange={setDarkMode}
              icon={Moon}
              color="#8B5CF6"
            />
            <View style={styles.divider} />
            <SettingButton
              label="Language"
              subtitle="English (US)"
              onPress={() => {}}
              icon={Globe}
              color={Colors.primary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.card}>
            <SettingToggle
              label="Push Notifications"
              subtitle="Receive health alerts"
              value={notifications}
              onValueChange={setNotifications}
              icon={Bell}
              color={Colors.warning}
            />
            <View style={styles.divider} />
            <SettingToggle
              label="Medicine Reminders"
              subtitle="Get notified to take medicines"
              value={medicineReminders}
              onValueChange={setMedicineReminders}
              icon={Bell}
              color={Colors.secondary}
            />
            <View style={styles.divider} />
            <SettingToggle
              label="Appointment Reminders"
              subtitle="Get notified about appointments"
              value={appointmentReminders}
              onValueChange={setAppointmentReminders}
              icon={Bell}
              color={Colors.primary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
          <View style={styles.card}>
            <SettingButton
              label="Privacy Settings"
              subtitle="Manage data sharing"
              onPress={() => {}}
              icon={Shield}
              color={Colors.secondary}
            />
            <View style={styles.divider} />
            <SettingButton
              label="Security"
              subtitle="Password & authentication"
              onPress={() => {}}
              icon={Lock}
              color={Colors.primary}
            />
            <View style={styles.divider} />
            <SettingButton
              label="Data & Storage"
              subtitle="Manage stored data"
              onPress={() => {}}
              icon={Database}
              color={Colors.warning}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.card}>
            <SettingButton
              label="Help Center"
              onPress={() => {}}
              icon={HelpCircle}
              color={Colors.primary}
            />
            <View style={styles.divider} />
            <SettingButton
              label="Contact Support"
              onPress={() => {}}
              icon={Mail}
              color={Colors.secondary}
            />
            <View style={styles.divider} />
            <SettingButton
              label="About MediAI"
              onPress={() => {}}
              icon={Info}
              color={Colors.textMuted}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            <SettingButton
              label="Logout"
              onPress={handleLogout}
              icon={LogOut}
              color={Colors.error}
              destructive
            />
            <View style={styles.divider} />
            <SettingButton
              label="Delete Account"
              onPress={handleDeleteAccount}
              icon={Trash2}
              color={Colors.error}
              destructive
            />
          </View>
        </View>

        <Text style={styles.version}>MediAI v1.0.0</Text>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.sm,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.textPrimary,
  },
  headerRight: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: Spacing.xl,
    marginTop: Spacing.xs,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    marginLeft: Spacing.xs,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    ...Shadows.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: Colors.textPrimary,
  },
  settingSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  destructiveText: {
    color: Colors.error,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 16 + 44 + Spacing.md,
  },
  version: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.xl,
  },
  bottomSpace: {
    height: 40,
  },
});
