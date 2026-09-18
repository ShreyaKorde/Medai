import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Search,
  Pill,
  AlertTriangle,
  Info,
  ChevronRight,
  Clock,
  Shield,
  Droplets,
} from 'lucide-react-native';
import { Colors, Gradients, Shadows, BorderRadius, Spacing } from '@/constants/theme';

const medicines = [
  {
    id: '1',
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    dosage: '500mg - 1000mg every 4-6 hours',
    sideEffects: ['Nausea', 'Stomach pain', 'Headache'],
    warnings: ['Do not exceed 4000mg daily', 'Avoid alcohol'],
    interactions: ['Warfarin', 'Carbamazepine'],
  },
  {
    id: '2',
    name: 'Ibuprofen',
    genericName: 'NSAID',
    dosage: '200mg - 400mg every 4-6 hours',
    sideEffects: ['Stomach upset', 'Nausea', 'Dizziness'],
    warnings: ['Take with food', 'Not for children under 12'],
    interactions: ['Aspirin', 'Lithium', 'Methotrexate'],
  },
  {
    id: '3',
    name: 'Amoxicillin',
    genericName: 'Penicillin Antibiotic',
    dosage: '250mg - 500mg every 8 hours',
    sideEffects: ['Rash', 'Nausea', 'Vomiting'],
    warnings: ['Take full course', 'Check for penicillin allergy'],
    interactions: ['Methotrexate', 'Allopurinol'],
  },
  {
    id: '4',
    name: 'Metformin',
    genericName: 'Biguanide',
    dosage: '500mg - 2000mg daily',
    sideEffects: ['Diarrhea', 'Nausea', 'Stomach upset'],
    warnings: ['Monitor kidney function', 'Avoid excessive alcohol'],
    interactions: ['Cimetidine', 'Diuretics'],
  },
  {
    id: '5',
    name: 'Omeprazole',
    genericName: 'Proton Pump Inhibitor',
    dosage: '20mg - 40mg once daily',
    sideEffects: ['Headache', 'Nausea', 'Abdominal pain'],
    warnings: ['Take before breakfast', 'Short-term use recommended'],
    interactions: ['Clopidogrel', 'Ketoconazole'],
  },
];

export default function MedicineSearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState<string | null>(null);

  const filteredMedicines = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genericName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const MedicineCard = ({ medicine }: { medicine: typeof medicines[0] }) => {
    const isExpanded = selectedMedicine === medicine.id;

    return (
      <TouchableOpacity
        style={styles.medicineCard}
        onPress={() => setSelectedMedicine(isExpanded ? null : medicine.id)}
        activeOpacity={0.9}
      >
        <View style={styles.medicineHeader}>
          <View style={styles.medicineIcon}>
            <Pill size={24} color={Colors.textWhite} />
          </View>
          <View style={styles.medicineInfo}>
            <Text style={styles.medicineName}>{medicine.name}</Text>
            <Text style={styles.genericName}>{medicine.genericName}</Text>
          </View>
          <ChevronRight
            size={20}
            color={Colors.textMuted}
            style={{ transform: [{ rotate: isExpanded ? '90deg' : '0deg' }] }}
          />
        </View>

        <View style={styles.dosageRow}>
          <Clock size={14} color={Colors.primary} />
          <Text style={styles.dosageText}>{medicine.dosage}</Text>
        </View>

        {isExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.section}>
              <View style={styles.sectionHeaderRow}>
                <AlertTriangle size={14} color={Colors.warning} />
                <Text style={styles.sectionTitle}>Side Effects</Text>
              </View>
              {medicine.sideEffects.map((effect, idx) => (
                <Text key={idx} style={styles.listItem}>
                  {effect}
                </Text>
              ))}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeaderRow}>
                <Shield size={14} color={Colors.error} />
                <Text style={styles.sectionTitle}>Warnings</Text>
              </View>
              {medicine.warnings.map((warning, idx) => (
                <Text key={idx} style={styles.listItem}>
                  {warning}
                </Text>
              ))}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeaderRow}>
                <Droplets size={14} color={Colors.primary} />
                <Text style={styles.sectionTitle}>Drug Interactions</Text>
              </View>
              {medicine.interactions.map((interaction, idx) => (
                <Text key={idx} style={styles.listItem}>
                  {interaction}
                </Text>
              ))}
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medicine Search</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.textMuted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search medicines..."
          placeholderTextColor={Colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.infoBanner}>
        <Info size={18} color={Colors.primary} />
        <Text style={styles.infoText}>
          Results are for informational purposes only. Always consult a healthcare
          professional before taking any medication.
        </Text>
      </View>

      <FlatList
        data={filteredMedicines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MedicineCard medicine={item} />}
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
  headerRight: {
    width: 44,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: Colors.card,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  searchIcon: {
    marginRight: Spacing.md,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: Colors.textPrimary,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    backgroundColor: `${Colors.primary}10`,
    borderRadius: 12,
    padding: 12,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  infoText: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  medicineCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  medicineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  medicineIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  medicineInfo: {
    flex: 1,
  },
  medicineName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  genericName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  dosageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.backgroundAlt,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  dosageText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.textPrimary,
  },
  expandedContent: {
    marginTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    color: Colors.textPrimary,
  },
  listItem: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
    paddingLeft: Spacing.lg,
  },
});
