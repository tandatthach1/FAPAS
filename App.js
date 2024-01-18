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
import AccountScreen from './Component/AccountScreen'; // Fix: import AccountScreen
const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <NavigationContainer>

          <Stack.Navigator initialRouteName="HomeScreen">
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
              component={AccountScreen} // Fix: use AccountScreen instead of Account
              options={{ headerTitle: 'Tài khoản' }}
            
            />
         <Stack.Screen
  name="HomeScreen"
  component={HomeScreen}
  options={{
    headerTitle: 'FAPAS STORE',
    headerTitleStyle: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#808080', // Text color
      textShadowColor: 'black',
      textShadowOffset: { width: -2, height: 2 },
      textShadowRadius: 1,
      marginLeft: '35%',
      marginTop: 0,
    },
    headerStyle: {
      backgroundColor: '#EEEEEE', // Light gray background color
    },
  }}
/>

            <Stack.Screen name="SingleProduct" component={SingleProductScreen} />
            <Stack.Screen
              name="CartScreen"
              component={CartScreen}
              options={{ headerTitle: 'Giỏ hàng' }}
            />
          </Stack.Navigator>
          <Stack.Screen
             name="AccountScreen"
             component={AccountScreen}
             options={{ headerTitle: 'Tài khoản' }}
          />
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
