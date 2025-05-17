import { View, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Filter, Plus, Camera } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/ui/Header';
import PrescriptionCard, { Prescription } from '@/components/prescriptions/PrescriptionCard';
import Button from '@/components/ui/Button';
import IconButton from '@/components/ui/IconButton';
import Colors from '@/constants/Colors';

// Sample data
const PRESCRIPTIONS: Prescription[] = [
  {
    id: 'RX12345',
    patientName: 'Sarah Johnson',
    patientImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    doctorName: 'Dr. Michael Rivera',
    date: new Date(2025, 1, 15),
    status: 'pending',
    items: 3,
    imageUrl: 'https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg',
  },
  {
    id: 'RX12346',
    patientName: 'David Wilson',
    patientImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    doctorName: 'Dr. Sophia Liu',
    date: new Date(2025, 1, 14),
    status: 'processing',
    items: 2,
  },
  {
    id: 'RX12347',
    patientName: 'Emma Thompson',
    doctorName: 'Dr. James Patel',
    date: new Date(2025, 1, 12),
    status: 'completed',
    items: 4,
    imageUrl: 'https://images.pexels.com/photos/3683101/pexels-photo-3683101.jpeg',
  },
  {
    id: 'RX12348',
    patientName: 'Robert Garcia',
    patientImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    doctorName: 'Dr. Sarah Johnson',
    date: new Date(2025, 1, 10),
    status: 'rejected',
    items: 1,
  },
  {
    id: 'RX12349',
    patientName: 'Jennifer Lee',
    doctorName: 'Dr. Michael Rivera',
    date: new Date(2025, 1, 8),
    status: 'completed',
    items: 2,
  },
];

// Filter options
const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'processing', label: 'Processing' },
  { key: 'completed', label: 'Completed' },
  { key: 'rejected', label: 'Rejected' },
];

export default function PrescriptionsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [prescriptions, setPrescriptions] = useState(PRESCRIPTIONS);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Search function
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text) {
      const filtered = PRESCRIPTIONS.filter(
        prescription => 
          prescription.patientName.toLowerCase().includes(text.toLowerCase()) ||
          prescription.doctorName.toLowerCase().includes(text.toLowerCase()) ||
          prescription.id.toLowerCase().includes(text.toLowerCase())
      );
      setPrescriptions(filtered);
    } else {
      filterPrescriptions(activeFilter);
    }
  };
  
  // Filter function
  const filterPrescriptions = (filterKey: string) => {
    setActiveFilter(filterKey);
    
    if (filterKey === 'all') {
      setPrescriptions(PRESCRIPTIONS);
    } else {
      const filtered = PRESCRIPTIONS.filter(
        prescription => prescription.status === filterKey
      );
      setPrescriptions(filtered);
    }
  };
  
  // Handle prescription press
  const handlePrescriptionPress = (prescription: Prescription) => {
    console.log('Prescription pressed:', prescription);
    // Navigate to prescription details
  };
  
  // Render item
  const renderItem = ({ item }: { item: Prescription }) => (
    <PrescriptionCard
      prescription={item}
      onPress={handlePrescriptionPress}
    />
  );
  
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header 
        title="Prescriptions" 
        rightComponent={
          <IconButton
            icon={<Camera size={22} color={Colors.gray[700]} />}
            onPress={() => console.log('Open camera')}
            variant="ghost"
            size="medium"
          />
        }
      />
      
      <View style={styles.content}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color={Colors.gray[400]} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search prescriptions..."
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor={Colors.gray[400]}
            />
          </View>
          <TouchableOpacity 
            style={[
              styles.filterButton,
              { backgroundColor: Colors.white }
            ]}
          >
            <Filter size={20} color={Colors.gray[600]} />
          </TouchableOpacity>
        </View>
        
        {/* Filter tabs */}
        <View style={styles.filterTabs}>
          <FlatList
            data={FILTERS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.filterTabsContent}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.filterTab,
                  activeFilter === item.key && styles.activeFilterTab
                ]}
                onPress={() => filterPrescriptions(item.key)}
              >
                <Button
                  title={item.label}
                  variant={activeFilter === item.key ? 'primary' : 'outline'}
                  size="small"
                  onPress={() => filterPrescriptions(item.key)}
                  style={styles.filterButton}
                />
              </TouchableOpacity>
            )}
          />
        </View>
        
        {/* Prescriptions list */}
        <FlatList
          data={prescriptions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.prescriptionsList}
          showsVerticalScrollIndicator={false}
        />
        
        {/* Add new prescription button */}
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => console.log('Add new prescription')}
        >
          <Plus size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[100],
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  searchInput: {
    flex: 1,
    height: '100%',
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.gray[800],
  },
  filterButton: {
    marginLeft: 8,
  },
  filterButtonContainer: {
    marginLeft: 8,
    backgroundColor: Colors.white,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  filterTabs: {
    marginBottom: 12,
  },
  filterTabsContent: {
    paddingRight: 16,
  },
  filterTab: {
    marginRight: 8,
  },
  activeFilterTab: {
    backgroundColor: Colors.primary,
    borderRadius: 6,
  },
  prescriptionsList: {
    paddingBottom: 80,
  },
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});