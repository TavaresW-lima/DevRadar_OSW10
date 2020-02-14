import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main({ navigation }){
    const [ currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition(){
            const { granted } = await requestPermissionsAsync();
            if (granted){
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const {latitude, longitude} = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        };
        loadInitialPosition(

        );
    },[])

    if(!currentRegion){
        return null;
    }

    return  (
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{latitude: -22.7409995,longitude: -43.3004858,}}>
                <Image style={styles.avatar} source={{ uri : 'https://avatars3.githubusercontent.com/u/47061441?s=460&v=4'}} />
                <Callout onPress={() => {
                    navigation.navigate('Profile',{ github_username:'TavaresW-lima'})
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>William Tavares</Text>
                        <Text style={styles.devBio}>Bio customizada placeholder pro callout do marker no mapa do DevRadar</Text>
                        <Text style={styles.devTechs}>HTML5, CSS3, Javascript</Text>

                    </View>

                </Callout>
            </Marker>
        </MapView>    
    );
}

const styles = StyleSheet.create({
    map:{
        flex:1
    },
    avatar:{
        height:54,
        width:54,
        borderRadius:4,
        borderWidth:4,
        borderColor:'#fff',
    },
    callout:{
        width:260,
    },
    devName:{
        fontWeight: 'bold',
        fontSize:16, 
    },
    devBio:{
        color:'#666',
        marginTop:5,
    },
    devTechs:{
        marginTop:5
    }
})

export default Main; 