import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Users, Truck, Settings, ChartBar as BarChart3, ChevronRight, Bell, CircleUser as UserCircle, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import Header from '@/components/ui/Header';
import Colors from '@/constants/Colors';

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showBadge?: boolean;
}

function MenuItem({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  showBadge = false 
}: MenuItemProps) {
  return (
    <TouchableOpacity 
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuIconContainer}>
        {icon}
        {showBadge && <View style={styles.badge} />}
      </View>
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      <ChevronRight size={20} color={Colors.gray[400]} />
    </TouchableOpacity>
  );
}

export default function MoreScreen() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header title="More" />
      
      <ScrollView style={styles.content}>
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <UserCircle size={64} color={Colors.gray[400]} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Dr. John Smith</Text>
            <Text style={styles.profileRole}>Pharmacy Manager</Text>
          </View>
        </View>
        
        {/* Management Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Management</Text>
          
          <MenuItem
            icon={<Users size={24} color={Colors.primary} />}
            title="Customer Management"
            subtitle="View and manage customer profiles"
            onPress={() => console.log('Navigate to Customer Management')}
          />
          
          <MenuItem
            icon={<Truck size={24} color={Colors.secondary} />}
            title="Supplier Management"
            subtitle="Manage suppliers and orders"
            onPress={() => console.log('Navigate to Supplier Management')}
            showBadge={true}
          />
          
          <MenuItem
            icon={<BarChart3 size={24} color="#8E44AD" />}
            title="Reports & Analytics"
            subtitle="View sales and inventory reports"
            onPress={() => console.log('Navigate to Reports')}
          />
        </View>
        
        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings & Help</Text>
          
          <MenuItem
            icon={<Settings size={24} color={Colors.gray[600]} />}
            title="Settings"
            subtitle="App preferences and account settings"
            onPress={() => console.log('Navigate to Settings')}
          />
          
          <MenuItem
            icon={<Bell size={24} color={Colors.gray[600]} />}
            title="Notifications"
            subtitle="Manage your notification preferences"
            onPress={() => console.log('Navigate to Notifications')}
          />
          
          <MenuItem
            icon={<HelpCircle size={24} color={Colors.gray[600]} />}
            title="Help & Support"
            subtitle="Get help and contact support"
            onPress={() => console.log('Navigate to Help')}
          />
        </View>
        
        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => console.log('Logout')}
        >
          <LogOut size={20} color={Colors.danger} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  profileImageContainer: {
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.gray[800],
    marginBottom: 4,
  },
  profileRole: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[500],
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.gray[700],
    marginBottom: 12,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.danger,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.gray[800],
    marginBottom: 2,
  },
  menuSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.gray[500],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    marginBottom: 16,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.danger,
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.gray[500],
  },
});