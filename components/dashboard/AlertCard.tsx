import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { CircleAlert as AlertCircle, TriangleAlert as AlertTriangle, Clock } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type AlertType = 'expiry' | 'stock' | 'payment';

interface AlertCardProps {
  type: AlertType;
  title: string;
  description: string;
  time: string;
  onPress: () => void;
}

export default function AlertCard({ 
  type, 
  title, 
  description, 
  time, 
  onPress 
}: AlertCardProps) {
  
  const getIcon = () => {
    switch(type) {
      case 'expiry':
        return <Clock size={20} color={Colors.warning} />;
      case 'stock':
        return <AlertTriangle size={20} color={Colors.danger} />;
      case 'payment':
        return <AlertCircle size={20} color={Colors.primary} />;
      default:
        return <AlertCircle size={20} color={Colors.primary} />;
    }
  };
  
  const getColor = () => {
    switch(type) {
      case 'expiry':
        return Colors.warning;
      case 'stock':
        return Colors.danger;
      case 'payment':
        return Colors.primary;
      default:
        return Colors.primary;
    }
  };
  
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${getColor()}20` }]}>
        {getIcon()}
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Text style={styles.time}>{time}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.gray[800],
    marginBottom: 2,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.gray[500],
  },
  time: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.gray[400],
    marginLeft: 8,
  },
});