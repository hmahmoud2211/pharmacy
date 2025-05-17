import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { format } from 'date-fns';
import { ChevronRight, Receipt, Printer, Send } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export interface Sale {
  id: string;
  customerName: string;
  customerImage?: string;
  items: number;
  totalAmount: number;
  date: Date;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'cancelled';
}

interface SaleItemProps {
  sale: Sale;
  onPress: (sale: Sale) => void;
}

export default function SaleItem({ sale, onPress }: SaleItemProps) {
  const getStatusColor = () => {
    switch(sale.status) {
      case 'completed':
        return Colors.success;
      case 'pending':
        return Colors.warning;
      case 'cancelled':
        return Colors.danger;
      default:
        return Colors.gray[500];
    }
  };
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress(sale)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.leftSection}>
          {sale.customerImage ? (
            <Image 
              source={{ uri: sale.customerImage }} 
              style={styles.customerImage} 
            />
          ) : (
            <View style={styles.customerImagePlaceholder}>
              <Text style={styles.customerInitial}>
                {sale.customerName.charAt(0)}
              </Text>
            </View>
          )}
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>{sale.customerName}</Text>
            <View style={styles.idContainer}>
              <Receipt size={12} color={Colors.gray[500]} />
              <Text style={styles.saleId}>#{sale.id}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.amount}>${sale.totalAmount.toFixed(2)}</Text>
          <ChevronRight size={20} color={Colors.gray[400]} />
        </View>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>{format(sale.date, 'MMM dd, yyyy')}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Items:</Text>
          <Text style={styles.detailValue}>{sale.items}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment:</Text>
          <Text style={styles.detailValue}>{sale.paymentMethod}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status:</Text>
          <Text style={[styles.detailValue, { color: getStatusColor() }]}>
            {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Printer size={16} color={Colors.primary} />
          <Text style={styles.actionText}>Print</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Send size={16} color={Colors.primary} />
          <Text style={styles.actionText}>Send</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  customerImagePlaceholder: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  customerInitial: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.gray[500],
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.gray[800],
    marginBottom: 2,
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saleId: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.gray[500],
    marginLeft: 4,
  },
  amount: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.gray[800],
    marginRight: 8,
  },
  details: {
    backgroundColor: Colors.gray[50],
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: Colors.gray[600],
  },
  detailValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: Colors.gray[800],
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: Colors.primary + '10',
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.primary,
    marginLeft: 4,
  },
});