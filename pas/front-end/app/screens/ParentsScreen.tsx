import React from 'react';
import { View, StyleSheet, FlatList, Button, ActivityIndicator, Text } from 'react-native';
import { useParents } from '../context/ParentsContext';
import ParentList from '../components/ParentList';
import { useNavigation } from '@react-navigation/native';
import ErrorMessage from '../components/ErrorMessage';

const ParentsScreen: React.FC = () => {
  const { parents, loading, error, refreshParents } = useParents();
  const navigation = useNavigation();

  if (loading && parents.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <ErrorMessage message={error} onRetry={refreshParents} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title="Adicionar Pai/Mãe"
        onPress={() => navigation.navigate('AddParent')}
        color="#6200ee"
      />
      
      <FlatList
        data={parents}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ParentList 
            parent={item} 
            onPress={() => navigation.navigate('ParentDetail', { id: item.id })}
          />
        )}
        refreshing={loading}
        onRefresh={refreshParents}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default ParentsScreen;