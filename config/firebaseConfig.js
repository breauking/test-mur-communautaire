import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB18u7xjNJlhtdCAdwiVsR2XkjM2zlyAjo',
  authDomain: 'thefisher-3ad16.firebaseapp.com',
  projectId: 'thefisher-3ad16',
  storageBucket: 'thefisher-3ad16.appspot.com',
  messagingSenderId: '385910867800',
  appId: 'thefisher-3ad16',
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };
