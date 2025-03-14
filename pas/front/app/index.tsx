import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { createTable, salvarUsuario } from '../src/services/database';

const App = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [endereco, setEndereco] = useState('');

  // Cria a tabela ao carregar o componente
  useEffect(() => {
    createTable();
  }, []);

  const handleCadastro = () => {
    if (!nome || !sobrenome || !email || !idade || !endereco) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const idadeNumber = parseInt(idade, 10); // Converte a idade para número

    salvarUsuario(
      nome,
      sobrenome,
      email,
      idadeNumber,
      endereco,
      () => {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        // Limpa os campos após o cadastro
        setNome('');
        setSobrenome('');
        setEmail('');
        setIdade('');
        setEndereco('');
      },
      (error: any) => {
        Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados.');
        console.error(error);
      }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      <TextInput
        label="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="Sobrenome"
        value={sobrenome}
        onChangeText={setSobrenome}
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        mode="outlined"
      />

      <TextInput
        label="Idade"
        value={idade}
        onChangeText={setIdade}
        style={styles.input}
        keyboardType="numeric"
        mode="outlined"
      />

      <TextInput
        label="Endereço"
        value={endereco}
        onChangeText={setEndereco}
        style={styles.input}
        mode="outlined"
      />

      <Button
        mode="contained"
        onPress={handleCadastro}
        style={styles.button}
      >
        Cadastrar
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
});

export default App;