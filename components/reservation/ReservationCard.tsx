import type React from "react"
import { View, Text, Pressable,Image } from "react-native"
import { format } from "date-fns"
import { Link } from "expo-router"
import { Envalope, ZapDouToneBlack } from "@/constants/icons"

interface Reservation {
  id: string
  reservation_date: string
  reservation_time: string
  status: "pending" | "confirmed" | "cancelled"
  reason_for_cancellation?: string
  clinic?: {
    name: string
    address: string
  }
  doctor?: {
    user: {
      first_name: string
      last_name: string
    }
    specialization?: {
      name: string
    }
  }
  patient: {
    user: {
      first_name: string
      last_name: string
    }
  }
}

interface ReservationCardProps {
  reservation: Reservation
  onCancel: (id: string) => void
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation, onCancel }) => {
  const formattedDate = format(new Date(reservation.reservation_date), "EEEE, MMMM d")
  const formattedTime = format(new Date(`2000-01-01T${reservation.reservation_time}`), "h:mm a")

  const statusColors = {
    cancelled: "text-red-600 bg-red-100",
    confirmed: "text-green-600 bg-green-100",
    pending: "text-yellow-600 bg-yellow-100",
  }

  return (
    <Link href={`/reservation-details/${reservation.id}`} asChild>
      <Pressable className="bg-white rounded-2xl shadow-sm mt-4 mx-4 overflow-hidden">
        <View className="p-4">
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1 mr-4">
              <Text className="text-xl font-bold text-gray-900 mb-1">
                {reservation.clinic?.name ||
                  `${reservation.doctor?.user.first_name} ${reservation.doctor?.user.last_name}` ||
                  "Unknown"}
              </Text>
              <Text className="text-sm font-medium text-gray-600">
                {reservation.doctor?.specialization?.name || "General"}
              </Text>
            </View>
            <View className={`px-3 py-1 rounded-full ${statusColors[reservation.status]}`}>
              <Text className="text-xs font-medium capitalize">{reservation.status}</Text>
            </View>
          </View>

          <View className="space-y-3 mb-4">
            <View className="flex-row items-center">
            <ZapDouToneBlack/>
              <Text className="ml-3 text-gray-700 font-medium">{formattedDate}</Text>
            </View>
            <View className="flex-row items-center">
              <Envalope/>
              <Text className="ml-3 text-gray-700 font-medium">{formattedTime}</Text>
            </View>
            {reservation.clinic && (
              <View className="flex-row items-center">
                <Envalope/>
                <Text className="ml-3 text-gray-700 font-medium">
                  {reservation.clinic.address || "Unknown Address"}
                </Text>
              </View>
            )}
            <View className="flex-row items-center">
            <ZapDouToneBlack/>
              <Text className="ml-3 text-gray-700 font-medium">{`${reservation.patient.user.first_name} ${reservation.patient.user.last_name}`}</Text>
            </View>
          </View>

          {reservation.status === "cancelled" && reservation.reason_for_cancellation && (
            <View className="mt-2 bg-red-50 p-3 rounded-lg">
              <Text className="text-red-800 font-medium">
                Cancellation reason: {reservation.reason_for_cancellation}
              </Text>
            </View>
          )}

          {reservation.status === "pending" && (
            <View className="mt-4 flex-row justify-end">
              <Pressable
                className="bg-gray-200 px-4 py-2 rounded-full flex-row items-center"
                onPress={() => onCancel(reservation.id)}
              >
                 <ZapDouToneBlack/>
                <Text className="ml-2 text-gray-700 font-medium">Cancel</Text>
              </Pressable>
            </View>
          )}
        </View>
      </Pressable>
    </Link>
  )
}

export default ReservationCard

