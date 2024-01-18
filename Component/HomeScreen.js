import React from 'react';
import { View, ScrollView } from 'react-native';
import ListProduct from './ListProduct';
import Footer from './Footer';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <ListProduct />
      </ScrollView>
      <Footer />
    </View>
  );
}