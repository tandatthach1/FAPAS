import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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
    navigation.navigate('HomeScreen'); // Assuming there is a 'HomeScreen' route
  };

  return (
    <>
      <View style={styles.Footer}>
        <View style={styles.footerItem}>
          <FontAwesome name="home" onPress={HomeScreenNavigate} size={24} color="black"/>
          <Text style={styles.footerText}>Trang chủ</Text>
        </View>
        <View style={styles.footerItem}>
          <FontAwesome name="shopping-cart" onPress={CartScreenNavigate} size={24} color="black" />
          <Text style={styles.footerText}>Giỏ hàng</Text>
        </View>     
        <View style={styles.footerItem}>
          <FontAwesome name="user" onPress={AccountScreen} size={24} color="black" />
          <Text style={styles.footerText}>Tài khoản</Text>
        </View>
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

});