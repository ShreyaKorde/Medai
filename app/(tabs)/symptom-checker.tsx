import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  Mic,
  Send,
  ArrowLeft,
  Brain,
  AlertCircle,
  Shield,
  Stethoscope,
  ChevronRight,
  Thermometer,
  Activity,
  Droplets,
  Wind,
  Sparkles,
} from 'lucide-react-native';
import { Colors, Gradients, Shadows, BorderRadius, Spacing } from '@/constants/theme';

const suggestedSymptoms = [
  { id: '1', label: 'Headache', icon: Brain },
  { id: '2', label: 'Fever', icon: Thermometer },
  { id: '3', label: 'Cough', icon: Wind },
  { id: '4', label: 'Fatigue', icon: Activity },
  { id: '5', label: 'Nausea', icon: Droplets },
  { id: '6', label: 'Dizziness', icon: Sparkles },
];

const mockAnalysisResult = {
  possibleConditions: [
    {
      name: 'Viral Upper Respiratory Infection',
      probability: 72,
      description: 'Common cold or flu-like symptoms',
    },
    {
      name: 'Tension Headache',
      probability: 18,
      description: 'Stress-related headache',
    },
    {
      name: 'Mild Dehydration',
      probability: 10,
      description: 'Fluid deficiency symptoms',
    },
  ],
  precautions: [
    'Stay hydrated with water and electrolyte drinks',
    'Get adequate rest and sleep',
    'Avoid strenuous physical activity',
    'Monitor body temperature regularly',
  ],
  recommendedSpecialist: 'General Practitioner',
  urgency: 'medium' as const,
};

