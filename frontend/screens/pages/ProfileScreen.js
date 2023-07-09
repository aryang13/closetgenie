import { useState, React } from 'react';
import { Text, View } from 'react-native';
import { Avatar, Button } from '@rneui/themed';
import { auth } from '../../firebase/firebase.js';
import { signOut } from 'firebase/auth';
import { Icon } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import PrimaryButton from '../../components/Buttons.js';
import userController from '../../controllers/userController.js';

export default function ProfileScreen() {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('Signed out');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Streetwear', value: 'streetwear' },
    { label: 'Formal', value: 'formal' },
    { label: 'Athleisure', value: 'athleisure' },
    { label: 'Minimalist', value: 'minimalist' },
  ]);

  return (
    <View className="py-10 px-10 bg-white h-full">
      <View className="items-center mb-10">
        <Text className="text-4xl font-semibold">Profile</Text>
        {/* <Icon name="person-circle" type="ionicon" size="100" /> */}
        <Avatar
          rounded
          size={150}
          source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }}
          containerStyle={{ marginVertical: 10 }}
        />
        <Text className="text-2xl">John Smith</Text>
        <PrimaryButton className="mt-6" title="Logout" onPress={handleLogout} />
      </View>

      <View className="gap-y-5">
        <View style={Platform.OS === 'ios' ? { zIndex: 100 } : {}}>
          <Text className="text-lg font-semibold">Style preference:</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>

        <Text className="text-lg">
          <Text className="text-lg font-semibold">Email: </Text>
          <Text>johnsmith@gmail.com</Text>
        </Text>

        <Text className="text-lg">
          <Text className="text-lg font-semibold">Phone number: </Text>
          <Text>(123) 456-7890</Text>
        </Text>

        <Button
          title="Update profile"
          onPress={async () => {
            await userController.updateUserStyle(value);
          }}
        />
      </View>
    </View>
  );
}
