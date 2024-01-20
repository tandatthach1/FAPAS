import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  KeyboardAvoidingView, ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function Register({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('https://65abda2efcd1c9dcffc724c2.mockapi.io/fapas/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert('Đăng ký thành công');
        navigation.navigate('Login');
      } else {
        alert('Đăng ký thất bại, vui lòng thử lại sau');
      }
    } catch (error) {
      console.error('Error during registration:', error);
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
          <Text style={styles.title}>ĐĂNG KÝ</Text>
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

            <View style={styles.iconinput}>
              <Icon style={styles.icon} name="lock" size={25} color="black" />
              <TextInput
                style={styles.input}
                placeholderTextColor={"#000033"}
                placeholder="Nhập lại mật khẩu"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
          </View>

          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{ textAlign: 'center', color: '#191970', fontSize: 16 }}>
                Bằng cách nhấn Đăng Ký Ngay, bạn đồng ý với{'\n'}Điều Khoản Dịch Vụ và Chính Sách Bảo Mật
              </Text>
            </TouchableOpacity>
          </View>

          {/* Update the onPress handler here */}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>

          <StatusBar style="auto" />
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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

export default Register;