export default function SymptomCheckerScreen() {
  const [symptoms, setSymptoms] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const toggleSymptom = (label: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(label)
        ? prev.filter((s) => s !== label)
        : [...prev, label]
    );
  };

  const analyzeSymptoms = () => {
    setIsAnalyzing(true);
    setShowResult(false);

    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low':
        return Colors.success;
      case 'medium':
        return Colors.warning;
      case 'high':
        return Colors.error;
      default:
        return Colors.primary;
    }
  };

  const allSymptoms = symptoms || selectedSymptoms.join(', ');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Symptom Checker</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <LinearGradient
            colors={['#6366F1', '#4F46E5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <Brain size={40} color={Colors.textWhite} strokeWidth={1.5} />
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Describe Your Symptoms</Text>
              <Text style={styles.heroSubtitle}>
                Our AI will analyze and provide personalized insights
              </Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>How are you feeling?</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.symptomInput}
              placeholder="Describe your symptoms in detail..."
              placeholderTextColor={Colors.textMuted}
              value={symptoms}
              onChangeText={setSymptoms}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <View style={styles.inputActions}>
              <TouchableOpacity style={styles.voiceButton}>
                <Mic size={20} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.suggestionsSection}>
          <Text style={styles.suggestionsLabel}>Quick Select</Text>
          <View style={styles.suggestionsGrid}>
            {suggestedSymptoms.map((symptom) => {
              const IconComponent = symptom.icon;
              const isSelected = selectedSymptoms.includes(symptom.label);
              return (
                <TouchableOpacity
                  key={symptom.id}
                  style={[
                    styles.symptomChip,
                    isSelected && styles.symptomChipSelected,
                  ]}
                  onPress={() => toggleSymptom(symptom.label)}
                  activeOpacity={0.8}
                >
                  <IconComponent
                    size={16}
                    color={isSelected ? Colors.textWhite : Colors.primary}
                  />
                  <Text
                    style={[
                      styles.symptomChipText,
                      isSelected && styles.symptomChipTextSelected,
                    ]}
                  >
                    {symptom.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <TouchableOpacity
          style={styles.analyzeButton}
          onPress={analyzeSymptoms}
          disabled={isAnalyzing || !allSymptoms.trim()}
          activeOpacity={0.9}
        >
          {isAnalyzing ? (
            <ActivityIndicator color={Colors.textWhite} />
          ) : (
            <>
              <Brain size={20} color={Colors.textWhite} />
              <Text style={styles.analyzeButtonText}>Analyze Symptoms</Text>
            </>
          )}
        </TouchableOpacity>

        {showResult && (
          <Animated.View
            style={[
              styles.resultSection,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.resultHeader}>
              <View style={styles.resultIconContainer}>
                <Stethoscope size={28} color={Colors.textWhite} />
              </View>
              <View style={styles.resultHeaderText}>
                <Text style={styles.resultTitle}>Analysis Complete</Text>
                <View
                  style={[
                    styles.urgencyBadge,
                    { backgroundColor: `${getUrgencyColor(mockAnalysisResult.urgency)}20` },
                  ]}
                >
                  <AlertCircle
                    size={14}
                    color={getUrgencyColor(mockAnalysisResult.urgency)}
                  />
                  <Text
                    style={[
                      styles.urgencyText,
                      { color: getUrgencyColor(mockAnalysisResult.urgency) },
                    ]}
                  >
                    {mockAnalysisResult.urgency.toUpperCase()} PRIORITY
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.conditionsSection}>
              <Text style={styles.sectionTitle}>Possible Conditions</Text>
              {mockAnalysisResult.possibleConditions.map((condition, index) => (
                <View key={index} style={styles.conditionCard}>
                  <View style={styles.conditionHeader}>
                    <Text style={styles.conditionName}>{condition.name}</Text>
                    <View style={styles.probabilityContainer}>
                      <Text style={styles.probabilityValue}>{condition.probability}%</Text>
                    </View>
                  </View>
                  <Text style={styles.conditionDescription}>{condition.description}</Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressBarFill,
                        { width: `${condition.probability}%` },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.precautionsSection}>
              <Text style={styles.sectionTitle}>Precautions</Text>
              {mockAnalysisResult.precautions.map((precaution, index) => (
                <View key={index} style={styles.precautionItem}>
                  <View style={styles.precautionIcon}>
                    <Shield size={16} color={Colors.secondary} />
                  </View>
                  <Text style={styles.precautionText}>{precaution}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.specialistCard}>
              <View style={styles.specialistIcon}>
                <Stethoscope size={24} color={Colors.primary} />
              </View>
              <View style={styles.specialistContent}>
                <Text style={styles.specialistLabel}>Recommended Specialist</Text>
                <Text style={styles.specialistName}>
                  {mockAnalysisResult.recommendedSpecialist}
                </Text>
              </View>
              <ChevronRight size={20} color={Colors.textMuted} />
            </TouchableOpacity>

            <View style={styles.disclaimer}>
              <AlertCircle size={16} color={Colors.warning} />
              <Text style={styles.disclaimerText}>
                This is not a medical diagnosis. Please consult a healthcare
                professional for accurate diagnosis and treatment.
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
    backgroundColor: Colors.background,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  heroSection: {
    marginBottom: Spacing.xl,
  },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderRadius: 24,
    gap: Spacing.lg,
    ...Shadows.lg,
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.textWhite,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 20,
  },
  inputSection: {
    marginBottom: Spacing.xl,
  },
  inputLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  inputWrapper: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  symptomInput: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: Colors.textPrimary,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  inputActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  voiceButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${Colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionsSection: {
    marginBottom: Spacing.xl,
  },
  suggestionsLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  symptomChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.xs,
    ...Shadows.sm,
  },
  symptomChipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  symptomChipText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: Colors.primary,
  },
  symptomChipTextSelected: {
    color: Colors.textWhite,
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
  resultSection: {
    marginTop: Spacing.lg,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    gap: Spacing.lg,
  },
  resultIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.md,
  },
  resultHeaderText: {
    flex: 1,
  },
  resultTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  urgencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: Spacing.xs,
    alignSelf: 'flex-start',
  },
  urgencyText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 11,
  },
  conditionsSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  conditionCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  conditionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  conditionName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: Colors.textPrimary,
    flex: 1,
  },
  probabilityContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: `${Colors.primary}10`,
  },
  probabilityValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: Colors.primary,
  },
  conditionDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.backgroundAlt,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  precautionsSection: {
    marginBottom: Spacing.xl,
  },
  precautionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
    ...Shadows.sm,
  },
  precautionIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: `${Colors.secondary}10`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  precautionText: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  specialistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    gap: Spacing.md,
    ...Shadows.md,
  },
  specialistIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: `${Colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  specialistContent: {
    flex: 1,
  },
  specialistLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  specialistName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: `${Colors.warning}10`,
    borderRadius: 12,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  disclaimerText: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
