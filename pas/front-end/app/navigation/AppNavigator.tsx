import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './RootStackParamList';
import {
  ParentsScreen,
  AddParentScreen,
  EditParentScreen,
  ParentDetailScreen
} from '../screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#6200ee' },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen 
          name="Parents" 
          component={ParentsScreen} 
          options={{ title: 'Cadastro de Pais' }}
        />
        <Stack.Screen 
          name="AddParent" 
          component={AddParentScreen} 
          options={{ title: 'Novo Cadastro' }}
        />
        <Stack.Screen 
          name="EditParent" 
          component={EditParentScreen} 
          options={{ title: 'Editar Cadastro' }}
        />
        <Stack.Screen 
          name="ParentDetail" 
          component={ParentDetailScreen} 
          options={{ title: 'Detalhes' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}