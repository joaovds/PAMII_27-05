import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

import styles from './styles';

const FormPeople: React.FC = () => {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState('');

  const handleCreate = () => {
    let formData = new FormData();
    formData.append('nome', nome);
    formData.append('curso', curso);

    api
      .post('', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        Alert.alert(
          res.status == 200 ? 'Sucesso' : 'Erro',
          res.status == 200
            ? 'Pessoa Registrada com sucesso!'
            : 'Houve um problema',
          [
            {
              text: 'Ok',
            },
          ],
          { cancelable: false },
        );

        navigation.navigate('Home');
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <RectButton onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={32} color="#404040" />
            </RectButton>
          </View>

          <View style={styles.form}>
            <Text style={styles.title}>Cadastrar Pessoa</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome da pessoa"
                placeholderTextColor="#333333"
                value={nome}
                onChangeText={(text) => setNome(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Curso</Text>
              <TextInput
                style={styles.input}
                placeholder="Curso da pessoa"
                placeholderTextColor="#333333"
                value={curso}
                onChangeText={(text) => setCurso(text)}
              />
            </View>

            <RectButton style={styles.button} onPress={handleCreate}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </RectButton>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FormPeople;
