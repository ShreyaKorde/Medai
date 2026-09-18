import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useState, useRef } from 'react';
import { Slider } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Droplets,
  Activity,
  User,
  AlertCircle,
  Heart,
  Apple,
  TrendingUp,
  Shield,
  Info,
} from 'lucide-react-native';
import { Colors, Gradients, Shadows, BorderRadius, Spacing } from '@/constants/theme';
import { diabetesRiskModel, predictRiskPercent } from '@/constants/riskModels';

export default function DiabetesPredictionScreen() {
  const [pregnancies, setPregnancies] = useState(2);
  const [glucose, setGlucose] = useState(120);
  const [bloodPressure, setBloodPressure] = useState(80);
  const [skinThickness, setSkinThickness] = useState(20);
  const [insulin, setInsulin] = useState(80);
  const [bmi, setBmi] = useState(25.5);
  const [diabetesPedigree, setDiabetesPedigree] = useState(0.5);
  const [age, setAge] = useState(35);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [riskScore, setRiskScore] = useState(0);
  const slideAnim = useRef(new Animated.Value(100)).current;

  const analyzeRisk = () => {
    setIsAnalyzing(true);
    setShowResult(false);

    setTimeout(() => {
      const calculatedRisk = predictRiskPercent(diabetesRiskModel, [
        pregnancies,
        glucose,
        bloodPressure,
        skinThickness,
        insulin,
        bmi,
        diabetesPedigree,
        age,
      ]);

      setRiskScore(calculatedRisk);
      setIsAnalyzing(false);
      setShowResult(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 2000);
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return Colors.success;
    if (score < 60) return Colors.warning;
    return Colors.error;
  };

  const getRiskLabel = (score: number) => {
    if (score < 30) return 'Low Risk';
    if (score < 60) return 'Moderate Risk';
    return 'High Risk';
  };

  const SliderComponent = ({
    label,
    value,
    onValueChange,
    min,
    max,
    step,
    unit,
    icon: IconComponent,
  }: {
    label: string;
    value: number;
    onValueChange: (val: number) => void;
    min: number;
    max: number;
    step: number;
    unit: string;
    icon: any;
  }) => (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderHeader}>
        <View style={styles.sliderLabelRow}>
          <IconComponent size={18} color={Colors.primary} />
          <Text style={styles.sliderLabel}>{label}</Text>
        </View>
        <Text style={styles.sliderValue}>{value} {unit}</Text>
      </View>
      <View style={styles.sliderTrack}>
        <View style={[styles.sliderFill, { width: `${((value - min) / (max - min)) * 100}%` }]} />
      </View>
      <View style={styles.sliderButtons}>
        <TouchableOpacity
          style={styles.sliderButton}
          onPress={() => onValueChange(Math.max(min, value - step))}
        >
          <Text style={styles.sliderButtonText}>-</Text>
        </TouchableOpacity>
        <View style={styles.sliderInputContainer}>
          <Text style={styles.sliderInputText}>{value}</Text>
        </View>
        <TouchableOpacity
          style={styles.sliderButton}
          onPress={() => onValueChange(Math.min(max, value + step))}
        >
          <Text style={styles.sliderButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Diabetes Risk</Text>
        <TouchableOpacity style={styles.infoButton}>
          <Info size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient
          colors={['#EC4899', '#DB2777']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <Droplets size={40} color={Colors.textWhite} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Diabetes Prediction</Text>
            <Text style={styles.heroSubtitle}>
              Dataset-trained risk assessment based on health metrics
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Health Parameters</Text>

          <SliderComponent
            label="Pregnancies"
            value={pregnancies}
            onValueChange={setPregnancies}
            min={0}
            max={17}
            step={1}
            unit=""
            icon={User}
          />

          <SliderComponent
            label="Glucose Level"
            value={glucose}
            onValueChange={setGlucose}
            min={70}
            max={200}
            step={1}
            unit="mg/dL"
            icon={Droplets}
          />

          <SliderComponent
            label="Blood Pressure"
            value={bloodPressure}
            onValueChange={setBloodPressure}
            min={60}
            max={140}
            step={1}
            unit="mmHg"
            icon={Activity}
          />

          <SliderComponent
            label="BMI"
            value={bmi}
            onValueChange={setBmi}
            min={15}
            max={45}
            step={0.1}
            unit="kg/m2"
            icon={User}
          />

          <SliderComponent
            label="Skin Thickness"
            value={skinThickness}
            onValueChange={setSkinThickness}
            min={0}
            max={99}
            step={1}
            unit="mm"
            icon={Activity}
          />

          <SliderComponent
            label="Age"
            value={age}
            onValueChange={setAge}
            min={18}
            max={100}
            step={1}
            unit="years"
            icon={User}
          />

          <SliderComponent
            label="Insulin Level"
            value={insulin}
            onValueChange={setInsulin}
            min={0}
            max={300}
            step={1}
            unit="mu U/ml"
            icon={Droplets}
          />

          <SliderComponent
            label="Diabetes Pedigree"
            value={diabetesPedigree}
            onValueChange={setDiabetesPedigree}
            min={0.078}
            max={2.5}
            step={0.01}
            unit=""
            icon={TrendingUp}
          />
        </View>

        <TouchableOpacity
          style={styles.analyzeButton}
          onPress={analyzeRisk}
          disabled={isAnalyzing}
          activeOpacity={0.9}
        >
          {isAnalyzing ? (
            <ActivityIndicator color={Colors.textWhite} />
          ) : (
            <>
              <Activity size={20} color={Colors.textWhite} />
              <Text style={styles.analyzeButtonText}>Predict Risk</Text>
            </>
          )}
        </TouchableOpacity>

        {showResult && (
          <Animated.View
            style={[
              styles.resultCard,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.resultHeader}>
              <View style={[styles.riskGauge, { borderColor: getRiskColor(riskScore) }]}>
                <Text style={[styles.riskScore, { color: getRiskColor(riskScore) }]}>
                  {riskScore}%
                </Text>
                <Text style={styles.riskLabel}>{getRiskLabel(riskScore)}</Text>
              </View>
            </View>

            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${riskScore}%`,
                    backgroundColor: getRiskColor(riskScore),
                  },
                ]}
              />
            </View>

            <View style={styles.recommendations}>
              <Text style={styles.recommendationsTitle}>Recommendations</Text>
              <View style={styles.recommendationItem}>
                <Shield size={16} color={Colors.success} />
                <Text style={styles.recommendationText}>
                  Maintain a balanced diet low in refined sugars
                </Text>
              </View>
              <View style={styles.recommendationItem}>
                <Activity size={16} color={Colors.primary} />
                <Text style={styles.recommendationText}>
                  Exercise regularly (30 mins daily)
                </Text>
              </View>
              <View style={styles.recommendationItem}>
                <Heart size={16} color={Colors.error} />
                <Text style={styles.recommendationText}>
                  Monitor blood sugar levels regularly
                </Text>
              </View>
            </View>

            <View style={styles.disclaimer}>
              <AlertCircle size={14} color={Colors.warning} />
              <Text style={styles.disclaimerText}>
                This prediction is for informational purposes only. Consult a healthcare
                professional for accurate diagnosis.
              </Text>
            </View>
          </Animated.View>
        )}
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
  infoButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: `${Colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderRadius: 24,
    marginBottom: Spacing.xl,
    gap: Spacing.lg,
    ...Shadows.lg,
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.textWhite,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 20,
    marginBottom: Spacing.xl,
    ...Shadows.md,
  },
  formTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: Spacing.xl,
  },
  sliderContainer: {
    marginBottom: Spacing.xl,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  sliderLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  sliderLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textPrimary,
  },
  sliderValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.primary,
  },
  sliderTrack: {
    height: 6,
    backgroundColor: Colors.backgroundAlt,
    borderRadius: 3,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  sliderButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  sliderButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.primary,
  },
  sliderInputContainer: {
    flex: 1,
    alignItems: 'center',
  },
  sliderInputText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.textPrimary,
  },
  analyzeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
    ...Shadows.lg,
  },
  analyzeButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.textWhite,
  },
  resultCard: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 24,
    ...Shadows.lg,
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  riskGauge: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  riskScore: {
    fontFamily: 'Poppins-Bold',
    fontSize: 48,
  },
  riskLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  progressBar: {
    height: 12,
    backgroundColor: Colors.backgroundAlt,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  recommendations: {
    marginBottom: Spacing.xl,
  },
  recommendationsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
    backgroundColor: Colors.backgroundAlt,
    padding: 12,
    borderRadius: 12,
  },
  recommendationText: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.textPrimary,
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: `${Colors.warning}15`,
    borderRadius: 12,
    padding: 12,
    gap: Spacing.sm,
  },
  disclaimerText: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
