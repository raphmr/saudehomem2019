import React from 'react';
import { FlatList, ActivityIndicator, ScrollView, View, Text, Button, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import { getExames as getExamesFromAPI } from '../services/api' 
import { getExames as getExamesFromDB, salvarExame } from '../services/dbhelper' 
import DatePicker from 'react-native-datepicker'

export default class Details extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showList: false,
      exames: [],
      dataNascimento: '',
      idade: 0
    }
  }

  getExamesFromApi = () => {
    let exames = getExamesFromAPI();

    exames.then((exames) => {
      let dataAtual = new Date();
      let idade = dataAtual.getFullYear() - parseInt(this.state.dataNascimento.split('-')[2])
      this.setState({idade})
      let examesFiltrados = exames.filter(exame => exame.idade <= idade);

      this.setState({
        exames: examesFiltrados
      });

      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => this.setState({ isLoading: false, showList: true }));
  }

  goToDetails = (item) => this.props.navigation.navigate('Details', item);

  getExames = () => {
      this.getExamesFromApi();
  };

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
          <Text style={{ fontSize: 20, textAlign: 'left' }}>
            Sua idade: {this.state.idade}
          </Text>
          <Button buttonStyle={{width: 100}}
            onPress={() => this.setState({showList: false})}
            title="Voltar"
          />
          <View style={{ flex: 1, paddingTop: 20 }}>
            <FlatList
              data={this.state.exames}
              renderItem={this.renderItem}
              keyExtractor={(item) => `${item.id}`}
            />
          </View>
          <View style={{ alignItems: 'center' }}>
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

        
          <DatePicker
            style={{width: 200}}
            date={this.state.dataNascimento}
            mode="date"
            placeholder="Data de nascimento..."
            format="DD-MM-YYYY"
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
        }}
        onDateChange={(date) => {this.setState({dataNascimento: date})}}
      />
      <TouchableOpacity 
        disabled={this.state.dataNascimento == ''} 
        style={{alignItems: 'center',
        backgroundColor: '#4eabe5',
        marginTop: 20,
        padding: 10}}
        onPress={this.getExames}>
        <Text style={{
        color:'white',
        fontWeight:'bold',}}>PEGAR EXAMES</Text>
      </TouchableOpacity>

          <Text style={{ fontSize: 80, textAlign: 'center' }}></Text>
        </View>
      </ScrollView>
    );
  }

  
}
