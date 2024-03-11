// screens/FavoriteScreen.tsx
import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {toggleFavorite} from '../redux/usersSlice';
import UserListItem from '../components/UserListItem';
// import {addToFavorites, removeFromFavorites} from '../redux/FavouriteUserSlice';

const FavoriteScreen = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.users.favorites);
  useEffect(() => {
    console.log(favorites, 'adataarrat');
  }, []);

  return (
    <View>
      <FlatList
        data={favorites}
        keyExtractor={item => item.login.uuid}
        renderItem={({item}) => (
          <UserListItem
            user={item}
            onToggleFavorite={() => dispatch(toggleFavorite(item))}
            isComingFromFavourite
          />
        )}
      />
    </View>
  );
};

export default FavoriteScreen;
