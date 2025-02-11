import { FlatList, Image, Text, TouchableOpacity, View, Dimensions, Platform, RefreshControl } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { ENDPOINTS } from "@/core/config";
import api from "@/core/api";
import { Avatar } from "@/components/ui/avatar";

interface ReservationDetails {
  id: string;
  patient: {
    user: {
      id: string;
      first_name: string;
      last_name: string;
      profile: {
        avatar: string;
      };
    };
  };
  clinic?: {
    name: string;
    address: string;
    icon: string;
  };
  doctor?: {
    user: {
      id: string;
      first_name: string;
      last_name: string;
      profile: {
        avatar: string;
      };
    };
    specialization: {
      name: string;
    };
  };
  status: "pending" | "confirmed" | "cancelled";
  reason_for_cancellation?: string;
  reservation_date: string;
  reservation_time: string;
}

const ReservationDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [reservation, setReservation] = useState<ReservationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // State for refresh control
  const windowHeight = Dimensions.get("window").height;

  const fetchReservation = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`${ENDPOINTS.RESERVATIONS}${id}`);
      if (response.data) {
        setReservation(response.data);
      }
    } catch (error) {
      console.error("Error fetching reservation:", error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop refreshing after data is fetched
    }
  }, [id]);

  useEffect(() => {
    fetchReservation();
  }, [fetchReservation]);

  // Handle pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true); // Start refreshing
    fetchReservation(); // Re-fetch data
  }, [fetchReservation]);

  if (!reservation) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl font-bold">Reservation not found</Text>
      </View>
    );
  }

  const formattedDate = format(new Date(reservation.reservation_date), "EEEE, MMMM d, yyyy");
  const formattedTime = format(new Date(`2000-01-01T${reservation.reservation_time}`), "h:mm a");

  const renderHeader = () => (
    <View className="relative w-full" style={{ height: windowHeight / 2 }}>
      <Image
        source={{
          uri: reservation.clinic?.icon ? "https://example.com/clinic.jpg" : "https://example.com/doctor.jpg",
        }}
        className="size-full"
        resizeMode="cover"
      />

      <View
        className="z-50 absolute inset-x-7"
        style={{
          top: Platform.OS === "ios" ? 70 : 20,
        }}
      >
        <View className="flex flex-row items-center w-full justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
          >
            <Image source={icons.backArrow} className="size-5" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderDetails = () => (
    <View className="px-5 mt-7 flex gap-2">
      <Text className="text-2xl font-rubik-extrabold">
        {reservation.clinic
          ? reservation.clinic.name
          : `Dr. ${reservation.doctor?.user.first_name} ${reservation.doctor?.user.last_name}`}
      </Text>

      <View className="flex flex-row items-center gap-3">
        <View className="flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full">
          <Text className="text-xs font-rubik-bold text-primary-300">
            {reservation.doctor?.specialization?.name || "General"}
          </Text>
        </View>

        <View className="flex flex-row items-center gap-2">
          <Image source={icons.star} className="size-5" />
          <Text className="text-black-200 text-sm mt-1 font-rubik-medium">{reservation.status}</Text>
        </View>
      </View>

      <View className="flex flex-row items-center mt-5">
        <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
          <Image source={icons.calendar} className="size-4" />
        </View>
        <Text className="text-black-300 text-sm font-rubik-medium ml-2">{formattedDate}</Text>
        <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
          <Image source={icons.chat} className="size-4" />
        </View>
        <Text className="text-black-300 text-sm font-rubik-medium ml-2">{formattedTime}</Text>
      </View>

      <View className="w-full border-t border-primary-200 pt-7 mt-5">
        <Text className="text-black-300 text-xl font-rubik-bold">Patient</Text>

        <View className="flex flex-row items-center justify-between mt-4">
          <View className="flex flex-row items-center">

            <Avatar
              src={reservation.patient.user.profile.avatar}
              fallback={reservation.patient.user.first_name.charAt(0) || "N"}
              size="lg"
              className="mr-3"
            />
            <View className="flex flex-col items-start justify-center ml-3">
              <Text className="text-lg text-black-300 text-start font-rubik-bold">
                {`${reservation.patient.user.first_name} ${reservation.patient.user.last_name}`}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {reservation.clinic && (
        <View className="mt-7">
          <Text className="text-black-300 text-xl font-rubik-bold">Location</Text>
          <View className="flex flex-row items-center justify-start mt-4 gap-2">
            <Image source={icons.location} className="w-7 h-7" />
            <Text className="text-black-200 text-sm font-rubik-medium">{reservation.clinic.address}</Text>
          </View>

          <Image source={images.map} className="h-52 w-full mt-5 rounded-xl" />
        </View>
      )}

      {reservation.status === "cancelled" && reservation.reason_for_cancellation && (
        <View className="mt-7">
          <Text className="text-black-300 text-xl font-rubik-bold">Cancellation Reason</Text>
          <Text className="text-black-200 text-base font-rubik mt-2">{reservation.reason_for_cancellation}</Text>
        </View>
      )}
    </View>
  );

  const renderFooter = () => (
    <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 p-7">
      <View className="flex flex-row items-center justify-between gap-10">
        <View className="flex flex-col items-start">
          <Text className="text-black-200 text-xs font-rubik-medium">Status</Text>
          <Text numberOfLines={1} className="text-primary-300 text-start text-2xl font-rubik-bold">
            {reservation.status}
          </Text>
        </View>

        {reservation.status === "pending" && (
          <TouchableOpacity
            className="flex-1 flex flex-row items-center justify-center bg-red-500 py-3 rounded-full shadow-md shadow-zinc-400"
            onPress={() => {
              // Implement cancellation logic here
              console.log("Cancelling reservation:", reservation.id);
            }}
          >
            <Text className="text-white text-lg text-center font-rubik-bold">Cancel Reservation</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const data = [
    { id: "header", component: renderHeader() },
    { id: "details", component: renderDetails() },
  ];

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => item.component}
        contentContainerClassName="pb-32 bg-white"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {renderFooter()}
    </View>
  );
};

export default ReservationDetails;