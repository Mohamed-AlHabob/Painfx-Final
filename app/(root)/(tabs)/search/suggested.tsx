import { DropdownMenu } from '@/components/ui/dropdown';
import React from 'react';
import { View,Text } from 'react-native';

export default function page() {

  return (
    <View className='flex-1 justify-center items-center bg-background'>
    <Text className='text-foreground text-2xl font-bold'>canceled</Text>
    <DropdownMenu
    options={[
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    ]}
    onSelect={(value) => console.log("Selected:", value)}
     placeholder="Choose an option"
   />
  </View>
  );
}
