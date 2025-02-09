import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { format } from 'date-fns'
import { Calendar, Clock, MapPin, User, X } from 'phosphor-react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'

interface ReservationCardProps {
    reservation: {
      id: string
      patient: {
          user:{
              id: string,
              first_name: string
              last_name: string
              profile:{
                avatar: string
              }
            }
      }
      clinic?: {
        name: string
        address: string
      }
      doctor?: {
          user:{
              id: string,
              first_name: string
              last_name: string
              profile:{
                avatar: string
              }
            }
            specialization: {
                name:string
              }
      }
      status: 'pending' | 'confirmed' | 'cancelled'
      reason_for_cancellation?: string
      reservation_date: string
      reservation_time: string
    }
  }

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'confirmed':
        return ['#10B981', '#059669']
      case 'cancelled':
        return ['#EF4444', '#DC2626']
      default:
        return ['#F59E0B', '#D97706']
    }
  }

  return (
    <LinearGradient
      colors={getStatusColor()}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className="px-3 py-1 rounded-full"
    >
      <Text className="text-xs font-medium text-white capitalize">{status}</Text>
    </LinearGradient>
  )
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation }) => {
  const formattedDate = format(new Date(reservation.reservation_date), 'EEEE, MMMM d')
  const formattedTime = format(new Date(`2000-01-01T${reservation.reservation_time}`), 'h:mm a')

  return (
    <Link href={`/reservation-details/${reservation.id}`} className="rounded-2xl shadow-sm mt-4 mx-4 overflow-hidden" >
        <LinearGradient
          colors={['#F9FAFB', '#F3F4F6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-xl shadow-lg p-5 mb-4"
        >
          <View className="flex-row justify-between items-start mb-4">
            <View>
              <Text className="text-xl font-bold text-gray-900 mb-1">
                {reservation.clinic ? reservation.clinic.name : reservation.doctor?.user.first_name}
              </Text>
              <Text className="text-sm font-medium text-gray-600">
                {reservation.doctor?.specialization.name || 'General Appointment'}
              </Text>
            </View>
            <StatusBadge status={reservation.status} />
          </View>

          <View className="space-y-3 mb-4">
            <View className="flex-row items-center">
              <Calendar weight="bold" size={18} color="#4B5563" />
              <Text className="ml-3 text-gray-700 font-medium">{formattedDate}</Text>
            </View>
            <View className="flex-row items-center">
              <Clock weight="bold" size={18} color="#4B5563" />
              <Text className="ml-3 text-gray-700 font-medium">{formattedTime}</Text>
            </View>
            {reservation.clinic && (
              <View className="flex-row items-center">
                <MapPin weight="bold" size={18} color="#4B5563" />
                <Text className="ml-3 text-gray-700 font-medium">{reservation.clinic.address}</Text>
              </View>
            )}
            <View className="flex-row items-center">
              <User weight="bold" size={18} color="#4B5563" />
              <Text className="ml-3 text-gray-700 font-medium">{reservation.patient.user.first_name}</Text>
            </View>
          </View>

          {reservation.status === 'cancelled' && reservation.reason_for_cancellation && (
            <View className="mt-2 bg-red-50 p-3 rounded-lg">
              <Text className="text-red-800 font-medium">
                Cancellation reason: {reservation.reason_for_cancellation}
              </Text>
            </View>
          )}

          {reservation.status === 'pending' && (
            <View className="mt-4 flex-row justify-end">
              <Pressable
                className="bg-gray-200 px-4 py-2 rounded-full flex-row items-center"
              >
                <X size={16} color="#4B5563" />
                <Text className="ml-2 text-gray-700 font-medium">Cancel</Text>
              </Pressable>
            </View>
          )}
        </LinearGradient>
        </Link>
  )
}

export default ReservationCard