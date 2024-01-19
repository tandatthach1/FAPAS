import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Footer() {
  const navigation = useNavigation();

  const CartScreenNavigate = () => {
    navigation.navigate('CartScreen');
  };

  const AccountScreen = () => {
    navigation.navigate('AccountScreen');
  };

  const HomeScreenNavigate = () => {
    navigation.navigate('HomeScreen');
  };

  const NotificationScreenNavigate = () => {
    // Navigate to the NotificationScreen route
    // Replace 'NotificationScreen' with the actual name of your notification screen route
    navigation.navigate('NotificationScreen');
  };

  return (
    <>
      <View style={styles.Footer}>
        <TouchableOpacity style={styles.footerItem} onPress={HomeScreenNavigate}>
          <FontAwesome name="home" size={24} color="black" />
          <Text style={styles.footerText}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={CartScreenNavigate}>
          <FontAwesome name="shopping-cart" size={24} color="black" />
          <Text style={styles.footerText}>Giỏ hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={NotificationScreenNavigate}>
          <FontAwesome name="bell" size={24} color="black" />
          <Text style={styles.footerText}>Thông báo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={AccountScreen}>
          <FontAwesome name="user" size={24} color="black" />
          <Text style={styles.footerText}>Tài khoản</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  Footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
  },
});
