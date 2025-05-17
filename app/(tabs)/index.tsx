import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Activity, Package, FileText, DollarSign, Users, Clock, TriangleAlert as AlertTriangle, ChartBar as BarChart4 } from 'lucide-react-native';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StatCard from '@/components/dashboard/StatCard';
import RecentSaleCard from '@/components/dashboard/RecentSaleCard';
import AlertCard from '@/components/dashboard/AlertCard';
import Colors from '@/constants/Colors';

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header title="Dashboard" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <StatCard 
            title="Today's Sales" 
            value="$1,245.89" 
            icon={<DollarSign size={20} color={Colors.white} />}
            changePercentage={12.5}
            iconBackgroundColor={Colors.primary}
          />
          <StatCard 
            title="Inventory" 
            value="2,453" 
            icon={<Package size={20} color={Colors.white} />}
            changePercentage={-3.2}
            iconBackgroundColor={Colors.secondary}
          />
        </View>
        
        <View style={styles.statsContainer}>
          <StatCard 
            title="Prescriptions" 
            value="24" 
            icon={<FileText size={20} color={Colors.white} />}
            changePercentage={5.7}
            iconBackgroundColor={Colors.accent}
          />
          <StatCard 
            title="Customers" 
            value="867" 
            icon={<Users size={20} color={Colors.white} />}
            iconBackgroundColor="#8E44AD"
          />
        </View>
        
        {/* Alerts */}
        <Card title="Alerts & Reminders">
          <AlertCard 
            type="expiry"
            title="Medicine Expiry Alert" 
            description="5 medicines expiring in 30 days"
            time="2h ago"
            onPress={() => {}}
          />
          <AlertCard 
            type="stock"
            title="Low Stock Alert" 
            description="Amoxicillin 500mg below threshold"
            time="5h ago"
            onPress={() => {}}
          />
          <AlertCard 
            type="payment"
            title="Payment Due" 
            description="Payment due to HealthPharm Inc."
            time="1d ago"
            onPress={() => {}}
          />
          
          <Button
            title="View All Alerts"
            variant="outline"
            size="small"
            onPress={() => {}}
            style={styles.viewAllButton}
          />
        </Card>
        
        {/* Recent Sales */}
        <Card title="Recent Sales">
          <RecentSaleCard 
            customerName="John Smith"
            customerImage="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
            date={new Date(2025, 1, 15, 14, 30)}
            amount={124.50}
            items={3}
          />
          <RecentSaleCard 
            customerName="Emma Wilson"
            customerImage="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
            date={new Date(2025, 1, 15, 13, 45)}
            amount={75.20}
            items={2}
          />
          <RecentSaleCard 
            customerName="Michael Johnson"
            customerImage="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
            date={new Date(2025, 1, 15, 11, 20)}
            amount={218.75}
            items={5}
          />
          
          <Button
            title="View All Sales"
            variant="outline"
            size="small"
            onPress={() => {}}
            style={styles.viewAllButton}
          />
        </Card>
        
        {/* Quick Actions */}
        <Card title="Quick Actions">
          <View style={styles.quickActionsContainer}>
            <View style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: Colors.primary }]}>
                <Package size={24} color={Colors.white} />
              </View>
              <Text style={styles.actionText}>Add Inventory</Text>
            </View>
            <View style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: Colors.secondary }]}>
                <FileText size={24} color={Colors.white} />
              </View>
              <Text style={styles.actionText}>New Prescription</Text>
            </View>
            <View style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: Colors.accent }]}>
                <DollarSign size={24} color={Colors.white} />
              </View>
              <Text style={styles.actionText}>New Sale</Text>
            </View>
            <View style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: "#8E44AD" }]}>
                <BarChart4 size={24} color={Colors.white} />
              </View>
              <Text style={styles.actionText}>Reports</Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[100],
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  viewAllButton: {
    marginTop: 8,
    alignSelf: 'center',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.gray[700],
    textAlign: 'center',
  },
});