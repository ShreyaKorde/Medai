import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-chart-kit';
import {
  Activity,
  Heart,
  Droplets,
  Scale,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  Moon,
  Footprints,
  Target,
  ChevronRight,
} from 'lucide-react-native';
import { Colors, Gradients, Shadows, BorderRadius, Spacing } from '@/constants/theme';

const { width } = Dimensions.get('window');

const healthMetrics = [
  {
    id: 'weight',
    title: 'Weight',
    value: '72.5',
    unit: 'kg',
    change: -0.5,
    trend: 'down',
    icon: Scale,
    color: Colors.primary,
    data: [70, 71, 72, 71.5, 72, 72.5, 72.5],
  },
  {
    id: 'bp',
    title: 'Blood Pressure',
    value: '120/80',
    unit: 'mmHg',
    change: 0,
    trend: 'stable',
    icon: Heart,
    color: Colors.error,
    data: [118, 120, 122, 121, 119, 120, 120],
  },
  {
    id: 'sugar',
    title: 'Blood Sugar',
    value: '95',
    unit: 'mg/dL',
    change: 2,
    trend: 'up',
    icon: Droplets,
    color: Colors.warning,
    data: [92, 94, 93, 95, 94, 93, 95],
  },
  {
    id: 'heartRate',
    title: 'Heart Rate',
    value: '68',
    unit: 'bpm',
    change: -2,
    trend: 'down',
    icon: Activity,
    color: Colors.secondary,
    data: [70, 72, 71, 69, 68, 69, 68],
  },
];

const dailyGoals = [
  { id: '1', title: 'Steps', current: 6500, target: 10000, unit: 'steps', icon: Footprints, color: Colors.primary },
  { id: '2', title: 'Sleep', current: 7.5, target: 8, unit: 'hours', icon: Moon, color: '#8B5CF6' },
  { id: '3', title: 'Water', current: 6, target: 8, unit: 'glasses', icon: Droplets, color: Colors.secondary },
];

export default function HealthScreen() {
  const [selectedMetric, setSelectedMetric] = useState('weight');

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} color={Colors.success} />;
      case 'down':
        return <TrendingDown size={16} color={Colors.error} />;
      default:
        return <Minus size={16} color={Colors.textMuted} />;
    }
  };

  const currentMetric = healthMetrics.find((m) => m.id === selectedMetric);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Health Tracker</Text>
          <Text style={styles.headerSubtitle}>Monitor your vital signs</Text>
        </View>

        <LinearGradient
          colors={['#8B5CF6', '#6366F1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.bmiCard}
        >
          <View style={styles.bmiContent}>
            <View style={styles.bmiLeft}>
              <Text style={styles.bmiLabel}>Your BMI</Text>
              <Text style={styles.bmiValue}>23.4</Text>
              <View style={styles.bmiStatus}>
                <Text style={styles.bmiStatusText}>Normal Weight</Text>
              </View>
            </View>
            <View style={styles.bmiRight}>
              <View style={styles.bmiIndicator}>
                <Target size={48} color="rgba(255,255,255,0.3)" />
                <View style={styles.bmiTarget} />
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.metricsSelector}>
          {healthMetrics.map((metric) => {
            const IconComponent = metric.icon;
            const isSelected = selectedMetric === metric.id;
            return (
              <TouchableOpacity
                key={metric.id}
                style={[
                  styles.metricTab,
                  isSelected && { backgroundColor: metric.color },
                ]}
                onPress={() => setSelectedMetric(metric.id)}
                activeOpacity={0.8}
              >
                <IconComponent
                  size={20}
                  color={isSelected ? Colors.textWhite : metric.color}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {currentMetric && (
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <View>
                <Text style={styles.chartTitle}>{currentMetric.title}</Text>
                <View style={styles.chartValueRow}>
                  <Text style={styles.chartValue}>{currentMetric.value}</Text>
                  <Text style={styles.chartUnit}> {currentMetric.unit}</Text>
                </View>
              </View>
              <View style={styles.chartTrend}>
                {getTrendIcon(currentMetric.trend)}
                <Text style={[
                  styles.chartTrendText,
                  currentMetric.trend === 'up' && styles.trendUp,
                  currentMetric.trend === 'down' && styles.trendDown,
                ]}>
                  {currentMetric.change > 0 ? '+' : ''}{currentMetric.change} {currentMetric.unit}
                </Text>
              </View>
            </View>
            <LineChart
              data={{
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{ data: currentMetric.data }],
              }}
              width={width - 56}
              height={180}
              chartConfig={{
                backgroundColor: Colors.card,
                backgroundGradientFrom: Colors.card,
                backgroundGradientTo: Colors.card,
                decimalPlaces: 1,
                color: (opacity = 1) => currentMetric.color,
                labelColor: () => Colors.textMuted,
                propsForDots: {
                  r: '5',
                  strokeWidth: '2',
                  stroke: Colors.card,
                  fill: currentMetric.color,
                },
                propsForBackgroundLines: {
                  stroke: Colors.border,
                  strokeDasharray: '5,5',
                },
              }}
              bezier
              style={styles.chart}
            />
          </View>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Daily Goals</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Edit Goals</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.goalsContainer}>
          {dailyGoals.map((goal) => {
            const IconComponent = goal.icon;
            const progress = (goal.current / goal.target) * 100;
            return (
              <View key={goal.id} style={styles.goalCard}>
                <View style={styles.goalHeader}>
                  <View style={[styles.goalIcon, { backgroundColor: `${goal.color}20` }]}>
                    <IconComponent size={20} color={goal.color} />
                  </View>
                  <View style={styles.goalInfo}>
                    <Text style={styles.goalTitle}>{goal.title}</Text>
                    <Text style={styles.goalProgress}>
                      {goal.current} / {goal.target} {goal.unit}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.goalAdd}>
                    <Plus size={16} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
                <View style={styles.goalProgressBar}>
                  <View
                    style={[
                      styles.goalProgressFill,
                      { width: `${Math.min(progress, 100)}%`, backgroundColor: goal.color },
                    ]}
                  />
                </View>
              </View>
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
    marginBottom: Spacing.xl,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  bmiCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: Spacing.xl,
    ...Shadows.lg,
  },
  bmiContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bmiLeft: {},
  bmiLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: Spacing.xs,
  },
  bmiValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 48,
    color: Colors.textWhite,
  },
  bmiStatus: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: Spacing.sm,
    alignSelf: 'flex-start',
  },
  bmiStatusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.textWhite,
  },
  bmiRight: {},
  bmiIndicator: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bmiTarget: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  metricsSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  metricTab: {
    width: (width - 40 - 3 * 10) / 4,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.sm,
  },
  chartCard: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 20,
    marginBottom: Spacing.xl,
    ...Shadows.md,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  chartTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  chartValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  chartValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Colors.textPrimary,
  },
  chartUnit: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.textMuted,
  },
  chartTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.backgroundAlt,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  chartTrendText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.textMuted,
  },
  trendUp: {
    color: Colors.success,
  },
  trendDown: {
    color: Colors.error,
  },
  chart: {
    borderRadius: 16,
    marginLeft: -16,
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
  goalsContainer: {
    gap: Spacing.md,
  },
  goalCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    ...Shadows.sm,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  goalIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  goalProgress: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  goalAdd: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: `${Colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalProgressBar: {
    height: 8,
    backgroundColor: Colors.backgroundAlt,
    borderRadius: 4,
    overflow: 'hidden',
  },
  goalProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  bottomSpace: {
    height: 100,
  },
});
