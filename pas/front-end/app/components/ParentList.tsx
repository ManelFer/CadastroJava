import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Parent } from '../context/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { ParentsContext } from '../context/ParentsContext';

type ParentListProps = {
  parent: Parent;
};

type ParentListNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Parents'>;

export default function ParentList({ parent }: ParentListProps) {
  const navigation = useNavigation<ParentListNavigationProp>();
  const { deleteParent } = useContext(ParentsContext);

  const confirmDelete = () => {
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja realmente excluir ${parent.firstName} ${parent.lastName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => deleteParent(parent.id) },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate('EditParent', { parent });
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {parent.firstName} {parent.lastName}
        </Text>
        <Text>Email: {parent.email}</Text>
        <Text>Idade: {parent.age}</Text>
        <Text>Endereço: {parent.address}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={handleEdit}>
          <MaterialIcons name="edit" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={confirmDelete}>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 15,
  },
});