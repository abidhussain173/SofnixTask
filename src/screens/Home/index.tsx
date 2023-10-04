import { StyleSheet, Text, View, FlatList, Pressable, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProductList from '../../components/ProductList'
import { Product } from './types'

const HomeScreen = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get("http://3.223.25.80:8080/rentole-api/api/Product/GetProductIds")
            .then((response) =>
                setProducts(response.data)
            )
            .catch((error) => console.log(error))
    }, []);
   

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.productId.toString()}
                renderItem={({ item }) => <ProductList data={item} />}
            />
        </SafeAreaView>
    )
}


export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        paddingVertical: 20,
        borderBottomWidth: 5,
        borderBottomColor: 'black'
    },
    cardView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnsView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal: 5
    },
    cardText: {
        color: '#000000',
        fontSize: 14
    },
    timer: {
        alignSelf: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
        color: 'black'
    },
    btnText: {
        color: 'black'
    }
})