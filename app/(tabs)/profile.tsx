import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Heart,
  Shield,
  Settings,
  ChevronRight,
  FileText,
  Bell,
  Moon,
  LogOut,
  Edit3,
} from 'lucide-react-native';
import { Colors, Gradients, Shadows, BorderRadius, Spacing } from '@/constants/theme';

const menuItems = [
  {
    id: 'personal',
    title: 'Personal Information',
    subtitle: 'Update your profile details',
    icon: User,
    color: Colors.primary,
  },
  {
    id: 'medical',
    title: 'Medical History',
    subtitle: 'View and manage records',
    icon: FileText,
    color: Colors.secondary,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    subtitle: 'Manage alerts and reminders',
    icon: Bell,
    color: Colors.warning,
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    subtitle: 'Data and account security',
    icon: Shield,
    color: Colors.error,
  },
  {
    id: 'appearance',
    title: 'Appearance',
    subtitle: 'Theme and display',
    icon: Moon,
    color: '#8B5CF6',
  },
  {
    id: 'settings',
    title: 'Settings',
    subtitle: 'App preferences',
    icon: Settings,
    color: Colors.textMuted,
  },
];

export default function ProfileScreen() {
  const router = useRouter();

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

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient
          colors={Gradients.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerCard}
        >
          <View style={styles.headerContent}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={['#ffffff30', '#ffffff10']}
                style={styles.avatar}
              >
                <User size={48} color={Colors.textWhite} />
              </LinearGradient>
              <TouchableOpacity style={styles.editAvatarButton}>
                <Edit3 size={14} color={Colors.textWhite} />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>Alex Johnson</Text>
            <Text style={styles.userEmail}>alex.johnson@email.com</Text>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>85</Text>
                <Text style={styles.statLabel}>Health Score</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Appointments</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>3</Text>
                <Text style={styles.statLabel}>Reports</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Mail size={18} color={Colors.primary} />
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>alex.johnson@email.com</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoRow}>
            <Phone size={18} color={Colors.secondary} />
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>+1 (555) 123-4567</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoRow}>
            <Calendar size={18} color={Colors.warning} />
            <Text style={styles.infoLabel}>DOB</Text>
            <Text style={styles.infoValue}>March 15, 1990</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoRow}>
            <Heart size={18} color={Colors.error} />
            <Text style={styles.infoLabel}>Blood Type</Text>
            <Text style={styles.infoValue}>O+</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Account</Text>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity key={item.id} style={styles.menuItem}>
                <View style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}>
                  <IconComponent size={20} color={item.color} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
                <ChevronRight size={20} color={Colors.textMuted} />
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>MediAI v1.0.0</Text>

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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerCard: {
    borderRadius: 24,
    marginBottom: Spacing.xl,
    overflow: 'hidden',
    ...Shadows.lg,
  },
  headerContent: {
    padding: 24,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.textWhite,
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.textWhite,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: Spacing.xl,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: 16,
    gap: Spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.textWhite,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: 'rgba(255,255,255,0.85)',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  infoCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  infoLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: Spacing.md,
    width: 80,
  },
  infoValue: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textPrimary,
    textAlign: 'right',
  },
  infoDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.xs,
  },
  menuContainer: {
    marginBottom: Spacing.xl,
  },
  menuTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${Colors.error}10`,
    borderRadius: 16,
    paddingVertical: 16,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  logoutText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.error,
  },
  versionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  bottomSpace: {
    height: 100,
  },
});
