import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity,
  Modal,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Plus, SlidersHorizontal, ScanBarcode as BarcodeScan } from 'lucide-react-native';
import Header from '@/components/ui/Header';
import InventoryItem, { Medicine } from '@/components/inventory/InventoryItem';
import Colors from '@/constants/Colors';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import IconButton from '@/components/ui/IconButton';

// Sample data for demonstration purposes
const MEDICINES: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    category: 'Analgesics',
    price: 5.99,
    stock: 150,
    threshold: 20,
    expiryDate: new Date(2025, 11, 31),
    manufacturer: 'PharmaCorp',
    image: 'https://images.pexels.com/photos/159211/headache-pain-pills-medication-159211.jpeg',
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    price: 12.49,
    stock: 8,
    threshold: 10,
    expiryDate: new Date(2025, 5, 15),
    manufacturer: 'MediPharm',
    image: 'https://images.pexels.com/photos/139398/himalayas-tibet-matterhorn-mountain-139398.jpeg',
  },
  {
    id: '3',
    name: 'Lisinopril 10mg',
    category: 'Antihypertensives',
    price: 8.75,
    stock: 45,
    threshold: 15,
    expiryDate: new Date(2025, 3, 25),
    manufacturer: 'HeartMeds',
  },
  {
    id: '4',
    name: 'Aspirin 100mg',
    category: 'Analgesics',
    price: 4.25,
    stock: 200,
    threshold: 30,
    expiryDate: new Date(2025, 8, 10),
    manufacturer: 'PharmaCorp',
    image: 'https://images.pexels.com/photos/163944/pexels-photo-163944.jpeg',
  },
  {
    id: '5',
    name: 'Metformin 500mg',
    category: 'Antidiabetics',
    price: 7.99,
    stock: 5,
    threshold: 20,
    expiryDate: new Date(2025, 1, 28),
    manufacturer: 'DiabeCare',
  },
];

export default function InventoryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [medicines, setMedicines] = useState(MEDICINES);
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Filter functions
  const filterByLowStock = () => {
    const filtered = MEDICINES.filter(med => med.stock <= med.threshold);
    setMedicines(filtered);
    setActiveFilter('lowStock');
    setFilterVisible(false);
  };
  
  const filterByExpiringSoon = () => {
    const today = new Date();
    const ninetyDaysLater = new Date(today);
    ninetyDaysLater.setDate(today.getDate() + 90);
    
    const filtered = MEDICINES.filter(med => {
      const expiryDate = new Date(med.expiryDate);
      return expiryDate <= ninetyDaysLater;
    });
    
    setMedicines(filtered);
    setActiveFilter('expiring');
    setFilterVisible(false);
  };
  
  const clearFilters = () => {
    setMedicines(MEDICINES);
    setActiveFilter(null);
    setFilterVisible(false);
  };
  
  // Search function
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text) {
      const filtered = MEDICINES.filter(med => 
        med.name.toLowerCase().includes(text.toLowerCase()) ||
        med.category.toLowerCase().includes(text.toLowerCase()) ||
        med.manufacturer.toLowerCase().includes(text.toLowerCase())
      );
      setMedicines(filtered);
    } else {
      setMedicines(MEDICINES);
    }
  };
  
  // Item actions
  const handleItemPress = (item: Medicine) => {
    // View item details
    console.log('View item details:', item);
  };
  
  const handleEdit = (item: Medicine) => {
    // Edit item
    console.log('Edit item:', item);
  };
  
  const handleDelete = (item: Medicine) => {
    Alert.alert(
      "Delete Item",
      `Are you sure you want to delete ${item.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            const updatedMedicines = medicines.filter(med => med.id !== item.id);
            setMedicines(updatedMedicines);
          },
          style: "destructive"
        }
      ]
    );
  };
  
  // Render list item
  const renderItem = ({ item }: { item: Medicine }) => (
    <InventoryItem 
      item={item} 
      onPress={handleItemPress}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
  
  // Render list empty component
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No medicines found</Text>
      <Button 
        title="Clear Search" 
        onPress={() => {
          setSearchQuery('');
          setMedicines(MEDICINES);
        }}
        variant="outline"
        style={{ marginTop: 12 }}
      />
    </View>
  );
  
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header 
        title="Inventory" 
        rightComponent={
          <IconButton
            icon={<BarcodeScan size={24} color={Colors.gray[700]} />}
            onPress={() => console.log('Open barcode scanner')}
            variant="ghost"
            size="medium"
          />
        }
      />
      
      <View style={styles.content}>
        {/* Search and filter */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color={Colors.gray[400]} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search medicines..."
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor={Colors.gray[400]}
            />
          </View>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setFilterVisible(true)}
          >
            <SlidersHorizontal size={22} color={Colors.gray[700]} />
          </TouchableOpacity>
        </View>
        
        {activeFilter && (
          <View style={styles.activeFilterContainer}>
            <Text style={styles.activeFilterText}>
              {activeFilter === 'lowStock' ? 'Low Stock Items' : 'Expiring Soon'}
            </Text>
            <TouchableOpacity onPress={clearFilters}>
              <Text style={styles.clearFilterText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Inventory list */}
        <FlatList
          data={medicines}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyList}
        />
        
        {/* Add new medicine button */}
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => console.log('Add new medicine')}
        >
          <Plus size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
      
      {/* Filter modal */}
      <Modal
        visible={filterVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setFilterVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setFilterVisible(false)}
        >
          <View 
            style={[styles.modalContainer, { bottom: insets.bottom + 16 }]}
          >
            <Card style={styles.filterCard}>
              <Text style={styles.filterTitle}>Filter Inventory</Text>
              
              <TouchableOpacity 
                style={styles.filterOption}
                onPress={filterByLowStock}
              >
                <Text style={styles.filterOptionText}>Low Stock Items</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.filterOption}
                onPress={filterByExpiringSoon}
              >
                <Text style={styles.filterOptionText}>Expiring Soon (90 days)</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.filterOption, styles.clearFilterOption]}
                onPress={clearFilters}
              >
                <Text style={[styles.filterOptionText, styles.clearFilterOptionText]}>
                  Show All Items
                </Text>
              </TouchableOpacity>
              
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => setFilterVisible(false)}
                style={styles.cancelButton}
              />
            </Card>
          </View>
        </TouchableOpacity>
      </Modal>
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
    marginLeft: 12,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  activeFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    backgroundColor: Colors.primary + '10',
    padding: 8,
    borderRadius: 8,
  },
  activeFilterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
  clearFilterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  listContent: {
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.gray[500],
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    paddingHorizontal: 16,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  filterCard: {
    borderRadius: 12,
    paddingVertical: 8,
  },
  filterTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.gray[800],
    marginBottom: 16,
    textAlign: 'center',
  },
  filterOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  filterOptionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.gray[800],
    textAlign: 'center',
  },
  clearFilterOption: {
    borderBottomWidth: 0,
  },
  clearFilterOptionText: {
    color: Colors.primary,
  },
  cancelButton: {
    marginTop: 16,
  },
});