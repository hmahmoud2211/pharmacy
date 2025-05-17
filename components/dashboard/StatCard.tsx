import { View, Text, StyleSheet } from 'react-native';
import React, { ReactNode } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Card from '@/components/ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  changePercentage?: number;
  iconBackgroundColor?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  changePercentage,
  iconBackgroundColor = Colors.primary,
}: StatCardProps) {
  const isPositiveChange = changePercentage && changePercentage > 0;
  
  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
          {icon}
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.value}>{value}</Text>
        {changePercentage !== undefined && (
          <View style={[
            styles.changeContainer,
            { backgroundColor: isPositiveChange ? 'rgba(52, 168, 83, 0.1)' : 'rgba(234, 67, 53, 0.1)' }
          ]}>
            {isPositiveChange ? (
              <ArrowUpRight size={14} color={Colors.success} />
            ) : (
              <ArrowDownRight size={14} color={Colors.danger} />
            )}
            <Text style={[
              styles.changeText,
              { color: isPositiveChange ? Colors.success : Colors.danger }
            ]}>
              {Math.abs(changePercentage)}%
            </Text>
          </View>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  title: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[500],
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  value: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: Colors.gray[800],
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  changeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 2,
  },
});