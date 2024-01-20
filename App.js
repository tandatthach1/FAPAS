import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Login from './Component/Login';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SingleProductScreen from './Component/SingleProductScreen';
import HomeScreen from './Component/HomeScreen';
import CartScreen from './Component/CartScreen';
import { CartProvider } from './Component/CartContent';
import Register from './Component/Register';
import AccountScreen from './Component/AccountScreen';
import NotificationScreen from './Component/NotificationScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <View style={styles.container}>
        <StatusBar style="dark" />

        <NavigationContainer>
          <Stack.Navigator initialRouteName="NotificationScreen">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerTitle: 'Đăng nhập' }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerTitle: 'Đăng ký' }}
            />
            <Stack.Screen
              name="AccountScreen"
              component={AccountScreen}
              options={{
                headerTitle: 'Tài khoản',
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#333', // Your desired text color
                },
                headerStyle: {
                  backgroundColor: '#eee', // Your desired background color
                },
              }}
            />
            <Stack.Screen
              name="NotificationScreen"
              component={NotificationScreen}
              options={{
                headerTitle: 'Thông báo',
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#333', // Your desired text color
                },
                headerStyle: {
                  backgroundColor: '#eee', // Your desired background color
                },
              }}
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                headerTitle: 'FAPAS STORE',
                headerTitleStyle: {
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: '#808080', // Mã màu hex cho xám
                  textShadowColor: 'black', // Mã màu CSS cho đen
                  textShadowOffset: { width: -2, height: 2 }, // Độ dịch chuyển của đổ bóng
                  textShadowRadius: 1, // Bán kính của đổ bóng
                  marginLeft: "25%",
                  marginTop: 0,
   
                },
                headerStyle: {
                  backgroundColor: '#eee', // Your desired background color
                },
              }}
            />
            <Stack.Screen name="SingleProduct" 
            component={SingleProductScreen}
            options={{
              headerTitle: 'Chi tiết sản phẩm',
              headerTitleStyle: {
                fontSize: 20,
                fontWeight: 'bold',
                color: '#333', // Your desired text color
              }}}/>
            <Stack.Screen
              name="CartScreen"
              component={CartScreen}
              options={{ headerTitle: 'Giỏ hàng' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
