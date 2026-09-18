import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  Search,
  Brain,
  MessageCircle,
  Droplets,
  Heart,
  FileText,
  Activity,
  Bell,
  Calendar,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Clipboard,
} from 'lucide-react-native';
import { Colors, Gradients, Shadows, BorderRadius, Spacing } from '@/constants/theme';

const { width } = Dimensions.get('window');

const quickActions = [
  {
    id: 'symptom',
    title: 'Symptom Checker',
    subtitle: 'AI-powered analysis',
    icon: Brain,
    gradient: ['#6366F1', '#4F46E5'],
    route: '/(tabs)/symptom-checker' as const,
  },
  {
    id: 'chat',
    title: 'AI Health Chat',
    subtitle: 'Ask anything',
    icon: MessageCircle,
    gradient: ['#8B5CF6', '#7C3AED'],
    route: '/(tabs)/chat' as const,
  },
  {
    id: 'diabetes',
    title: 'Diabetes Risk',
    subtitle: 'Prediction tool',
    icon: Droplets,
    gradient: ['#EC4899', '#DB2777'],
    route: '/diabetes-prediction' as const,
  },
  {
    id: 'heart',
    title: 'Heart Disease',
    subtitle: 'Risk assessment',
    icon: Heart,
    gradient: ['#EF4444', '#DC2626'],
    route: '/heart-prediction' as const,
  },
  {
    id: 'report',
    title: 'Medical Reports',
    subtitle: 'AI analysis',
    icon: FileText,
    gradient: ['#F59E0B', '#D97706'],
    route: '/medical-report' as const,
  },
  {
    id: 'tracker',
    title: 'Health Tracker',
    subtitle: 'Track vitals',
    icon: Activity,
    gradient: ['#10B981', '#059669'],
    route: '/(tabs)/health' as const,
  },
];

const recentActivities = [
  {
    id: '1',
    type: 'symptom',
    title: 'Symptom Check',
    description: 'Headache and fatigue analyzed',
    time: '2 hours ago',
    icon: Brain,
  },
  {
    id: '2',
    type: 'chat',
    title: 'AI Chat Session',
    description: 'Discussed sleep improvements',
    time: 'Yesterday',
    icon: MessageCircle,
  },
  {
    id: '3',
    type: 'report',
    title: 'Report Uploaded',
    description: 'Blood test results analyzed',
    time: '2 days ago',
    icon: FileText,
  },
];

const upcomingReminders = [
  {
    id: '1',
    title: 'Take Vitamin D',
    time: '8:00 AM',
    type: 'medicine',
  },
  {
    id: '2',
    title: 'Dr. Smith Appointment',
    time: '10:30 AM',
    type: 'appointment',
  },
  {
    id: '3',
    title: 'Blood Pressure Check',
    time: '2:00 PM',
    type: 'health',
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const healthScore = 85;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.userName}>Welcome to MediAI</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => router.push('/notifications' as any)}
          >
            <Bell size={22} color={Colors.textPrimary} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.textMuted} style={styles.searchIcon} />
          <TouchableOpacity
            style={styles.searchInput}
            onPress={() => router.push('/medicine-search' as any)}
          >
            <Text style={styles.searchPlaceholder}>Search medicines, symptoms...</Text>
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={Gradients.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.healthScoreCard}
        >
          <View style={styles.healthScoreContent}>
            <View style={styles.healthScoreLeft}>
              <Text style={styles.healthScoreLabel}>Your Health Score</Text>
              <View style={styles.healthScoreRow}>
                <Text style={styles.healthScoreValue}>{healthScore}</Text>
                <Text style={styles.healthScoreUnit}>/100</Text>
              </View>
              <View style={styles.healthScoreStatus}>
                <TrendingUp size={16} color={Colors.textWhite} />
                <Text style={styles.healthScoreStatusText}>Excellent Condition</Text>
              </View>
            </View>
            <View style={styles.healthScoreRight}>
              <View style={styles.healthScoreCircle}>
                <Sparkles size={32} color={Colors.textWhite} />
              </View>
            </View>
          </View>
          <View style={styles.healthScoreBar}>
            <View style={[styles.healthScoreBarFill, { width: `${healthScore}%` }]} />
          </View>
        </LinearGradient>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionCard}
                onPress={() => router.push(action.route as any)}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={action.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.quickActionIcon}
                >
                  <IconComponent size={24} color={Colors.textWhite} />
                </LinearGradient>
                <Text style={styles.quickActionTitle} numberOfLines={1}>
                  {action.title}
                </Text>
                <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Reminders</Text>
          <TouchableOpacity onPress={() => router.push('/notifications' as any)}>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={upcomingReminders}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          style={styles.remindersList}
          contentContainerStyle={styles.remindersContent}
          renderItem={({ item }) => (
            <View style={styles.reminderCard}>
              <View style={styles.reminderIconContainer}>
                {item.type === 'medicine' && <Clipboard size={20} color={Colors.primary} />}
                {item.type === 'appointment' && <Calendar size={20} color={Colors.warning} />}
                {item.type === 'health' && <Activity size={20} color={Colors.secondary} />}
              </View>
              <View style={styles.reminderContent}>
                <Text style={styles.reminderTitle}>{item.title}</Text>
                <Text style={styles.reminderTime}>{item.time}</Text>
              </View>
            </View>
          )}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activitiesContainer}>
          {recentActivities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <TouchableOpacity key={activity.id} style={styles.activityCard}>
                <View style={styles.activityIconWrapper}>
                  <IconComponent size={20} color={Colors.primary} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityDescription}>{activity.description}</Text>
                </View>
                <View style={styles.activityRight}>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                  <ChevronRight size={18} color={Colors.textMuted} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  greeting: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.textPrimary,
    marginTop: 2,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.md,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.error,
    borderWidth: 2,
    borderColor: Colors.card,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    paddingHorizontal: Spacing.lg,
    height: 52,
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },
  searchIcon: {
    marginRight: Spacing.md,
  },
  searchInput: {
    flex: 1,
  },
  searchPlaceholder: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: Colors.textMuted,
  },
  healthScoreCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: Spacing.xxl,
    ...Shadows.lg,
  },
  healthScoreContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  healthScoreLeft: {
    flex: 1,
  },
  healthScoreLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: Spacing.xs,
  },
  healthScoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  healthScoreValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 56,
    color: Colors.textWhite,
  },
  healthScoreUnit: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
    marginLeft: Spacing.xs,
  },
  healthScoreStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  healthScoreStatusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: Colors.textWhite,
  },
  healthScoreRight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthScoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthScoreBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  healthScoreBarFill: {
    height: '100%',
    backgroundColor: Colors.textWhite,
    borderRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    marginTop: Spacing.sm,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.textPrimary,
  },
  seeAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  quickActionCard: {
    width: (width - 40 - Spacing.md) / 2,
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: Spacing.lg,
    alignItems: 'center',
    ...Shadows.md,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  quickActionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 2,
  },
  quickActionSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textMuted,
  },
  remindersList: {
    marginBottom: Spacing.xl,
  },
  remindersContent: {
    gap: Spacing.md,
    paddingRight: Spacing.xs,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: Spacing.lg,
    width: 180,
    ...Shadows.sm,
  },
  reminderIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  reminderTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textMuted,
  },
  activitiesContainer: {
    gap: Spacing.md,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  activityIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: `${Colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  activityDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.textMuted,
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  activityTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  bottomSpace: {
    height: 100,
  },
});
