import React, {memo, useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {ProductListProps} from './types';
import { ExStyles } from './styles';

const ProductList: React.FC<ProductListProps> = ({data}) => {
  const [totalSeconds, setTotalSeconds] = useState<number>(data.timeInSeconds);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [counterCompleted, setCounterCompleted] = useState<boolean>(false);
  const [productPrice, setProductPrice] = useState<number | null>(null);
  const [productName, setProductName] = useState<string | null>(null);
  const timer = useRef<any | null>(null);

  useEffect(() => {
    if (isActive && totalSeconds > 0) {
      timer.current = setInterval(() => {
        setTotalSeconds(prev => prev - 1);
      }, 1000);
    } else {
      clearInterval(timer.current!);
      if (totalSeconds === 0) {
        setCounterCompleted(true);
      }
    }

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [isActive, totalSeconds]);

  useEffect(() => {
    if (counterCompleted) {
      fetch(
        `http://3.223.25.80:8080/TestAPI/api/Product/GetProductDetailById?ProductId=${data.productId}`,
      )
        .then(response => response.json())
        .then(data => {
          setProductPrice(data.price);
          console.log(data);
          setProductName(data.productName);
        })
        .catch(error => {
          console.error('Error fetching product details:', error);
        });
    }
  }, [counterCompleted, data.productId]);

  const formatTime = (totalSeconds: number): string => {
    let hours: string | number = Math.floor(totalSeconds / 3600);
    let minutes: string | number = Math.floor((totalSeconds % 3600) / 60);
    let remainingSeconds: string | number = totalSeconds % 60;

    hours = hours < 10 ? '0' + hours : hours.toString();
    minutes = minutes < 10 ? '0' + minutes : minutes.toString();
    remainingSeconds =
      remainingSeconds < 10
        ? '0' + remainingSeconds
        : remainingSeconds.toString();

    return hours + ':' + minutes + ':' + remainingSeconds;
  };

  const handlePauseResume = (): void => {
    setIsActive(!isActive);
  };

  const handleReset = (): void => {
    setIsActive(false);
    setTotalSeconds(data.timeInSeconds);
    setCounterCompleted(false);
    setProductPrice(null);
    setProductName(null);
  };

  return (
    <View style={ExStyles.card}>
      <View style={ExStyles.cardView}>
        <View>
          <Text style={ExStyles.cardText}>ProductID: {data.productId}</Text>
        </View>
        <View>
          {counterCompleted ? (
            <View style={ExStyles.priceView}>
              <Text style={ExStyles.priceText}>
                Price: {productName !== null ? `${productName}` : 'Loading...'}
              </Text>
              <Text style={ExStyles.priceText}>
                Price:{' '}
                {productPrice !== null
                  ? `${productPrice.toFixed(2)}`
                  : 'Loading...'}
              </Text>
            </View>
          ) : (
            <>
              <View style={ExStyles.timerView}>
                <Text style={ExStyles.timer}>{formatTime(totalSeconds)}</Text>
                <View style={ExStyles.btnsView}>
                  <Pressable onPress={handlePauseResume} style={ExStyles.btn}>
                    <Text style={ExStyles.btnText}>
                      {isActive ? 'PAUSE' : 'RESUME'}
                    </Text>
                  </Pressable>
                  <Pressable onPress={handleReset} style={ExStyles.btn}>
                    <Text style={ExStyles.btnText}>RESET</Text>
                  </Pressable>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default memo(ProductList);


