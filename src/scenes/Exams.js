import React from 'react';
import { FlatList, ActivityIndicator, ScrollView, View, Text, Button } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import { getExames as getExamesFromAPI } from '../services/api' 
import { getExames as getExamesFromDB, salvarExame } from '../services/dbhelper' 

export default class Details extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showList: false,
      exames: [],
      wasFromDB: false
    }
  }

  getExamesFromApi = () => {
    let exames = getExamesFromAPI();

    exames.then((exames) => {
        //let examesFiltrados = exames.filter(exame => exame.idade <= 40);
        let examesFiltrados = exames;

        this.setState({
          exames: examesFiltrados,
          wasFromDB: false
        });

      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => this.setState({ isLoading: false, showList: true }));
  }

  goToDetails = (item) => this.props.navigation.navigate('Details', item);

  getExames = () => {
    let exames = getExamesFromDB();

    if (exames.length > 0) {
        this.setState({
          exames: exames,
          isLoading: false,
          showList: true,
          wasFromDB: true
        })
    } else {
      this.getExamesFromApi();
    }

  };

  renderItem = ({ item }) => {
    if (this.state.wasFromDB) {
      item.image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/SQLite370.svg/1200px-SQLite370.svg.png'
    } else {
      item.image = 'https://cromossomoy.com/files/styles/imagem_artigo__630x277_/public/artigos/exame-medico.jpg?itok=2nSEfag'
    }

    return (
      <Card
        key={item.id}
        onPress={this.goToDetails}
        item={item}
      />
    );
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    if (this.state.showList) {
      return (
        <ScrollView style={{ backgroundColor: 'white' }}>
          <Header title={'Exames Recomendados'} />
          <View style={{ flex: 1, paddingTop: 20 }}>
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

    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <Header title={'Exames Recomendados'} />
        <View style={{ flex: 1, paddingTop: 20 }}>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            onPress={this.getExames}
            title="Pegar Exames"
          />
          <Text style={{ fontSize: 80, textAlign: 'center' }}>🥜🌭🥜</Text>
        </View>
      </ScrollView>
    );
  }
}
