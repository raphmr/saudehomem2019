import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Header from '../components/Header';
import catolicaLogo from '../assets/catolica.png';

const Info = ({ navigation }) => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: 'white' }}
      contentContainerStyle={{ flex: 1 }}
    >
      <Header title={'Test'} />
      <View style={{ flex: 5, padding: 20 }}>
        <Text style={{ fontSize: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>TEEEEEEEEEESTE </Text>
         TTTTTTTTTTTEEEEEEEEEEEEEEESSSSSSSSSSSTTTTTTTTTTEEEEEEEEEEEEEEEEEE
          <Text style={{ fontWeight: 'bold' }}> Centro Universitário Católica de Santa Catarina.</Text>
        </Text>
      </View>
      <View
        style={{
          flex: 0,
          alignSelf: 'center',
          padding: 5,
          backgroundColor: '#9D2D34',
          borderRadius: 10,
          margin: 10,
        }}
      >
        <Image
          source={catolicaLogo}
          style={{
            width: 150,
            height: 51,
          }}
          resizeMode="cover"
        />
      </View>
    </ScrollView>
  );
}

export default Info;
