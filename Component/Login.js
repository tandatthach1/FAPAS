import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity,
  KeyboardAvoidingView, ImageBackground, Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://65abda2efcd1c9dcffc724c2.mockapi.io/fapas/product');
      const data = await response.json();

      // Assuming your API returns an array of user objects with 'username' and 'password' fields
      const user = data.find(user => user.username === username && user.password === password);

      if (user) {
        // Successful login
        alert('Đăng nhập thành công');
        navigation.navigate('HomeScreen');
      } else {
        // Invalid credentials
        alert('Đăng nhập thất bại, vui lòng kiểm tra lại tên đăng nhập và mật khẩu');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };


  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}
    >
      <View>
        <ImageBackground style={styles.background}>
          <Text style={styles.title}>ĐĂNG NHẬP</Text>
          <View style={{ marginTop: 40 }}>
            <View style={styles.iconinput}>
              <Icon style={styles.icon} name="user" size={25} color="black" />
              <TextInput
                style={styles.input}
                placeholderTextColor={"#000033"}
                placeholder="Nhập tên đăng nhập hoặc email"
                onChangeText={(text) => setUsername(text)}
              />
            </View>
  
            <View style={styles.iconinput}>
              <Icon style={styles.icon} name="lock" size={25} color="black" />
              <TextInput
                style={styles.input}
                placeholderTextColor={"#000033"}
                placeholder="Nhập mật khẩu"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <Text style={{ alignSelf: 'flex-end', fontSize: 16 }}>Quên mật khẩu?</Text>
  
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
          
          <View style={styles.rowContainer}>
            <Text style={{ alignSelf: 'flex-end', fontSize: 16 }}>Bạn chưa có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{ textAlign: 'center', color: '#191970', fontSize: 16 }}> Đăng kí</Text>
            </TouchableOpacity>
          </View>
       <View style={styles.socialContainer}>
      <TouchableOpacity style={styles.socialButton}>
        <Image
          source={require('../Image/facebook.png')}
          resizeMode="contain"
          style={styles.socialIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Image
          source={require('../Image/google.png')}
          resizeMode="contain"
          style={styles.socialIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Image
          source={require('../Image/apple-logo.png')}
          resizeMode="contain"
          style={styles.socialIcon}
        />
      </TouchableOpacity>
    </View>
          <StatusBar style="auto" />
        </ImageBackground>
      </View>
  
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  socialContainer: {
    flexDirection: 'row', // Updated to 'row' for horizontal alignment
    justifyContent: 'center',
    marginTop: 20, // Adjust the marginTop as needed
  },
  
  socialButton: {
    width: 40, // Adjust the width as needed
    height: 40, // Adjust the height as needed
    borderRadius: 20,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  
  socialIcon: {
    width: 30, // Adjust the width as needed
    height: 30, // Adjust the height as needed
  },
 
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30, // Increased margin
  },
  iconinput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'black',
    borderBottomWidth: 0.7, // Increased borderBottomWidth
    marginBottom: 10, // Increased margin
  },
  title: {
    fontSize: 30, // Increased fontSize
    fontWeight: 'bold',
    marginBottom: -20, // Increased margin
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookButton: {
    backgroundColor: '#4267B2', // Màu của Facebook
    paddingVertical: 20, // Vertical padding
    paddingHorizontal: 25, // Horizontal padding
    marginTop: 20, // Increased margin from the top
    height: 60, // Increased height
    marginBottom: -10, // Added margin at the bottom
  },
  input: {
    height: 50, // Increased height
    width: 300, // Increased width
    backgroundColor: 'white',
    paddingHorizontal: 10, // Increased paddingHorizontal
    fontSize: 16, // Increased fontSize
    marginTop:5
  },
  button: {
    backgroundColor: '#000033',
    paddingVertical: 20, // Vertical padding
    paddingHorizontal: 25, // Horizontal padding
    marginTop: 10, // Increased margin from the top
    height: 60, // Increased height
    marginBottom: -10, // Added margin at the bottom
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 15, // Increased fontSize
    textAlign: 'center',
    width:130,

  },
  background: {
    flex: 1,
    backgroundColor: 'white',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: 710, // Increased width
  },
  icon:{
    paddingTop:15

  }
});


export default Login;
