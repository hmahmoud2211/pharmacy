import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { format } from 'date-fns';
import { FileText, User, Calendar, CircleCheck as CheckCircle, Clock, Circle as XCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export interface Prescription {
  id: string;
  patientName: string;
  patientImage?: string;
  doctorName: string;
  date: Date;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  items: number;
  imageUrl?: string;
}

interface PrescriptionCardProps {
  prescription: Prescription;
  onPress: (prescription: Prescription) => void;
}

export default function PrescriptionCard({ 
  prescription, 
  onPress 
}: PrescriptionCardProps) {
  
  const getStatusColor = () => {
    switch(prescription.status) {
      case 'pending':
        return Colors.warning;
      case 'processing':
        return Colors.primary;
      case 'completed':
        return Colors.success;
      case 'rejected':
        return Colors.danger;
      default:
        return Colors.gray[500];
    }
  };
  
  const getStatusText = () => {
    switch(prescription.status) {
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing';
      case 'completed':
        return 'Completed';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };
  
  const getStatusIcon = () => {
    switch(prescription.status) {
      case 'pending':
        return <Clock size={16} color={getStatusColor()} />;
      case 'processing':
        return <Clock size={16} color={getStatusColor()} />;
      case 'completed':
        return <CheckCircle size={16} color={getStatusColor()} />;
      case 'rejected':
        return <XCircle size={16} color={getStatusColor()} />;
      default:
        return <Clock size={16} color={getStatusColor()} />;
    }
  };
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress(prescription)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.leftSection}>
          {prescription.patientImage ? (
            <Image 
              source={{ uri: prescription.patientImage }} 
              style={styles.patientImage} 
            />
          ) : (
            <View style={styles.patientImagePlaceholder}>
              <Text style={styles.patientInitial}>
                {prescription.patientName.charAt(0)}
              </Text>
            </View>
          )}
          <View style={styles.patientInfo}>
            <Text style={styles.patientName}>{prescription.patientName}</Text>
            <View style={styles.prescriptionIdContainer}>
              <FileText size={12} color={Colors.gray[500]} />
              <Text style={styles.prescriptionId}>#{prescription.id}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor()}15` }]}>
          {getStatusIcon()}
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>
        </View>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <User size={14} color={Colors.gray[500]} />
          <Text style={styles.detailText}>{prescription.doctorName}</Text>
        </View>
        <View style={styles.detailItem}>
          <Calendar size={14} color={Colors.gray[500]} />
          <Text style={styles.detailText}>
            {format(prescription.date, 'MMM dd, yyyy')}
          </Text>
        </View>
      </View>
      
      {prescription.imageUrl && (
        <View style={styles.imagePreviewContainer}>
          <Image 
            source={{ uri: prescription.imageUrl }} 
            style={styles.prescriptionImage} 
            resizeMode="cover"
          />
        </View>
      )}
      
      <View style={styles.footer}>
        <Text style={styles.itemCount}>
          {prescription.items} {prescription.items === 1 ? 'item' : 'items'}
        </Text>
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
  patientImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  patientImagePlaceholder: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  patientInitial: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.gray[500],
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.gray[800],
    marginBottom: 2,
  },
  prescriptionIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prescriptionId: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.gray[500],
    marginLeft: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.gray[600],
    marginLeft: 4,
  },
  imagePreviewContainer: {
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  prescriptionImage: {
    width: '100%',
    height: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  itemCount: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.gray[700],
  },
});