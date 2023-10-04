import { StyleSheet, Text, View, FlatList,Pressable } from 'react-native'
import React, {useState,useEffect, useRef} from 'react'
import axios from 'axios'

const ProductListingScreen = () => {
    const [products,setProducts] = useState([])
    const [totalSeconds, setTotalSeconds] = useState(6);
    const [isActive, setIsActive] = useState(true);
    const timer = useRef()
    useEffect(()=>{
      axios.get("http://3.223.25.80:8080/rentole-api/api/Product/GetProductIds")
      .then((response)=>
          setProducts(response.data)
        )
        .catch((error)=>console.log(error))
    },[]);
    const ProductCard = ({item}) =>{
        return(
            <View style={styles.card}>
               <View style={styles.cardView}>
                 <View>
                  <Text style={styles.cardText}>ProductID:{item.productId}</Text>
                </View>
                <View>
                <Text style={styles.timer}>{formatTime(totalSeconds)}</Text>
                 <View style={styles.btnsView}>
                   <Pressable 
                      onPress={()=>{
                        if(isActive)
                        clearInterval(timer.current)
                        setIsActive(!isActive)
                      }}
                     style={styles.btn}
                     >
                  <Text style={styles.btnText}>
                    {isActive ? 'PAUSE' : 'RESUME'}
                  </Text>
                </Pressable>
                <Pressable 
                  onPress={()=>{
                    setTotalSeconds()
                  }}
                  style={styles.btn}
                  >
                  <Text style={styles.btnText}>
                    RESET
                  </Text>
                </Pressable>
                 </View>
                </View>
               </View>
            </View>
        )
    }
    useEffect(()=>{
       if(isActive){
         timer.current = setInterval(()=>{
          setTotalSeconds(pre => pre - 1)
         },1000)
       }
       if (totalSeconds === 0) {
           clearInterval(timer.current);
            }
       return() => clearInterval(timer.current)
    },[isActive,totalSeconds])
 
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item)=> item.productId.toString()}
        renderItem={ProductCard}
      />
    </View>
  )
}
  const formatTime = totalSeconds => {
   let hours = Math.floor(totalSeconds / 3600);
   let minutes = Math.floor((totalSeconds % 3600) / 60);
   let remainingSeconds = totalSeconds % 60;
   hours = hours < 10 ? '0' + hours : hours
   minutes = minutes < 10 ? '0' + minutes : minutes
   remainingSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds
     return hours + ":" + minutes + ":" + remainingSeconds
        };

export default ProductListingScreen

const styles = StyleSheet.create({
    container:{        
        backgroundColor:'#f0f0f0',
        margin:10,
        borderWidth:5,
        borderColor:'black',
        borderRadius:10
    },
    card:{
      flex:1,
       backgroundColor:'#fff',
       padding:10,
       paddingVertical:20,
       borderBottomWidth:5,
       borderBottomColor:'black'
    },
    cardView:{
      flex:1,
      flexDirection:'row',
      justifyContent:'space-between'
    },
    btnsView:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    btn:{
      paddingHorizontal:5,
      borderWidth:1,
      borderColor:'black',
      marginHorizontal:5
    },
    cardText:{
        color:'#000000',
        fontSize:14
    },
    timer:{
      alignSelf:'center',
      marginBottom:10,
      fontWeight:'bold',
      color:'black'
    },
    btnText:{
      color:'black'
    }
})