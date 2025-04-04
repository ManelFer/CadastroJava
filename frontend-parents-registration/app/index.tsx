import React, { useState, useEffect } from 'react';
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
  surname: string;
  email: string;
  age: string;
  address: string;
}

export default function App() {
  const [formData, setFormData] = useState<ParentFormData>({
    name: '',
    surname: '',
    email: '',
    age: '',
    address: ''
  });

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Teste de conexão com o backend ao iniciar o aplicativo
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      const response = await fetch(`${API_URL}/api/parents/test`);
      if (response.ok) {
        setIsConnected(true);
        console.log('Backend connection successful');
      } else {
        setIsConnected(false);
        console.error('Backend connection failed');
      }
    } catch (error) {
      setIsConnected(false);
      console.error('Error testing connection:', error);
    }
  };

  const handleChange = (name: keyof ParentFormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    // Validação simples dos campos obrigatórios
    if (!formData.name || !formData.surname || !formData.email) {
      Alert.alert('Erro', 'Nome, sobrenome e email são campos obrigatórios');
      return;
    }

    try {
      console.log('Submitting form data:', formData);
      const response = await fetch(`${API_URL}/api/parents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          age: formData.age ? parseInt(formData.age) : null
        }),
      });

      console.log('Response status:', response.status);
      const contentType = response.headers.get('content-type');
      console.log('Response content type:', contentType);

      if (!response.ok) {
        let errorMessage = 'Erro ao cadastrar';
        
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          console.error('Error response:', errorData);
        } else {
          const text = await response.text();
          errorMessage = text || errorMessage;
          console.error('Error text:', text);
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Success response:', data);

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
      surname: '',
      email: '',
      age: '',
      address: ''
    });
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Cadastro de Pais de Alunos</Text>
      
      <View style={styles.connectionStatus}>
        <Text style={[styles.statusText, isConnected ? styles.connected : styles.disconnected]}>
          {isConnected ? 'Conectado ao servidor' : 'Desconectado do servidor'}
        </Text>
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholder="Digite o nome"
          accessibilityLabel="Campo para inserir o nome"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Sobrenome</Text>
        <TextInput
          style={styles.input}
          value={formData.surname}
          onChangeText={(text) => handleChange('surname', text)}
          placeholder="Digite o sobrenome"
          accessibilityLabel="Campo para inserir o sobrenome"
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
  connectionStatus: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  statusText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  connected: {
    color: '#4CAF50',
  },
  disconnected: {
    color: '#f44336',
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