import React from 'react';
import { FlatList, ActivityIndicator, ScrollView, View, Text, Button } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'SaudeHomemDatabase.db' });


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
    //return fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
    //return fetch('http://10.197.9.209:3000/api/exames')
    return fetch('https://5cf05f1e5660c40014949881.mockapi.io/api/exames')
      .then((response) => response.json())
      .then((responseJson) => {

        //let examesFiltrados = responseJson.filter(exame => exame.idade <= 40);
        let examesFiltrados = responseJson;

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

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM exames', [], (tx, results) => {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }

          console.log(temp.length);

          if (temp.length > 0) {
            resolve(
              this.setState({
                exames: temp,
                isLoading: false,
                showList: true,
                wasFromDB: true
              })
            );
          } else {
            console.log('ta no else porra');
            resolve (this.getExamesFromApi());
          }

        });
      });
    });
  }

  renderItem = ({ item }) => {

    // db.transaction(function (transaction) {
    //   transaction.executeSql(
    //     'INSERT INTO exames (nome, idadeRecomendada, frequencia, detalhes) VALUES (?,?,?,?)',
    //     [item.title, item.idade, item.frequencia, item.content],
    //     (transaction, results) => {
    //       console.log('Results', results.rowsAffected);
    //       if (results.rowsAffected > 0) {
    //         console.log('Success');
    //       } else {
    //         console.log('Failed');
    //       }
    //     }
    //   );
    // });

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
