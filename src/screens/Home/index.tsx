import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import { ExStyles } from './styles';

import ProductList from '../../components/ProductList';
import {Product} from './types';

const HomeScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('http://3.223.25.80:8080/rentole-api/api/Product/GetProductIds')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={ExStyles.container}>
      {loading ? (
        <View style={ExStyles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : error ? (
        <View style={ExStyles.errorContainer}>
          <Text style={ExStyles.errorText}>{error}</Text>
        </View>
      ) : products.length === 0 ? (
        <View style={ExStyles.emptyContainer}>
          <Text style={ExStyles.emptyText}>No products found.</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.productId.toString()}
          renderItem={({item}) => <ProductList data={item} />}
        />
      )}
    </SafeAreaView>
  );
};
export default HomeScreen;
