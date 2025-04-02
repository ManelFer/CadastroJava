import React, { useState } from 'react';
import {API_URL} from '../config'

import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ScrollView 
} from 'react-native';

interface ParentFormData {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  address: string;
}

export default function App() {
  const [formData, setFormData] = useState<ParentFormData>({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    address: ''
  });

  const handleChange = (name: keyof ParentFormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    // Validate form data
    try {
      const response = await fetch (`${API_URL}/parents`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          age: formData.age ? parseInt(formData.age) : null,
        }),
      });
      const data = await response.json();
      if (!response.ok){
        throw new Error(data.message || 'Erro ao cadastrar');
      }
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      resetForm();
    }catch (error) {
      console.error('Error:', error);
      if (error instanceof Error) {
        Alert.alert('Erro', error.message || 'Erro ao cadastrar');
      } else {
        Alert.alert('Erro', 'Erro ao cadastrar');
      }
    }
  }

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      age: '',
      email: '',
      address: ''
    });
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Cadastro de Pais de Alunos</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={formData.firstName}
          onChangeText={(text) => handleChange('firstName', text)}
          placeholder="Digite o nome"
          accessibilityLabel="Campo para inserir o nome"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Sobrenome</Text>
        <TextInput
          style={styles.input}
          value={formData.lastName}
          onChangeText={(text) => handleChange('lastName', text)}
          placeholder="Digite o sobrenome"
          accessibilityLabel="Campo para inserir o sobrenome"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Idade</Text>
        <TextInput
          style={styles.input}
          value={formData.age}
          onChangeText={(text) => handleChange('age', text.replace(/[^0-9]/g, ''))}
          placeholder="Digite a idade"
          keyboardType="number-pad"
          accessibilityLabel="Campo para inserir a idade"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          placeholder="Digite o email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel="Campo para inserir o email"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={formData.address}
          onChangeText={(text) => handleChange('address', text)}
          placeholder="Digite o endereço completo"
          multiline
          numberOfLines={3}
          accessibilityLabel="Campo para inserir o endereço"
        />
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSubmit}
        accessibilityLabel="Botão para cadastrar os dados"
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});