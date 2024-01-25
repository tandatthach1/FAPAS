import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartContext } from './CartContent';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';

export default function ListProduct() {
  const navigation = useNavigation();

  const CartScreen = () => {
    navigation.navigate('CartScreen');
  };

  const Login = () => {
    navigation.navigate('Login');
  };

  const { cartItemCount, updateCartItemCount } = useContext(CartContext);

  const [searchText, setSearchText] = useState('');
  const [showClearButton, setShowClearButton] = useState(false);
  const [minSearchLength, setMinSearchLength] = useState(1);
  const [noResults, setNoResults] = useState(false);

  const handleProductPress = (product) => {
    navigation.navigate('SingleProduct', { product });
  };

  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  useEffect(() => {
    getAllProduct();
  }, []);

  const handleSearch = (searchText) => {
    const filteredProducts = originalProducts.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setProducts(filteredProducts);
    setNoResults(filteredProducts.length === 0);
  };

  const fetchAllProducts = () => {
    resetProducts();
  };

  const resetProducts = () => {
    fetch('https://65abda2efcd1c9dcffc724c2.mockapi.io/fapas/product')
      .then(res => res.json())
      .then(json => setProducts(json));
  };

  const clearSearch = () => {
    setSearchText('');
    // Fetch all products when search text is cleared
    fetchAllProducts();
  };
  const setSearchTextAndSearch = (text) => {
    setSearchText(text);
    if (text.length >= minSearchLength) {
      handleSearch(text);
    } else {
      // Fetch all products when search text is empty
      fetchAllProducts();
    }
  };

  const getAllProduct = () => {
    axios.get('https://fakestoreapi.com/products')
    .then(function (response) {
      const data = response.data;
      setProducts(data);
      setOriginalProducts(data);
    })
    .catch(function (error) {
      console.error('Error fetching product data:', error);
      alert('Error fetching product data');
    });
  };
  const getCategoryProducts = async (categories) => {
    try {
      const requests = categories.map((category) =>
        axios.get(`https://fakestoreapi.com/products/category/${category}`)
      );
      const responses = await Promise.all(requests);
      const mergedProducts = responses.flatMap((response) => response.data);
      setProducts(mergedProducts);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginLeft:30,marginRight:-50 }}>
          
        <TextInput
  placeholder="Bạn cần tìm gì?"
  value={searchText}
  onChangeText={(text) => {
    setSearchTextAndSearch(text);
    setShowClearButton(!!text);
  }}
  style={{
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  }}
/>
{showClearButton && (
  <TouchableOpacity onPress={clearSearch}>
    <FontAwesome name="times-circle" size={20} color="gray" />
  </TouchableOpacity>
)}
        
        </View>
        

        <View style={styles.cart}>
          <TouchableOpacity style={styles.cartContainer} onPress={Login}>
            <Image source={require('../Image/login.png')}
             style={{ width: 40, height: 30, marginRight: 25, marginTop: 3 }}/>
          </TouchableOpacity>
          <View style={styles.cartContainer}>
              <Text style={styles.cartTitleText}>Đăng nhập</Text>
            </View>
        </View>
      </View>
      <View>
            
      {/* Gọi trang header */}
           <Header></Header>
      </View>
      <View>
        <View style={styles.catetitle}>
          <Text style={{ fontSize: 20, color: 'red', fontWeight: '600' }}>Danh mục</Text>
          <Text style={{ fontSize: 13, color: 'blue', fontWeight: '600' }}>Xem thêm</Text>
        </View>

        <SafeAreaView style={styles.contain}>
          <View style={styles.categoryContainer}>
            <TouchableOpacity style={styles.categoryItem} onPress={getAllProduct}>
              <Image
                style={{ width: 30, height: 30, marginLeft: 10, marginTop: 3 }}
                source={require('../Image/danhmuc/all.png')}
              />
              <Text style={{ fontSize: 15, marginTop: 5, marginLeft: 10 }}>Tất cả</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoryItem}
              onPress={() => getCategoryProducts(["men's clothing"])}
            >
              <Image style={styles.catepic} source={require('../Image/danhmuc/ao.png')} />
              <Text style={styles.categoryTitle}>Áo Nam</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoryItem}
              onPress={() => getCategoryProducts(["women's clothing"])}
            >
              <Image style={styles.catepic} source={require('../Image/danhmuc/ao.png')} />
              <Text style={styles.categoryTitle}>Áo Nữ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoryItem}
              onPress={() => getCategoryProducts(["electronics", "jewelery"])}
            >
              <Image style={styles.catepic} source={require('../Image/danhmuc/phukien.png')} />
              <Text style={styles.categoryTitle}>Phụ kiện</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <View style={styles.catetitle}>
          <Text style={{ fontSize: 20, color: 'red', fontWeight: '600' }}>Tất cả sản phẩm</Text>
          <Text style={{ fontSize: 13, color: 'blue', fontWeight: '600' }}>Xem thêm</Text>
        </View>

        <ScrollView>
          {noResults ? (
            <Text style={styles.noResultsText}>Không tìm thấy kết quả nào</Text>
          ) : (
            <View style={styles.container}>
              {products.map((product) => (
                <TouchableOpacity
                  style={styles.item}
                  key={product.id}
                  onPress={() => handleProductPress(product)}
                >
                  <View>
                    <Image style={styles.img} source={{ uri: product.image }} />
                  </View>
                  <View style={styles.des}>
                    <Text style={styles.des_text}>{product.title}</Text>
                    <Text style={styles.price}>Price: ${product.price ? product.price.toFixed(2) : 'N/A'}</Text>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.ratingText}>Rating: </Text>
                      <FontAwesome name="star" style={styles.starIcon} />
                      <Text style={styles.ratingValue}>{product.rating && product.rating.rate ? product.rating.rate.toFixed(1) : 'N/A'}</Text>
                      <Text style={styles.ratingCount}>({product.rating && product.rating.count ? product.rating.count : 'N/A'} reviews)</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    width: '100%',
    paddingRight: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },

  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3', // Light gray background color
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 25,
    paddingHorizontal: 15,
    width: '80%',
    elevation: 2,
  },

  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#333', // Dark text color
  },

  searchButton: {
    padding: 10,
  },

  

  cart: {
    alignItems: 'center',
    marginRight: 15,
    marginTop: 6,
  },

  cartContainer: {
    alignItems: 'center',
    marginLeft: -10,
  },

  cartTitleText: {
    marginRight: 20,
    fontSize: 12,
    color: '#333', // Tiki's text color
  },

  searchResultsContainer: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 5,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 1,
  },

  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CC3333',
  },

  searchResultItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    position: 'relative', // Ensure relative position for zIndex to take effect
  },

  item: {
    width: '48%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },

  catepic: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },

  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  categoryItem: {
    alignItems: 'center',
  },

  catetitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
  },

  img: {
    width: '100%',
    height: 170,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  des: {
    padding: 8,
  },

  des_text: {
    color: '#333', // Tiki's text color
    textAlign: 'center',
    marginBottom: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },

  price: {
    color: 'red', // Tiki's price color
    textAlign: 'center',
    marginBottom: 4,
    fontSize: 14,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  ratingText: {
    color: '#333', // Tiki's text color
  },

  starIcon: {
    color: 'gold',
    fontSize: 16,
    marginRight: 2,
  },

  ratingValue: {
    color: '#333', // Tiki's text color
    marginRight: 2,
  },

  ratingCount: {
    color: '#333', // Tiki's text color
  },
});