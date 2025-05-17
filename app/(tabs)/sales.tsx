import { View, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, Filter, Calendar, Plus } from 'lucide-react-native';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';
import SaleItem, { Sale } from '@/components/sales/SaleItem';
import Colors from '@/constants/Colors';

// Sample data
const SALES: Sale[] = [
  {
    id: 'INV-2025-001',
    customerName: 'John Smith',
    customerImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    items: 5,
    totalAmount: 125.75,
    date: new Date(2025, 1, 15),
    paymentMethod: 'Credit Card',
    status: 'completed',
  },
  {
    id: 'INV-2025-002',
    customerName: 'Emma Wilson',
    customerImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    items: 2,
    totalAmount: 43.50,
    date: new Date(2025, 1, 14),
    paymentMethod: 'Cash',
    status: 'completed',
  },
  {
    id: 'INV-2025-003',
    customerName: 'David Lee',
    items: 3,
    totalAmount: 78.25,
    date: new Date(2025, 1, 14),
    paymentMethod: 'Credit Card',
    status: 'pending',
  },
  {
    id: 'INV-2025-004',
    customerName: 'Sarah Johnson',
    customerImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    items: 1,
    totalAmount: 23.99,
    date: new Date(2025, 1, 13),
    paymentMethod: 'Cash',
    status: 'completed',
  },
  {
    id: 'INV-2025-005',
    customerName: 'Michael Garcia',
    customerImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    items: 4,
    totalAmount: 105.30,
    date: new Date(2025, 1, 12),
    paymentMethod: 'Credit Card',
    status: 'cancelled',
  },
];

// Filter options
const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'completed', label: 'Completed' },
  { key: 'pending', label: 'Pending' },
  { key: 'cancelled', label: 'Cancelled' },
];

export default function SalesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sales, setSales] = useState(SALES);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Search function
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text) {
      const filtered = SALES.filter(
        sale => 
          sale.customerName.toLowerCase().includes(text.toLowerCase()) ||
          sale.id.toLowerCase().includes(text.toLowerCase())
      );
      setSales(filtered);
    } else {
      filterSales(activeFilter);
    }
  };
  
  // Filter function
  const filterSales = (filterKey: string) => {
    setActiveFilter(filterKey);
    
    if (filterKey === 'all') {
      setSales(SALES);
    } else {
      const filtered = SALES.filter(
        sale => sale.status === filterKey
      );
      setSales(filtered);
    }
  };
  
  // Handle sale press
  const handleSalePress = (sale: Sale) => {
    console.log('Sale pressed:', sale);
    // Navigate to sale details
  };
  
  // Render item
  const renderItem = ({ item }: { item: Sale }) => (
    <SaleItem
      sale={item}
      onPress={handleSalePress}
    />
  );
  
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header 
        title="Sales & Billing" 
        rightComponent={
          <TouchableOpacity style={styles.calendarButton}>
            <Calendar size={20} color={Colors.gray[700]} />
          </TouchableOpacity>
        }
      />
      
      <View style={styles.content}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color={Colors.gray[400]} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search invoices or customers..."
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor={Colors.gray[400]}
            />
          </View>
          <TouchableOpacity style={styles.filterButtonContainer}>
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
                onPress={() => filterSales(item.key)}
              >
                <Button
                  title={item.label}
                  variant={activeFilter === item.key ? 'primary' : 'outline'}
                  size="small"
                  onPress={() => filterSales(item.key)}
                  style={styles.filterButton}
                />
              </TouchableOpacity>
            )}
          />
        </View>
        
        {/* Sales list */}
        <FlatList
          data={sales}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.salesList}
          showsVerticalScrollIndicator={false}
        />
        
        {/* Add new sale button */}
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => console.log('Add new sale')}
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
  filterButtonContainer: {
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
  calendarButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
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
  filterButton: {
    marginLeft: 0,
  },
  salesList: {
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