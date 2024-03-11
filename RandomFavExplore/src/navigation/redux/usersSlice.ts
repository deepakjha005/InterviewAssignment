// redux/usersSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RandomUserApiResponse} from '../types/types';
interface Coordinates {
  latitude: string;
  longitude: string;
}

interface Timezone {
  offset: string;
  description: string;
}

interface Street {
  number: number;
  name: string;
}

interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: Coordinates;
  timezone: Timezone;
}

interface Name {
  title: string;
  first: string;
  last: string;
}

interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

interface Dob {
  date: string;
  age: number;
}

interface Registered {
  date: string;
  age: number;
}

interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

interface Id {
  name: string;
  value: string | null;
}
interface User {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: Dob;
  registered: Registered;
  phone: string;
  cell: string;
  id: Id;
  picture: Picture;
  nat: string;
}

interface UsersState {
  users: RandomUserApiResponse['results'];
  favorites: User[];
}

const initialState: UsersState = {
  users: [],
  favorites: [],
};
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<User>) => {
      const {users, favorites} = state;
      const indexInFavorites = favorites.findIndex(
        user => user.login.uuid === action.payload.login.uuid,
      );
      const indexInUsers = users.findIndex(
        user => user.login.uuid === action.payload.login.uuid,
      );

      if (indexInFavorites === -1) {
        // Add user to favorites
        state.favorites.push(action.payload);
        // Remove user from the main user list
        if (indexInUsers !== -1) {
          state.users.splice(indexInUsers, 1);
        }
      } else {
        // Remove user from favorites
        state.favorites.splice(indexInFavorites, 1);
        // Add user back to the main user list
        if (indexInUsers === -1) {
          state.users.push(action.payload);
        }
      }
    },
  },
});

export const {setUsers, toggleFavorite} = usersSlice.actions;
export default usersSlice.reducer;
