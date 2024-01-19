import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Header() {
  const [currentImage, setCurrentImage] = useState(1);
  const imageList = [1, 2, 3]; // Add more image numbers as needed
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Display the next image in the list
      setCurrentImage(imageList[imageIndex]);

      // Move to the next image in the list
      setImageIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }, 3500);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [currentImage, imageIndex, imageList]);

  return (
    <View style={styles.header}>
      <StatusBar style="auto" />

      <View style={styles.logoContainer}>
        {currentImage === 1 && (
          <Image style={styles.logo} source={require('../Image/background1.png')} />
        )}
        {currentImage === 2 && (
          <Image style={styles.logo} source={require('../Image/background2.png')} />
        )}
        {currentImage === 3 && (
          <Image style={styles.logo} source={require('../Image/background.png')} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 219,
    width: '100%',
    resizeMode: 'contain',
  },
});
