// components/UserListItem.tsx
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Entypo';
// import Icon from 'react-native-vector-icons/FontAwesome';

const UserListItem = ({user, onToggleFavorite, isComingFromFavourite}: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardView}>
        <View style={styles.mainContentView}>
          <View style={styles.roundImageView}>
            <Image
              source={{uri: user.picture.medium}}
              style={styles.roundImageView}
            />
          </View>
          <View style={styles.textContentStyle}>
            <Text style={styles.nameFontStyling}>
              {user.name.first + ' ' + user.name.last}
            </Text>
            <View style={styles.locationsStyling}>
              <Icon name="location-pin" size={25} color="grey" />
              <Text style={styles.locationText}>
                {user.location.city + ', ' + user.location.country}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={onToggleFavorite}>
            <Icon
              name={isComingFromFavourite ? 'heart' : 'heart-outlined'}
              size={35}
              color={'red'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardView: {
    height: height * 0.14,
    width: width * 0.93,
    borderRadius: 4,
    backgroundColor: '#FFF',
    alignSelf: 'center',
    marginTop: 15,
    borderWidth: 0.24,
  },
  mainContentView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  roundImageView: {
    height: height * 0.12,
    width: height * 0.12,
    borderRadius: (height * 0.12) / 2,
    alignSelf: 'center',
    marginTop: 3,
  },
  textContentStyle: {
    flexDirection: 'column',
    maxWidth: width * 0.4,
  },
  nameFontStyling: {
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    color: '#000',
    marginLeft: 7,
  },
  locationsStyling: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    fontSize: 16,
    fontFamily: 'normal',
    fontWeight: '300',
  },
});
export default UserListItem;
