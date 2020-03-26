import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, FlatList, TouchableOpacity, Alert } from 'react-native';

import api from '../../services/api';

import Styles from './styles';
import logoImg from '../../assets/logo.png';

export default function Incidents() {
  const navigation = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);


  function navigateToDetail(incident) {
    navigation.navigate('Detail', {incident});
  }

  async function loadIncidents() {
    try{
      if(loading) return;
      if(total > 0 && incidents.length === total )return;

      setLoading(true);
      const response = await api.get('/incidents', {
        params: { page }
      });

      setIncidents([...incidents, ...response.data]);
      setTotal(response.headers['x-total-count']);
      setPage(page + 1);
      setLoading(false);

    }catch(err) {
      Alert.alert("Erro", err.response.data.error);
    }
  }

  useEffect(() => {
    loadIncidents();
  },[]);

  async function handleRefresh() {
    setRefresh(true);
    const response = await api.get('/incidents', {
      params: { page : 1 }
    });
    setTotal(response.headers['x-total-count']);
    setIncidents(response.data);
    setRefresh(false);
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.header}>
        <Image source={logoImg} />
        <Text style={Styles.headerText}>
          Total de <Text style={Styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>
      <Text style={Styles.title}>Bem vindo!</Text>
      <Text style={Styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        style={Styles.incidetList}
        data={incidents}
        refreshing={refresh}
        onRefresh={handleRefresh}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: incident }) => (
          <View style={Styles.incident}>
            <Text style={Styles.incidentProperty}>ONG:</Text>
            <Text style={Styles.incidentValue}> {incident.name}</Text>

            <Text style={Styles.incidentProperty}>CASO:</Text>
            <Text style={Styles.incidentValue}>{incident.title}</Text>

            <Text style={Styles.incidentProperty}>VALOR:</Text>
            <Text style={Styles.incidentValue}>
              {
              Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
              .format(incident.value)
              }
            </Text>

            <TouchableOpacity 
              style={Styles.detailsButton} 
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={Styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={17} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />      
    </View>
  );
}
