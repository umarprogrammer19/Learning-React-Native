import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons'; 
import { Link } from 'expo-router';

interface AllPlaces {
  fsq_id: string;
  name: string;
}

interface SinglePlace {
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [location, setLocation] = useState<any>(null); 
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [search, setSearch] = useState<any>('');
  const [places, setPlaces] = useState<null | AllPlaces[]>(null); 
  const [singlesearchPlace, setsinglesearchPlace] = useState<null | SinglePlace>(null); 
  const [region, setRegion] = useState<any>(null); 
  const [direction, setDirection] = useState<boolean>(false); 

  
  const singlePlace = (item: any) => {
    setsinglesearchPlace({
      latitude: item.geocodes.main.latitude,
      longitude: item.geocodes.main.longitude,
    });

   
    setRegion({
      latitude: item.geocodes.main.latitude,
      longitude: item.geocodes.main.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });

  
    setPlaces(null);
  };

 
  const searchPlaces = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3qbL9ORBTq2ZaS6TUHxpAQZNDJjTlkT2lBeAynwmhZ8I=',
      },
    };

    fetch(
      `https://api.foursquare.com/v3/places/search?query=${search}&ll=${location.coords.latitude}%2C${location.coords.longitude}&radius=100000`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setPlaces(res.results); 
      })
      .catch((err) => console.error(err));
  };


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Get current location
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        {location ? (
          <MapView
            style={styles.map}
            region={region} 
            onRegionChangeComplete={setRegion}
          >
            
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="You are here"
            />

           
            {singlesearchPlace && (
              <Marker
                coordinate={{
                  latitude: singlesearchPlace.latitude,
                  longitude: singlesearchPlace.longitude,
                }}
                title="Searched Place"
              />
            )}

          
            {singlesearchPlace && direction && (
              <Polyline
                coordinates={[
                  { latitude: location.coords.latitude, longitude: location.coords.longitude },
                  { latitude: singlesearchPlace.latitude, longitude: singlesearchPlace.longitude },
                ]}
                strokeWidth={5}
                strokeColor="#000000"
              />
            )}
          </MapView>
        ) : (
          <Text style={styles.paragraph}>Loading map...</Text>
        )}
      </View>

      <View style={styles.bottom}>
        
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'nowrap', height: 70 }}>
          <MaterialIcons name="directions-bike" size={40} color="white" style={{ marginHorizontal: 30 }} />
          <MaterialCommunityIcons name="rickshaw" size={40} color="white" style={{ marginHorizontal: 30 }} />
          <Ionicons name="car-sport-sharp" size={40} color="white" style={{ marginHorizontal: 30 }} />
        </View>

        
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setSearch}
            value={search}
            placeholder="Search Place"
            placeholderTextColor="white"
          />
          <TouchableOpacity style={styles.button} onPress={searchPlaces}>
            <Text>Search</Text>
          </TouchableOpacity>
        </View>

    
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity style={styles.button} onPress={searchPlaces}>
            <Text>Search</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => setDirection(!direction)} style={styles.button3}>
            <Text>
              <Entypo name="direction" size={24} color="black" />
            </Text>
          </TouchableOpacity>
        </View>

      
        {places && (
          <FlatList
            data={places}
            renderItem={({ item }: { item: { name: string } }) => (
              <View style={styles.list}>
                <Text onPress={() => singlePlace(item)}>{item.name}</Text>
              </View>
            )}
            keyExtractor={(item: { fsq_id: string }) => item.fsq_id}
          />
        )}

        <TouchableOpacity style={styles.button1} onPress={searchPlaces}>
          <Text><Link href='./Driver'>Find A Driver</Link></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    backgroundColor: '#3f3f3f',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  input: {
    height: 40,
    margin: 10,
    width: 230, 
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
    borderRadius: 10,
    color: 'white',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 80,
    marginLeft: 10,
  },
  button1: {
    margin: 3,
    alignItems: 'center',
    backgroundColor: '#c1f11d',
    padding: 10,
    width: 200,
  },
  button3: {
    alignItems: 'center',
    backgroundColor: '#c1f11d',
    padding:7,
    width: 40,
    marginLeft: 10,
  },
  list: {
    marginTop: 7,
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 3,
    width: 280,
  },
  searchContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    // marginTop: 10, 
  },
  buttonContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    // marginTop: 3,
  },
});
