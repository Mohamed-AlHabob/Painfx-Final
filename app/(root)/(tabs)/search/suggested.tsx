import { DropdownMenu } from '@/components/ui/dropdown';
import React from 'react';

export default function page() {

  return (
    <DropdownMenu
    options={[
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    ]}
    onSelect={(value) => console.log("Selected:", value)}
     placeholder="Choose an option"
   />
  );
}
