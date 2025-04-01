import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Parent } from '../context/types';
import { validateEmail, validateAge } from '../utils/validators';

type ParentFormProps = {
  initialValues?: Partial<Parent>;
  onSubmit: (values: Omit<Parent, 'id'>) => Promise<void>;
  loading?: boolean;
};

const ParentForm: React.FC<ParentFormProps> = ({ 
  initialValues = {}, 
  onSubmit, 
  loading = false 
}) => {
  const [values, setValues] = useState({
    firstName: initialValues.firstName || '',
    lastName: initialValues.lastName || '',
    email: initialValues.email || '',
    age: initialValues.age?.toString() || '',
    address: initialValues.address || '',
  });

  const handleChange = (field: keyof typeof values, text: string) => {
    setValues(prev => ({ ...prev, [field]: text }));
  };

  const handleSubmit = async () => {
    if (!values.firstName || !values.lastName || !values.email || !values.age || !values.address) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    if (!validateEmail(values.email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    const ageValidation = validateAge(values.age);
    if (!ageValidation.valid) {
      Alert.alert('Erro', ageValidation.message || 'Idade inválida');
      return;
    }

    try {
      await onSubmit({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        age: parseInt(values.age),
        address: values.address,
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={values.firstName}
        onChangeText={text => handleChange('firstName', text)}
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        value={values.lastName}
        onChangeText={text => handleChange('lastName', text)}
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={values.email}
        onChangeText={text => handleChange('email', text)}
        keyboardType="email-address"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={values.age}
        onChangeText={text => handleChange('age', text)}
        keyboardType="numeric"
        editable={!loading}
      />
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Endereço"
        value={values.address}
        onChangeText={text => handleChange('address', text)}
        multiline
        numberOfLines={3}
        editable={!loading}
      />
      <Button 
        title="Salvar" 
        onPress={handleSubmit} 
        disabled={loading} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },
});

export default ParentForm;