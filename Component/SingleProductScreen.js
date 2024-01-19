import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartContext } from './CartContent';


const SingleProductScreen = () => {
  const route = useRoute();
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { updateCartItemCount } = useContext(CartContext);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const cartItemsData = await AsyncStorage.getItem('cartItems');
        const existingCartItems = cartItemsData ? JSON.parse(cartItemsData) : [];
        console.log('Existing Cart Items:', existingCartItems);
      } catch (error) {
        console.log('Error loading cart items:', error);
      }
    };

    loadCartItems();
  }, []);

  const handleBuyNow = async () => {
    try {
      const cartItemsData = await AsyncStorage.getItem('cartItems');
      const existingCartItems = cartItemsData ? JSON.parse(cartItemsData) : [];

      const existingItemIndex = existingCartItems.findIndex((item) => item.id === product.id);

      if (existingItemIndex !== -1) {
        // Sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng
        existingCartItems[existingItemIndex].quantity += parseInt(quantity);
      } else {
        // Sản phẩm chưa tồn tại trong giỏ hàng, thêm mới
        existingCartItems.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: parseInt(quantity),
        });
      }

      await AsyncStorage.setItem('cartItems', JSON.stringify(existingCartItems));

      const updatedCartItemCount = existingCartItems.reduce((total, item) => total + item.quantity, 0); // Tính tổng số lượng sản phẩm
      updateCartItemCount(updatedCartItemCount); // Cập nhật số lượng sản phẩm trong giỏ hàng trong context

      console.log('Mua hàng:', product.title, 'Số lượng:', quantity);

      // Show an alert for successful addition to the cart
      Alert.alert(
        'Thông báo',
        `Bạn đã thêm sản phẩm: ${product.title}, Số lượng: ${quantity}.`
      );
    } catch (error) {
      console.log('Error saving cart items:', error);
    }
  };

  const handleBuyNowLeft = async () => {
    // Implement the logic for "Mua Ngay" button
    console.log('Mua Ngay:', product.title, 'Số lượng:', quantity);

    // Show an alert
    Alert.alert('Thông báo', `Bạn đã mua sản phẩm: ${product.title}, Số lượng: ${quantity}.`);
  };

  const handleQuantityChange = (text) => {
    // Kiểm tra nếu người dùng chỉ nhập số
    if (/^\d+$/.test(text) || text === '') {
      setQuantity(text);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <View style={styles.imageContainer}>
            <Image source={{ uri: product.image }} style={styles.image} />
          </View>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>Giá: ${product.price.toFixed(2)} </Text>
          <Text style={styles.description}>Mô tả sản phẩm: {product.description}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>Đánh giá: </Text>
            {Array.from({ length: Math.floor(product.rating.rate) }).map((_, index) => (
              <Text key={index} style={styles.starIcon}>
                ⭐
              </Text>
            ))}
            <Text style={styles.ratingValue}>{product.rating.rate.toFixed(1)}</Text>
            <Text style={styles.ratingCount}>({product.rating.count} reviews)</Text>
          </View>
        </View>
        <View style={styles.buyContainer}>
  
  <View style={styles.quantityContainer}>
    <TextInput
      style={styles.quantity}
      placeholder="Qty"
      keyboardType="numeric"
      value={quantity.toString()}
      onChangeText={handleQuantityChange}
    />
  </View>
  <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNowLeft}>
    <Text style={styles.buyButtonText}>Mua Ngay</Text>
  </TouchableOpacity>
  {/* Buy Button */}
  <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
    <Text style={styles.buyButtonText}>Thêm vào giỏ hàng</Text>
  </TouchableOpacity>
</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    backgroundColor: '#f5f5f5', // Tiki's background color
  },

  imageContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    width: '100%',
    height: 300,
    backgroundColor: '#fff', // Adjust background color if necessary
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Adjust the image resizeMode
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Tiki's text color
  },

  price: {
    fontSize: 24,
    color: 'red', // Consider using Tiki's brand color
    marginBottom: 12,
  },

  description: {
    fontSize: 18,
    marginBottom: 12,
    color: '#666', // Adjust text color to match Tiki's app
  },

  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  ratingText: {
    fontSize: 18,
    marginRight: 4,
  },

  starIcon: {
    fontSize: 16,
  },

  ratingValue: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 2,
    marginLeft: 2,
  },

  ratingCount: {
    marginLeft: 4,
  },

  buyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },

  quantityContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    marginLeft: 8,
    width: 60,
    backgroundColor: '#fff', // Adjust background color if necessary
  },

  quantity: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },

  buyNowButton: {
    backgroundColor: '#42b549', // Tiki's green color
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25, // Adjust the border radius for a rounded button
    marginRight: 8,
    width: 150,
  },

  buyButton: {
    backgroundColor: '#00b0ff', // Tiki's blue color
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: 198,
  },

  buyButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default SingleProductScreen;
