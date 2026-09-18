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
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Heart,
  Activity,
  User,
  AlertCircle,
  TrendingUp,
  Shield,
  Info,
  Thermometer,
} from 'lucide-react-native';
import { Colors, Gradients, Shadows, BorderRadius, Spacing } from '@/constants/theme';
import { heartRiskModel, predictRiskPercent } from '@/constants/riskModels';

export default function HeartPredictionScreen() {
  const [age, setAge] = useState(45);
  const [sex, setSex] = useState(1);
  const [cp, setCp] = useState(0);
  const [trestbps, setTrestbps] = useState(130);
  const [chol, setChol] = useState(200);
  const [fbs, setFbs] = useState(0);
  const [thalach, setThalach] = useState(150);
  const [exang, setExang] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [riskScore, setRiskScore] = useState(0);
  const slideAnim = useRef(new Animated.Value(100)).current;

  const analyzeRisk = () => {
    setIsAnalyzing(true);
    setShowResult(false);

    setTimeout(() => {
      const calculatedRisk = predictRiskPercent(heartRiskModel, [
        age,
        sex,
        cp + 1,
        trestbps,
        chol,
        fbs,
        thalach,
        exang,
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

  const InputRow = ({
    label,
    value,
    onIncrease,
    onDecrease,
    unit,
    min,
    max,
  }: {
    label: string;
    value: number;
    onIncrease: () => void;
    onDecrease: () => void;
    unit: string;
    min: number;
    max: number;
  }) => (
    <View style={styles.inputRow}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputControls}>
        <TouchableOpacity
          style={[styles.inputButton, value <= min && styles.inputButtonDisabled]}
          onPress={onDecrease}
          disabled={value <= min}
        >
          <Text style={styles.inputButtonText}>-</Text>
        </TouchableOpacity>
        <View style={styles.inputValue}>
          <Text style={styles.inputValueText}>{value}</Text>
          <Text style={styles.inputUnit}>{unit}</Text>
        </View>
        <TouchableOpacity
          style={[styles.inputButton, value >= max && styles.inputButtonDisabled]}
          onPress={onIncrease}
          disabled={value >= max}
        >
          <Text style={styles.inputButtonText}>+</Text>
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
      <Text style={styles.headerTitle}>Heart Disease</Text>
      <TouchableOpacity style={styles.infoButton}>
        <Info size={22} color={Colors.error} />
      </TouchableOpacity>
    </View>

    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <LinearGradient
        colors={['#EF4444', '#DC2626']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroCard}
      >
        <Heart size={40} color={Colors.textWhite} fill={Colors.textWhite} />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Heart Disease Prediction</Text>
          <Text style={styles.heroSubtitle}>
            Dataset-trained cardiovascular risk estimate
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Health Parameters</Text>

        <InputRow
          label="Age"
          value={age}
          onIncrease={() => setAge((v) => Math.min(100, v + 1))}
          onDecrease={() => setAge((v) => Math.max(18, v - 1))}
          unit="years"
          min={18}
          max={100}
        />

        <View style={styles.sexSelector}>
          <Text style={styles.inputLabel}>Sex</Text>
          <View style={styles.sexButtons}>
            <TouchableOpacity
              style={[styles.sexButton, sex === 1 && styles.sexButtonActive]}
              onPress={() => setSex(1)}
            >
              <Text style={[styles.sexButtonText, sex === 1 && styles.sexButtonTextActive]}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sexButton, sex === 0 && styles.sexButtonActive]}
              onPress={() => setSex(0)}
            >
              <Text style={[styles.sexButtonText, sex === 0 && styles.sexButtonTextActive]}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.inputLabel}>Chest Pain Type</Text>
        <View style={styles.cpSelector}>
          {['Typical Angina', 'Atypical Angina', 'Non-Anginal', 'Asymptomatic'].map((type, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.cpButton, cp === idx && styles.cpButtonActive]}
              onPress={() => setCp(idx)}
            >
              <Text style={[styles.cpButtonText, cp === idx && styles.cpButtonTextActive]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <InputRow
          label="Resting BP"
          value={trestbps}
          onIncrease={() => setTrestbps((v) => Math.min(200, v + 1))}
          onDecrease={() => setTrestbps((v) => Math.max(90, v - 1))}
          unit="mmHg"
          min={90}
          max={200}
        />

        <InputRow
          label="Cholesterol"
          value={chol}
          onIncrease={() => setChol((v) => Math.min(400, v + 1))}
          onDecrease={() => setChol((v) => Math.max(100, v - 1))}
          unit="mg/dL"
          min={100}
          max={400}
        />

        <View style={styles.sexSelector}>
          <Text style={styles.inputLabel}>Fasting Blood Sugar {'>'} 120mg/dL</Text>
          <View style={styles.sexButtons}>
            <TouchableOpacity
              style={[styles.sexButton, fbs === 1 && styles.sexButtonActive]}
              onPress={() => setFbs(1)}
            >
              <Text style={[styles.sexButtonText, fbs === 1 && styles.sexButtonTextActive]}>
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sexButton, fbs === 0 && styles.sexButtonActive]}
              onPress={() => setFbs(0)}
            >
              <Text style={[styles.sexButtonText, fbs === 0 && styles.sexButtonTextActive]}>
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <InputRow
          label="Max Heart Rate"
          value={thalach}
          onIncrease={() => setThalach((v) => Math.min(220, v + 1))}
          onDecrease={() => setThalach((v) => Math.max(60, v - 1))}
          unit="bpm"
          min={60}
          max={220}
        />

        <View style={styles.sexSelector}>
          <Text style={styles.inputLabel}>Exercise Induced Angina</Text>
          <View style={styles.sexButtons}>
            <TouchableOpacity
              style={[styles.sexButton, exang === 1 && styles.sexButtonActive]}
              onPress={() => setExang(1)}
            >
              <Text style={[styles.sexButtonText, exang === 1 && styles.sexButtonTextActive]}>
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sexButton, exang === 0 && styles.sexButtonActive]}
              onPress={() => setExang(0)}
            >
              <Text style={[styles.sexButtonText, exang === 0 && styles.sexButtonTextActive]}>
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
            <Heart size={20} color={Colors.textWhite} fill={Colors.textWhite} />
            <Text style={styles.analyzeButtonText}>Assess Risk</Text>
          </>
        )}
      </TouchableOpacity>

      {showResult && (
        <Animated.View style={[styles.resultCard, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.resultHeader}>
            <View style={[styles.riskGauge, { borderColor: getRiskColor(riskScore) }]}>
              <Heart size={32} color={getRiskColor(riskScore)} fill={getRiskColor(riskScore)} />
              <Text style={[styles.riskScore, { color: getRiskColor(riskScore) }]}>{riskScore}%</Text>
              <Text style={styles.riskLabel}>{getRiskLabel(riskScore)}</Text>
            </View>
          </View>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${riskScore}%`, backgroundColor: getRiskColor(riskScore) },
              ]}
            />
          </View>

          <View style={styles.recommendations}>
            <Text style={styles.recommendationsTitle}>Heart Health Tips</Text>
            <View style={styles.recommendationItem}>
              <Shield size={16} color={Colors.success} />
              <Text style={styles.recommendationText}>Regular cardiovascular exercise</Text>
            </View>
            <View style={styles.recommendationItem}>
              <Activity size={16} color={Colors.primary} />
              <Text style={styles.recommendationText}>Maintain healthy cholesterol levels</Text>
            </View>
            <View style={styles.recommendationItem}>
              <Heart size={16} color={Colors.error} />
              <Text style={styles.recommendationText}>Monitor blood pressure regularly</Text>
            </View>
          </View>

          <View style={styles.disclaimer}>
            <AlertCircle size={14} color={Colors.warning} />
            <Text style={styles.disclaimerText}>
              This assessment is for informational purposes only. Consult a cardiologist for
              professional evaluation.
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
    backgroundColor: `${Colors.error}10`,
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
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textPrimary,
    flex: 1,
  },
  inputControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  inputButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputButtonDisabled: {
    opacity: 0.5,
  },
  inputButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.primary,
  },
  inputValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    minWidth: 60,
    justifyContent: 'center',
  },
  inputValueText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
  },
  inputUnit: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textMuted,
    marginLeft: 4,
  },
  sexSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sexButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  sexButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.backgroundAlt,
  },
  sexButtonActive: {
    backgroundColor: Colors.error,
  },
  sexButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  sexButtonTextActive: {
    color: Colors.textWhite,
  },
  cpSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  cpButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: Colors.backgroundAlt,
  },
  cpButtonActive: {
    backgroundColor: Colors.error,
  },
  cpButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  cpButtonTextActive: {
    color: Colors.textWhite,
  },
  analyzeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.error,
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
    gap: Spacing.xs,
  },
  riskScore: {
    fontFamily: 'Poppins-Bold',
    fontSize: 40,
  },
  riskLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
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
