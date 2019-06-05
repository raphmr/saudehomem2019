import React from 'react';
import { FlatList, ActivityIndicator,  ScrollView, View, Text } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';


export default class Details extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      exames: []
    }
  }

  componentDidMount(){
    //return fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
    return fetch('http://10.197.9.209:3000/api/exames')
      .then((response) => response.json())
      .then((responseJson) => {

        let examesFiltrados = responseJson.filter(exame => exame.idade > 40);

        this.setState({
          exames: examesFiltrados,
        });

      })
      .catch((error) =>{
        console.error(error);
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  goToDetails = (item) => this.props.navigation.navigate('Details', item)

renderItem = ({ item }) => {
  item.image = 'https://cromossomoy.com/files/styles/imagem_artigo__630x277_/public/artigos/exame-medico.jpg?itok=2nSEfag'
  return (
    <Card
        key={item.id}
        onPress={this.goToDetails}
        item={item}
      />
  );
}

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
    <ScrollView style={{ backgroundColor: 'white'}}>
    <Header title={'Exames Recomendados'}/>
    <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.exames}
          renderItem={this.renderItem}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 80, textAlign: 'center' }}>🥜🌭🥜</Text>
    </View>
  </ScrollView>
    );
  }
}
