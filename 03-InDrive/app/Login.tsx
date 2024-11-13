import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Use this import
import React from 'react';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './Config/Firebaseconfig';
import { useRouter } from 'expo-router';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();


  const Login = () => {
    console.log(email);
    console.log(password);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.push('/Page/Home')
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });


    setEmail('')
    setPassword('')
  }

  return (
    <SafeAreaView className="flex-1 bg-[#3f3f3f]">
      <Text className="text-[#c1f11d] text-center mt-10 text-3xl font-semibold ">Login</Text>
      <View className='p-3 mt-7'>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder='Enter your mail'
            placeholderTextColor="#FFFFFF"
            className='border border-[#c1f11d] lowercase'
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder='Enter your password'
            placeholderTextColor="#FFFFFF"
            className='border border-[#c1f11d]'
          />
          <TouchableOpacity onPress={Login} style={styles.button}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView >
  );
};

export default Login;



const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'white',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#c1f11d',
    padding: 10,
    margin: 20,
  },
});