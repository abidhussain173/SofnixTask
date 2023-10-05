import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { styles } from './styles';

import ProductList from '../../components/ProductList';
import { Product } from './types';

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


  if (loading){
    return(
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (error){
    return(
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }

  if (products.length === 0){
    return(
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products found.</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
        <FlatList
          data={products}
          keyExtractor={item => item.productId.toString()}
          renderItem={({item}) => <ProductList data={item} />}
        />
    </SafeAreaView>
  );
};
export default HomeScreen;
