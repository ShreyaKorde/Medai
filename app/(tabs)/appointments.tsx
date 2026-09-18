import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  ChevronRight,
  Plus,
  Bell,
  Stethoscope,
} from 'lucide-react-native';
import { Colors, Gradients, Shadows, BorderRadius, Spacing } from '@/constants/theme';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const calendarDays = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  isCurrent: i + 1 === 22,
  hasAppointment: [5, 12, 22, 28].includes(i + 1),
}));

const upcomingAppointments = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    date: 'June 22, 2026',
    time: '10:30 AM',
    location: 'Heart Care Medical Center',
    status: 'confirmed',
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Chen',
    specialty: 'General Practitioner',
    date: 'June 28, 2026',
    time: '2:00 PM',
    location: 'City Health Clinic',
    status: 'pending',
  },
  {
    id: '3',
    doctorName: 'Dr. Emily Davis',
    specialty: 'Dermatologist',
    date: 'July 5, 2026',
    time: '11:00 AM',
    location: 'Skin & Wellness Center',
    status: 'confirmed',
  },
];

export default function AppointmentsScreen() {
  const router = useRouter();
  const currentMonth = 'June 2026';

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Appointments</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Plus size={20} color={Colors.textWhite} />
          </TouchableOpacity>
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity>
              <Text style={styles.monthNav}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.monthTitle}>{currentMonth}</Text>
            <TouchableOpacity>
              <Text style={styles.monthNav}>{'>'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weekdays}>
            {weekdays.map((day) => (
              <Text key={day} style={styles.weekdayText}>{day}</Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {Array.from({ length: 35 }).map((_, index) => {
              const dayNum = index - 3;
              const calendarDay = calendarDays.find((d) => d.day === dayNum);
              if (dayNum <= 0 || dayNum > 31) {
                return <View key={index} style={styles.calendarDayEmpty} />;
              }
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.calendarDay,
                    calendarDay?.isCurrent && styles.calendarDayCurrent,
                  ]}
                >
                  {calendarDay?.hasAppointment && (
                    <View style={styles.appointmentDot} />
                  )}
                  <Text
                    style={[
                      styles.calendarDayText,
                      calendarDay?.isCurrent && styles.calendarDayTextCurrent,
                    ]}
                  >
                    {dayNum}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.appointmentsContainer}>
          {upcomingAppointments.map((appointment) => (
            <TouchableOpacity key={appointment.id} style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <View style={styles.doctorAvatar}>
                  <Stethoscope size={24} color={Colors.textWhite} />
                </View>
                <View style={styles.appointmentInfo}>
                  <Text style={styles.doctorName}>{appointment.doctorName}</Text>
                  <Text style={styles.specialty}>{appointment.specialty}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    appointment.status === 'confirmed'
                      ? styles.statusConfirmed
                      : styles.statusPending,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      appointment.status === 'confirmed'
                        ? styles.statusTextConfirmed
                        : styles.statusTextPending,
                    ]}
                  >
                    {appointment.status}
                  </Text>
                </View>
              </View>

              <View style={styles.appointmentDetails}>
                <View style={styles.detailRow}>
                  <Calendar size={16} color={Colors.primary} />
                  <Text style={styles.detailText}>{appointment.date}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Clock size={16} color={Colors.secondary} />
                  <Text style={styles.detailText}>{appointment.time}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MapPin size={16} color={Colors.error} />
                  <Text style={styles.detailText}>{appointment.location}</Text>
                </View>
              </View>

              <View style={styles.appointmentActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Bell size={16} color={Colors.primary} />
                  <Text style={styles.actionButtonText}>Set Reminder</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Reschedule</Text>
                  <ChevronRight size={16} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
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
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Colors.textPrimary,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.md,
  },
  calendarCard: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 20,
    marginBottom: Spacing.xl,
    ...Shadows.md,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  monthNav: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.textSecondary,
    paddingHorizontal: Spacing.md,
  },
  monthTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.textPrimary,
  },
  weekdays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.md,
  },
  weekdayText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.textMuted,
    width: 36,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  calendarDayEmpty: {
    width: 36,
    height: 36,
    margin: 2,
  },
  calendarDay: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    position: 'relative',
  },
  calendarDayCurrent: {
    backgroundColor: Colors.primary,
  },
  calendarDayText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: Colors.textPrimary,
  },
  calendarDayTextCurrent: {
    color: Colors.textWhite,
  },
  appointmentDot: {
    position: 'absolute',
    bottom: 4,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.secondary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
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
  appointmentsContainer: {
    gap: Spacing.md,
  },
  appointmentCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    ...Shadows.sm,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  doctorAvatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  appointmentInfo: {
    flex: 1,
  },
  doctorName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  specialty: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusConfirmed: {
    backgroundColor: `${Colors.success}15`,
  },
  statusPending: {
    backgroundColor: `${Colors.warning}15`,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    textTransform: 'capitalize',
  },
  statusTextConfirmed: {
    color: Colors.success,
  },
  statusTextPending: {
    color: Colors.warning,
  },
  appointmentDetails: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  detailText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textPrimary,
  },
  appointmentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.lg,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  actionButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: Colors.primary,
  },
  bottomSpace: {
    height: 100,
  },
});
