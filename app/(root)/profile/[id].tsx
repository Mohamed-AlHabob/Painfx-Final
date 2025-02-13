import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { getDoctorById } from "@/core/api";
import { Avatar } from "@/components/ui/avatar";
import icons from "@/constants/icons";
import Filters from "@/components/global/Filters";
import NoResults from "@/components/global/NoResults";

const DoctorProfile = () => {
  const { id } = useLocalSearchParams();
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await getDoctorById(id as string);
        setDoctor(response.results[0]);
        setTimeout(() => {
          setReviews([
            { id: "1", text: "Great doctor!", rating: 5 },
            { id: "2", text: "Very professional.", rating: 4 },
          ]);
          setReviewsLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch doctor details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleCardPress = (id: string) => {
    console.log("Card pressed:", id);
  };

  if (loading) {
    return (
        <ActivityIndicator size="large" color="#0000ff" />
    );
  }

  if (error) {
    return (
        <Text className="text-red-500">{error}</Text>
    );
  }

  if (!doctor) {
    return (
        <Text>Doctor not found.</Text>
    );
  }

  return (
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          reviewsLoading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={() => (
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
              {doctor.user.first_name} {doctor.user.last_name}
              </Text>
              <Image source={icons.bell} className="w-6 h-6" />
            </View>

            <View className="items-center p-6">
              <Avatar
                src={doctor.user.profile.avatar}
                fallback={doctor.user.first_name.charAt(0) || "D"}
                size="lg"
              />
              <Text className="mt-4 text-2xl font-bold text-gray-900">
                {doctor.user.first_name} {doctor.user.last_name}
              </Text>
              <Text className="text-gray-500 text-lg">
                {doctor.specialization?.name || "General"}
              </Text>
            </View>

            <View className="p-6 border-t border-gray-100">
              <Text className="text-lg font-semibold text-gray-900">About</Text>
              <Text className="mt-2 text-gray-600">
                {doctor.bio || "No bio available."}
              </Text>
            </View>

            <View className="p-6 border-t border-gray-100">
              <Text className="text-lg font-semibold text-gray-900">
                Contact Information
              </Text>
              <Text className="mt-2 text-gray-600">Email: {doctor.user.email}</Text>
              <Text className="mt-2 text-gray-600">
                Phone: {doctor.phone_number || "N/A"}
              </Text>
            </View>

            <View className="p-6 border-t border-gray-100">
              <Text className="text-lg font-semibold text-gray-900">Location</Text>
              <Text className="mt-2 text-gray-600">
                {doctor.address || "No address available."}
              </Text>
            </View>

            <View className="mt-5">
              <Filters />

              <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                Reviews ({reviews.length})
              </Text>
            </View>
          </View>
        )}
        renderItem={({ item }) => (
              <View className="p-4">
                <Text className="text-gray-900 font-medium">{item.text}</Text>
                <Text className="text-gray-500 text-sm mt-2">
                  Rating: {item.rating}/5
                </Text>
              </View>
        )}
      />
  );
};

export default DoctorProfile;