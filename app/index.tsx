import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Activity, Sparkles } from 'lucide-react-native';
import { Colors, Gradients, Shadows } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={Gradients.hero}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.backgroundPattern}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.circle3} />
      </View>

      <Animated.View
        style={[
          styles.logoContainer,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Animated.View style={[styles.logoCircle, { transform: [{ scale: pulseAnim }] }]}>
          <LinearGradient
            colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
            style={styles.logoGradient}
          >
            <Heart color={Colors.textWhite} size={48} fill={Colors.textWhite} />
          </LinearGradient>
        </Animated.View>

        <View style={styles.decorativeIcons}>
          <Activity color="rgba(255,255,255,0.6)" size={20} style={styles.decorIcon1} />
          <Sparkles color="rgba(255,255,255,0.6)" size={18} style={styles.decorIcon2} />
        </View>

        <Text style={styles.logoText}>MediAI</Text>
        <Text style={styles.tagline}>Your AI-powered healthcare companion</Text>
      </Animated.View>

      <Animated.View style={[styles.bottomSection, { opacity: fadeAnim }]}>
        <View style={styles.loadingIndicator}>
          <View style={[styles.loadingDot, styles.loadingDot1]} />
          <View style={[styles.loadingDot, styles.loadingDot2]} />
          <View style={[styles.loadingDot, styles.loadingDot3]} />
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundPattern: {
    position: 'absolute',
    width,
    height,
  },
  circle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: -100,
    right: -50,
  },
  circle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.08)',
    bottom: 150,
    left: -50,
  },
  circle3: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.05)',
    bottom: -50,
    right: 50,
  },
  logoContainer: {
    alignItems: 'center',
    zIndex: 1,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    ...Shadows.xl,
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decorativeIcons: {
    position: 'absolute',
    width: 140,
    height: 140,
  },
  decorIcon1: {
    position: 'absolute',
    top: 10,
    left: 0,
    transform: [{ rotate: '-15deg' }],
  },
  decorIcon2: {
    position: 'absolute',
    bottom: 20,
    right: 5,
    transform: [{ rotate: '25deg' }],
  },
  logoText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 48,
    color: Colors.textWhite,
    marginTop: 24,
    letterSpacing: -1,
  },
  tagline: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 8,
    textAlign: 'center',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },
  loadingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textWhite,
  },
  loadingDot1: {
    opacity: 0.4,
  },
  loadingDot2: {
    opacity: 0.7,
  },
  loadingDot3: {
    opacity: 1,
  },
});
