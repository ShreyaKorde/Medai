import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Bell,
  Pill,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Settings,
} from 'lucide-react-native';
import { Colors, Gradients, Shadows, BorderRadius, Spacing } from '@/constants/theme';

const notifications = [
  {
    id: '1',
    type: 'medicine',
    title: 'Medicine Reminder',
    message: 'Time to take your Vitamin D supplement',
    time: '5 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'appointment',
    title: 'Upcoming Appointment',
    message: 'Dr. Sarah Johnson - Cardiology at 10:30 AM tomorrow',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'health_alert',
    title: 'Health Alert',
    message: 'Your blood pressure has been elevated for 3 days. Consider consulting a doctor.',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'medicine',
    title: 'Prescription Refill',
    message: 'Your Metformin prescription will expire in 5 days',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '5',
    type: 'appointment',
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Chen has been confirmed for June 28',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '6',
    type: 'health_alert',
    title: 'Weekly Health Summary',
    message: 'Your health score improved by 5 points this week. Great job!',
    time: '2 days ago',
    read: true,
  },
];

export default function NotificationsScreen() {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'medicine':
        return <Pill size={20} color={Colors.textWhite} />;
      case 'appointment':
        return <Calendar size={20} color={Colors.textWhite} />;
      case 'health_alert':
        return <AlertCircle size={20} color={Colors.textWhite} />;
      default:
        return <Bell size={20} color={Colors.textWhite} />;
    }
  };

  const getIconBgColor = (type: string) => {
    switch (type) {
      case 'medicine':
        return Colors.secondary;
      case 'appointment':
        return Colors.primary;
      case 'health_alert':
        return Colors.warning;
      default:
        return Colors.textMuted;
    }
  };

  const renderNotification = ({ item }: { item: typeof notifications[0] }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.read && styles.unreadCard]}
      activeOpacity={0.8}
    >
      <View style={[styles.notificationIcon, { backgroundColor: getIconBgColor(item.type) }]}>
        {getNotificationIcon(item.type)}
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={[styles.notificationTitle, !item.read && styles.unreadTitle]}>
            {item.title}
          </Text>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton}>
        <Trash2 size={18} color={Colors.textMuted} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <CheckCircle2 size={16} color={Colors.primary} />
          <Text style={styles.actionText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>2</Text>
          <Text style={styles.summaryLabel}>Unread</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>4</Text>
          <Text style={styles.summaryLabel}>Read</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>2</Text>
          <Text style={styles.summaryLabel}>Reminders</Text>
        </View>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: `${Colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: Spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    padding: Spacing.sm,
  },
  actionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: Colors.primary,
  },
  summaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: Colors.card,
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.textPrimary,
  },
  summaryLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  unreadCard: {
    backgroundColor: `${Colors.primary}05`,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  notificationIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  notificationTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.textPrimary,
  },
  unreadTitle: {
    color: Colors.primary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginLeft: Spacing.sm,
  },
  notificationMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.xs,
  },
  notificationTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: Colors.textMuted,
  },
  deleteButton: {
    padding: Spacing.sm,
  },
});
