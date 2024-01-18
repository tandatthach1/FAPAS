import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Footer from '../Component/Footer'
import { ScrollView } from 'react-native-gesture-handler';

const AccountScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  const handleLogout = () => {
    // Thực hiện các bước đăng xuất ở đây (nếu cần)

    // Chuyển về trang Login
    navigation.navigate('Login');
  };
  const formatProductTitle = (title) => {
    const words = title.split(' ');
    const formattedTitle = words.reduce((result, word, index) => {
      const separator = (index + 1) % 4 === 0 && index + 1 !== words.length ? '\n' : ' ';
      return `${result}${word}${separator}`;
    }, '');
  
    return formattedTitle.trim();
  };

  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../Image/avatar.jpg')}
          style={styles.avatar}
        />
        <Text style={styles.username}>Tấn Đạt</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoText}>tandat@example.com</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Điện thoại:</Text>
        <Text style={styles.infoText}>0389674416</Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
      </TouchableOpacity>

      {/* Phần Đơn hàng */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Đơn hàng của tôi</Text>

        <View style={styles.statusIcons}>
          <View style={styles.statusItem}>
            <Image source={require('../Image/payment-day.png')} style={styles.statusIcon} />
            <Text style={styles.statusText}>Chờ thanh toán</Text>
          </View>
          <View style={styles.statusItem}>
            <Image source={require('../Image/finance.png')} style={styles.statusIcon} />
            <Text style={styles.statusText}>Đang xử lý</Text>
          </View>
          <View style={styles.statusItem}>
            <Image source={require('../Image/food-delivery.png')} style={styles.statusIcon} />
            <Text style={styles.statusText}>Đang vận chuyển</Text>
          </View>
          <View style={styles.statusItem}>
            <Image source={require('../Image/shipped.png')} style={styles.statusIcon} />
            <Text style={styles.statusText}>Đã giao</Text>
          </View>
          <View style={styles.statusItem}>
            <Image source={require('../Image/return.png')} style={styles.statusIcon} />
            <Text style={styles.statusText}>Đổi trả</Text>
          </View>
        </View>
      </View>

  

      {/* Phần Khuyến mãi */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Khuyến mãi</Text>
        <View style={styles.promotionItem}>
          <Text style={styles.promotionItemText}>Mã giảm giá: SALE10 - Giảm 10% cho đơn hàng trên 500,000đ</Text>
        </View>
      </View>

      {/* Phần Sản phẩm bán chạy */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sản phẩm bán chạy</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('SingleProduct', { product: item })}
            >
              <View style={styles.productItem}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productTitle}>{formatProductTitle(item.title)}</Text>
                <Text style={styles.productRating}>{`Rating: ${item.rating.rate} (${item.rating.count} reviews)`}</Text>
                <Text style={styles.productPrice}>{`Giá: $${item.price.toFixed(2)}`}</Text>
              </View>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 10 }}
        />

      </View>
      <Footer />
    </View>

  );

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    flex: 1,
    fontWeight: 'bold',
  },
  infoText: {
    flex: 2,
  },
  logoutButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statusItem: {
    alignItems: 'center',
  },
  statusIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  statusText: {
    fontSize: 12,
  },
  addressItem: {
    marginBottom: 8,
  },
  addressItemText: {
    fontSize: 16,
  },
  promotionItem: {
    marginBottom: 8,
  },
  promotionItemText: {
    fontSize: 16,
  },
  productItem: {
    flexDirection: 'column',
    alignItems: 'center',  // Center items horizontally
    justifyContent: 'center',  // Center items vertically
    marginRight: 10, // Adjusted the margin to reduce space between items
    borderWidth: 1, // Added border width
    borderColor: '#ddd', // Added border color
    borderRadius: 8, // Added border radius for rounded corners
    padding: 8, // Added padding for spacing within the item
  },
  productImage: {
    width: 70,
    height: 85,
    borderRadius: 8,
    marginBottom: 8, // Added marginBottom to provide space between image and text
  },
  productTitle: {
    marginTop: 0,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    flexWrap: 'wrap',
    lineHeight: 12,
    height: 48, // Set a fixed height (4 lines at 12px line height)
    overflow: 'hidden', // Hide the overflow content
  },
  productPrice: {
    marginTop: 0,
    fontSize: 14,
    color: '#888',
  },
  productRating: {
    marginTop: 0,
    fontSize: 12,
    color: '#555',
  },
});

export default AccountScreen;
