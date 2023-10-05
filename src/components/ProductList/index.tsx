import React, {memo, useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {ProductListProps} from './types';

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
    <View style={styles.card}>
      <View style={styles.cardView}>
        <View>
          <Text style={styles.cardText}>ProductID: {data.productId}</Text>
        </View>
        <View>
          {counterCompleted ? (
            <View style={styles.priceView}>
              <Text style={styles.priceText}>
                Price: {productName !== null ? `${productName}` : 'Loading...'}
              </Text>
              <Text style={styles.priceText}>
                Price:{' '}
                {productPrice !== null
                  ? `${productPrice.toFixed(2)}`
                  : 'Loading...'}
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.timerView}>
                <Text style={styles.timer}>{formatTime(totalSeconds)}</Text>
                <View style={styles.btnsView}>
                  <Pressable onPress={handlePauseResume} style={styles.btn}>
                    <Text style={styles.btnText}>
                      {isActive ? 'PAUSE' : 'RESUME'}
                    </Text>
                  </Pressable>
                  <Pressable onPress={handleReset} style={styles.btn}>
                    <Text style={styles.btnText}>RESET</Text>
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

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingVertical: 10,
    borderBottomWidth: 5,
    borderBottomColor: 'black',
  },
  cardView: {
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  priceView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btnsView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 5,
  },
  cardText: {
    color: '#000000',
    fontSize: 14,
  },
  timerView: {
    flex: 1,
    alignSelf: 'flex-end',
  },
  timer: {
    alignSelf: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    marginTop: -15,
  },
  btnText: {
    color: 'black',
  },
  priceText: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    color: 'black',
  },
});
