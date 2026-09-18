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
  Upload,
  Camera,
  FileText,
  Check,
  AlertCircle,
  Sparkles,
  File,
  Eye,
  Share2,
  Trash2,
} from 'lucide-react-native';
import { Colors, Gradients, Shadows, BorderRadius, Spacing } from '@/constants/theme';

const previousReports = [
  {
    id: '1',
    name: 'Blood Test Results - CBC',
    date: 'June 15, 2026',
    status: 'analyzed',
    summary: 'All values within normal range. Hemoglobin: 14.2 g/dL',
  },
  {
    id: '2',
    name: 'Lipid Profile',
    date: 'June 10, 2026',
    status: 'analyzed',
    summary: 'Cholesterol: 190 mg/dL. HDL: 52 mg/dL. LDL: 118 mg/dL',
  },
  {
    id: '3',
    name: 'Thyroid Panel',
    date: 'May 28, 2026',
    status: 'analyzed',
    summary: 'TSH: 2.1 mIU/L. T4: Normal. No abnormalities detected.',
  },
];

export default function MedicalReportScreen() {
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const animate = (toValue: number) => {
      Animated.timing(progressAnim, {
        toValue,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        setUploadProgress(toValue * 100);
        if (toValue < 1) {
          setTimeout(() => animate(Math.min(1, toValue + 0.25)), 100);
        } else {
          setIsUploading(false);
          setIsAnalyzing(true);
          setTimeout(() => {
            setIsAnalyzing(false);
            setShowResult(true);
          }, 2000);
        }
      });
    };

    animate(0.25);
  };

  const getProgressWidth = () => {
    return progressAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medical Reports</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient
          colors={['#F59E0B', '#D97706']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <FileText size={40} color={Colors.textWhite} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>AI Report Analysis</Text>
            <Text style={styles.heroSubtitle}>
              Upload medical reports for instant AI-powered insights
            </Text>
          </View>
        </LinearGradient>

        <TouchableOpacity style={styles.uploadCard} onPress={handleUpload}>
          <View style={styles.uploadIcon}>
            <Upload size={32} color={Colors.primary} />
          </View>
          <Text style={styles.uploadTitle}>Upload Document</Text>
          <Text style={styles.uploadSubtitle}>
            Drag and drop or tap to browse files
          </Text>
          <Text style={styles.uploadFormats}>
            Supports PDF, JPG, PNG
          </Text>
        </TouchableOpacity>

        <View style={styles.uploadActions}>
          <TouchableOpacity style={styles.uploadActionButton}>
            <Camera size={20} color={Colors.secondary} />
            <Text style={styles.uploadActionText}>Scan Document</Text>
          </TouchableOpacity>
          <View style={styles.actionDivider} />
          <TouchableOpacity style={styles.uploadActionButton}>
            <File size={20} color={Colors.primary} />
            <Text style={styles.uploadActionText}>Browse Files</Text>
          </TouchableOpacity>
        </View>

        {(isUploading || isAnalyzing) && (
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              {isAnalyzing ? (
                <>
                  <Sparkles size={20} color={Colors.primary} />
                  <Text style={styles.progressTitle}>Analyzing with AI...</Text>
                </>
              ) : (
                <>
                  <Upload size={20} color={Colors.primary} />
                  <Text style={styles.progressTitle}>Uploading document...</Text>
                </>
              )}
            </View>
            <View style={styles.progressBar}>
              <Animated.View style={[styles.progressFill, { width: getProgressWidth() }]} />
            </View>
            <Text style={styles.progressPercent}>
              {isAnalyzing ? 'Processing...' : `${Math.round(uploadProgress)}%`}
            </Text>
          </View>
        )}

        {showResult && (
          <Animated.View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <View style={styles.resultIconSuccess}>
                <Check size={24} color={Colors.textWhite} />
              </View>
              <View style={styles.resultHeaderText}>
                <Text style={styles.resultTitle}>Analysis Complete</Text>
                <Text style={styles.resultSubtitle}>Blood Test Results - CBC</Text>
              </View>
            </View>

            <View style={styles.summarySection}>
              <Text style={styles.summaryTitle}>AI Summary</Text>
              <Text style={styles.summaryText}>
                Your complete blood count (CBC) results are within normal parameters.
                Key indicators show healthy blood cell production and no signs of
                infection or anemia.
              </Text>
            </View>

            <View style={styles.findingsSection}>
              <Text style={styles.findingsTitle}>Key Findings</Text>
              <View style={styles.findingItem}>
                <View style={styles.findingIconGood}>
                  <Check size={14} color={Colors.success} />
                </View>
                <Text style={styles.findingText}>
                  Hemoglobin: 14.2 g/dL (Normal: 12-17)
                </Text>
              </View>
              <View style={styles.findingItem}>
                <View style={styles.findingIconGood}>
                  <Check size={14} color={Colors.success} />
                </View>
                <Text style={styles.findingText}>
                  WBC Count: 7,500/L (Normal: 4,500-11,000)
                </Text>
              </View>
              <View style={styles.findingItem}>
                <View style={styles.findingIconGood}>
                  <Check size={14} color={Colors.success} />
                </View>
                <Text style={styles.findingText}>
                  Platelets: 250,000/L (Normal: 150,000-450,000)
                </Text>
              </View>
            </View>

            <View style={styles.resultActions}>
              <TouchableOpacity style={styles.resultAction}>
                <Eye size={18} color={Colors.primary} />
                <Text style={styles.resultActionText}>View Full Report</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.resultAction}>
                <Share2 size={18} color={Colors.secondary} />
                <Text style={styles.resultActionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Previous Reports</Text>
        </View>

        <View style={styles.previousReports}>
          {previousReports.map((report) => (
            <TouchableOpacity key={report.id} style={styles.reportCard}>
              <View style={styles.reportHeader}>
                <View style={styles.reportIcon}>
                  <FileText size={20} color={Colors.primary} />
                </View>
                <View style={styles.reportInfo}>
                  <Text style={styles.reportName}>{report.name}</Text>
                  <Text style={styles.reportDate}>{report.date}</Text>
                </View>
                <TouchableOpacity style={styles.reportDelete}>
                  <Trash2 size={16} color={Colors.textMuted} />
                </TouchableOpacity>
              </View>
              <Text style={styles.reportSummary} numberOfLines={2}>
                {report.summary}
              </Text>
              <View style={styles.reportFooter}>
                <View style={styles.analyzedBadge}>
                  <Check size={12} color={Colors.success} />
                  <Text style={styles.analyzedText}>AI Analyzed</Text>
                </View>
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
  uploadCard: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    ...Shadows.md,
  },
  uploadIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: `${Colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  uploadTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  uploadSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  uploadFormats: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.textMuted,
  },
  uploadActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    gap: Spacing.lg,
  },
  uploadActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
  },
  uploadActionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textPrimary,
  },
  actionDivider: {
    width: 1,
    height: 20,
    backgroundColor: Colors.border,
  },
  progressCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: Spacing.xl,
    ...Shadows.md,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  progressTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: Colors.textPrimary,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.backgroundAlt,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressPercent: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'right',
  },
  resultCard: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 24,
    marginBottom: Spacing.xl,
    ...Shadows.lg,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    gap: Spacing.lg,
  },
  resultIconSuccess: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultHeaderText: {
    flex: 1,
  },
  resultTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  resultSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  summarySection: {
    marginBottom: Spacing.xl,
  },
  summaryTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  summaryText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  findingsSection: {
    marginBottom: Spacing.xl,
  },
  findingsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  findingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  findingIconGood: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: `${Colors.success}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  findingText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.textPrimary,
  },
  resultActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xl,
  },
  resultAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  resultActionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: Colors.primary,
  },
  sectionHeader: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.textPrimary,
  },
  previousReports: {
    gap: Spacing.md,
  },
  reportCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    ...Shadows.sm,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  reportIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: `${Colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  reportInfo: {
    flex: 1,
  },
  reportName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  reportDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textMuted,
  },
  reportDelete: {
    padding: Spacing.sm,
  },
  reportSummary: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  reportFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  analyzedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: `${Colors.success}15`,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  analyzedText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: Colors.success,
  },
  bottomSpace: {
    height: 100,
  },
});
