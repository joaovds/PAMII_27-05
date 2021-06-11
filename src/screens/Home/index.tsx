import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import styles from './styles';

interface IPessoa {
  id: number;
  nome: string;
  curso: string;
}

const Home: React.FC = () => {
  const navigation = useNavigation();

  const [pessoas, setPessoas] = useState<IPessoa[]>();

  const getData = api.get('').then((res) => setPessoas(res.data));

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getData;
    });
  }, [navigation]);

  const handleDelete = (personId: string | number) => {
    Alert.alert(
      'Confirmação',
      'Deseja mesmo deletar este registro?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => console.log('cancelado'),
        },
        {
          text: 'Sim',
          onPress: () => {
            api.delete(`/${personId}`).then(() => {
              getData;
            });
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={24}
            color="#404040"
            style={{ padding: 12, marginLeft: 4 }}
          />

          <TextInput
            style={styles.search}
            placeholder="Digite o ID do usuário"
            placeholderTextColor="#333333"
            keyboardType="numeric"
          />
        </View>

        <RectButton
          style={{ ...styles.buttonAction, borderWidth: 1 }}
          onPress={() => navigation.navigate('FormPeople')}
        >
          <Feather name="user-plus" size={24} color="#8f8f8f" />
        </RectButton>
      </View>

      <View>
        <Text style={styles.title}>Pessoas cadastradas</Text>
      </View>

      <View style={styles.pessoasContainer}>
        <FlatList
          data={pessoas}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.pessoaCard}>
              <View style={{ flex: 1, paddingRight: 4 }}>
                <Text style={styles.nome} numberOfLines={1}>
                  {item.nome}
                </Text>
                <Text style={styles.curso} numberOfLines={1}>
                  {item.curso}
                </Text>
              </View>
              <View style={styles.actions}>
                <RectButton style={styles.buttonAction}>
                  <Feather
                    name="edit"
                    size={20}
                    color="#4d4d4d"
                    onPress={() => {
                      navigation.navigate('FormPeople', {
                        id: item.id,
                        nome: item.nome,
                        curso: item.curso,
                      });
                    }}
                  />
                </RectButton>

                <RectButton
                  style={styles.buttonAction}
                  onPress={() => handleDelete(item.id)}
                >
                  <Feather name="delete" size={20} color="#8f4040" />
                </RectButton>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
