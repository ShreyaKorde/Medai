import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Brain,
  Activity,
  FileText,
  ChevronRight,
  Heart,
  Sparkles,
} from 'lucide-react-native';
import { Colors, Gradients, Shadows, BorderRadius, Spacing, Typography } from '@/constants/theme';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'AI-Powered Healthcare',
    subtitle: 'Get instant health insights powered by advanced artificial intelligence',
    icon: Brain,
    gradient: [Colors.primary, '#4F46E5'],
    highlights: ['Symptom Analysis', 'Health Predictions', 'Smart Recommendations'],
  },
  {
    id: '2',
    title: 'Track Your Health',
    subtitle: 'Monitor your vital signs and health metrics with beautiful visualizations',
    icon: Activity,
    gradient: [Colors.secondary, '#059669'],
    highlights: ['Daily Tracking', 'Progress Charts', 'Goal Setting'],
  },
  {
    id: '3',
    title: 'Medical Report Analysis',
    subtitle: 'Upload your medical reports and get AI-generated summaries instantly',
    icon: FileText,
    gradient: ['#8B5CF6', '#6366F1'],
    highlights: ['OCR Scanning', 'AI Summary', 'Health Insights'],
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace('/(auth)/login');
    }
  };

  const handleSkip = () => {
    router.replace('/(auth)/login');
  };

  const renderItem = ({ item, index }: { item: typeof onboardingData[0]; index: number }) => {
    const IconComponent = item.icon;
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.slide}>
        <View style={styles.illustrationContainer}>
          <Animated.View style={[styles.iconWrapper, { transform: [{ scale }], opacity }]}>
            <LinearGradient
              colors={item.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.iconGradient}
            >
              <IconComponent size={80} color={Colors.textWhite} strokeWidth={1.5} />
            </LinearGradient>
            <View style={styles.iconDecor}>
              <Sparkles size={24} color={Colors.secondary} />
            </View>
          </Animated.View>

          <View style={styles.floatingElements}>
            <View style={[styles.floatingCircle, styles.floatingCircle1]} />
            <View style={[styles.floatingCircle, styles.floatingCircle2]} />
            <View style={[styles.floatingCircle, styles.floatingCircle3]} />
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>

          <View style={styles.highlights}>
            {item.highlights.map((highlight, idx) => (
              <View key={idx} style={styles.highlightItem}>
                <View style={styles.highlightDot} />
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <Animated.FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        scrollEventThrottle={16}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 24, 8],
              extrapolate: 'clamp',
            });

            const dotOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  { width: dotWidth, opacity: dotOpacity },
                ]}
              />
            );
          })}
        </View>

        <TouchableOpacity onPress={handleNext} activeOpacity={0.9}>
          <LinearGradient
            colors={Gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.nextButton}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Continue'}
            </Text>
            <ChevronRight size={20} color={Colors.textWhite} strokeWidth={2} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomDecor}>
        <Heart size={200} color={Colors.secondary} style={styles.bottomHeart} opacity={0.05} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 24,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  slide: {
    width,
    flex: 1,
    paddingHorizontal: 24,
  },
  illustrationContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  iconWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGradient: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.xl,
  },
  iconDecor: {
    position: 'absolute',
    top: 0,
    right: -8,
    backgroundColor: Colors.background,
    padding: 8,
    borderRadius: 20,
    ...Shadows.md,
  },
  floatingElements: {
    position: 'absolute',
    width: 250,
    height: 250,
  },
  floatingCircle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: Colors.primary,
  },
  floatingCircle1: {
    width: 12,
    height: 12,
    top: 20,
    left: 30,
    backgroundColor: Colors.primary,
    opacity: 0.3,
  },
  floatingCircle2: {
    width: 8,
    height: 8,
    bottom: 30,
    right: 40,
    backgroundColor: Colors.secondary,
    opacity: 0.4,
  },
  floatingCircle3: {
    width: 16,
    height: 16,
    top: 60,
    right: 20,
    backgroundColor: '#8B5CF6',
    opacity: 0.2,
  },
  contentContainer: {
    flex: 0.5,
    paddingHorizontal: 8,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.xxl,
  },
  highlights: {
    paddingHorizontal: 24,
    gap: Spacing.sm,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  highlightDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  highlightText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: Colors.textPrimary,
  },
  footer: {
    paddingBottom: 48,
    paddingHorizontal: 24,
    gap: Spacing.xl,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  nextButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    gap: Spacing.sm,
    ...Shadows.lg,
  },
  nextButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.textWhite,
  },
  bottomDecor: {
    position: 'absolute',
    bottom: -60,
    left: -80,
  },
  bottomHeart: {
    transform: [{ rotate: '-15deg' }],
  },
});
