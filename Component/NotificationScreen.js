// NotificationScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Footer from './Footer';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from an API or use mock data
    const mockNotifications = [
      { id: '1', title: 'Khuyến mãi', message: 'ĐÓN XUÂN XUM VẦY - SẮM TẾT ĐONG ĐẦY' },
      { id: '2', title: 'Live & Video', message: 'XEM LIVE NGAY NÀO!' },
      // Add more mock notifications as needed
    ];

    setNotifications(mockNotifications);
  }, []);

  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {notifications.length === 0 ? (
        <Text style={styles.noNotificationsText}>No notifications available.</Text>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <Footer />

    </View>
  );

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  notificationItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  notificationMessage: {
    fontSize: 16,
  },
  noNotificationsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default NotificationScreen;
