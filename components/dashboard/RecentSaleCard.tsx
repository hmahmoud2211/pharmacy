import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { format } from 'date-fns';
import Colors from '@/constants/Colors';

interface RecentSaleProps {
  customerName: string;
  customerImage: string;
  date: Date;
  amount: number;
  items: number;
}

export default function RecentSaleCard({ 
  customerName, 
  customerImage, 
  date, 
  amount, 
  items 
}: RecentSaleProps) {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: customerImage }} 
        style={styles.image} 
      />
      <View style={styles.contentContainer}>
        <View style={styles.customerInfo}>
          <Text style={styles.name}>{customerName}</Text>
          <Text style={styles.date}>{format(date, 'MMM dd, h:mm a')}</Text>
        </View>
        <View style={styles.saleInfo}>
          <Text style={styles.amount}>${amount.toFixed(2)}</Text>
          <Text style={styles.items}>{items} items</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  customerInfo: {
    flex: 1,
  },
  saleInfo: {
    alignItems: 'flex-end',
  },
  name: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.gray[800],
    marginBottom: 2,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.gray[500],
  },
  amount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.gray[800],
    marginBottom: 2,
  },
  items: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.gray[500],
  },
});