import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
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