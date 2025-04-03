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
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function App() {
  const [formData, setFormData] = useState<ParentFormData>({
    name: '',
    email: '',
    phone: '',
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
    if (!formData.name || !formData.email) {
      Alert.alert('Erro', 'Nome e email são campos obrigatórios');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/parents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar');
      }

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof Error) {
        Alert.alert('Erro', error.message);
      } else {
        Alert.alert('Erro', 'Erro ao cadastrar');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
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
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholder="Digite o nome completo"
          accessibilityLabel="Campo para inserir o nome completo"
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
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          value={formData.phone}
          onChangeText={(text) => handleChange('phone', text)}
          placeholder="Digite o telefone"
          keyboardType="phone-pad"
          accessibilityLabel="Campo para inserir o telefone"
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