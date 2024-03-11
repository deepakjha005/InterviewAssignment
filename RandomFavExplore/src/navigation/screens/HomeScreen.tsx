// screens/HomeScreen.tsx
import React, {useEffect, useState} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setUsers, toggleFavorite} from '../redux/usersSlice';
import UserListItem from '../components/UserListItem';
import {RandomUserApiResponse} from '../types/types';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.users.users);
  const [myUsersList, setMyUsersList] = useState<
    RandomUserApiResponse['results']
  >([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=10');
      const data = await response.json();
      // console.log(data, 'Data');
      // setMyUsersList(data.results);
      dispatch(setUsers(data.results));
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsRefreshing(false);
    }
  };
  const handleRefresh = () => {
    // Set refreshing to true when pull-to-refresh is triggered
    setIsRefreshing(true);
    // Fetch data when pull-to-refresh is triggered
    fetchUsers();
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={item => item.login.uuid}
        renderItem={({item}) => (
          <UserListItem
            user={item}
            onToggleFavorite={() => dispatch(toggleFavorite(item))}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

export default HomeScreen;
