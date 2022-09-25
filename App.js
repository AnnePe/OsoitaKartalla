import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, TextInput,View,Button,Alert,Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  
  const [osoite, setOsoite] = useState('Rautatieläisenkatu 6, Helsinki');
  const [tulos, setTulos] = useState([]);
  const [teksti, setTeksti] = useState('');
  const [la, setLa] = useState(10);
  const [ln, setLn] = useState(10);
  const apikey ="PQA4d7L6YFhNGW4TeeTm8lzlAvVBqn5D";
 
  const getSijainti = async () => {
   
  try{
    const response = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${apikey}&location=${osoite}`);
 //  const response = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=PQA4d7L6YFhNGW4TeeTm8lzlAvVBqn5D&location=Koirasaarentie37,Finland`);
    const data = await response.json();
  
    setTulos(data);
    console.log(data);
    console.log(data.results[0].locations[0].displayLatLng.lat);
    console.log(data.results[0].locations[0].displayLatLng.lng);
    setLa(data.results[0].locations[0].displayLatLng.lat);
    setLn(data.results[0].locations[0].displayLatLng.lng);
         
  }catch(error){ 
    console.log('error', error);
    };    
  }
  
   useEffect(() => {
    getSijainti();
  
    },
    []);

  // Mapview example

   const initial = {       //renderöidään vain käynnistyksessä, ei voi käyttää dynamic niin
    latitude: Number(la),     //initialRegion={initial}
    longitude: Number(ln),
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0321
  };

  const coordinates = {
    latitude: Number(la),
    longitude: Number(ln)
  };
  
 
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={initial}
      >
        <Marker
          coordinate={coordinates}
          title={osoite}
        />
      </MapView>
          
      <TextInput style={{fontSize: 18, width: 200}} placeholder='Anna osoite' 
        onChangeText={osoite => setOsoite(osoite)} />
      <Button title="Show" onPress={getSijainti} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});
