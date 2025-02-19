import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGlobalStore } from "@/core/store";
import { removeAuthTokens } from "@/core/auth";
import { Link } from "expo-router";
import { Bell, CreditCard, IDuotoneBlack, Logout } from "@/constants/icons";


interface SettingsItemProp {
  icon: JSX.Element;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const settings = [
  {
    title: "My Bookings",
    icon: <Bell/>,
  },
  {
    title: "Payments",
    icon: <CreditCard/>,
  },
  {
    title: "Profile",
    icon: <Bell/>,
  },
  {
    title: "Notifications",
    icon:<Bell/>,
  },
  {
    title: "Security",
    icon: <Bell/>,
  },
  {
    title: "Language",
    icon: <Bell/>,
  },
  {
    title: "Help Center",
    icon: <Bell/>,
  },
  {
    title: "Invite Friends",
    icon: <CreditCard/>,
  },
];


const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProp) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      {icon}
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>

    {showArrow && <IDuotoneBlack />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch } = useGlobalStore();
  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          await removeAuthTokens();
          refetch();
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View className=" bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold text-black-300">Profile</Text>
          <Link href={"/notification"}>
          <Bell/>
          </Link>
        </View>

        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
          {user?.profile.avatar ? (
            <Image source={{ uri: user?.profile.avatar }} className="size-44 relative rounded-full" resizeMode="cover" />
          ) : (
            <View className="size-44 relative rounded-full bg-primary-100 items-center justify-center">
              <Text className="text-primary-600 text-3xl font-semibold">{user?.first_name.charAt(0) || "N"}</Text>
            </View>
           )}
            <TouchableOpacity className="absolute bottom-11 right-2">
            <CreditCard/>
            </TouchableOpacity>

            <Text className="text-2xl font-rubik-bold mt-2">
              {user?.first_name} {user?.last_name}
            </Text>
          </View>
        </View>
        <View className="flex flex-col mt-10">
          <SettingsItem icon={<CreditCard/>} title="My Bookings" />
          <SettingsItem icon={<CreditCard/>} title="Payments" />
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View className="flex flex-col border-t mt-5 pt-5 border-primary-200">
          <SettingsItem
            icon={<Logout/>}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
      </View>
  );
};

export default Profile;