import React, { createContext, useContext, useState, useEffect } from 'react';
import { Parent } from './types';
import { getParents, createParent, updateParent, deleteParent } from '../services/parentService';

type ParentsContextData = {
  parents: Parent[];
  loading: boolean;
  error: string | null;
  refreshParents: () => Promise<void>;
  addParent: (parent: Omit<Parent, 'id'>) => Promise<void>;
  updateParent: (id: string, parent: Partial<Parent>) => Promise<void>;
  removeParent: (id: string) => Promise<void>;
};

const ParentsContext = createContext<ParentsContextData>({} as ParentsContextData);

export const ParentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshParents = async () => {
    try {
      setLoading(true);
      const data = await getParents();
      setParents(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshParents();
  }, []);

  const addParent = async (parent: Omit<Parent, 'id'>) => {
    try {
      setLoading(true);
      const newParent = await createParent(parent);
      setParents(prev => [...prev, newParent]);
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateParent = async (id: string, parent: Partial<Parent>) => {
    try {
      setLoading(true);
      const updated = await updateParent(id, parent);
      setParents(prev => prev.map(p => p.id === id ? updated : p));
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeParent = async (id: string) => {
    try {
      setLoading(true);
      await deleteParent(id);
      setParents(prev => prev.filter(p => p.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ParentsContext.Provider
      value={{
        parents,
        loading,
        error,
        refreshParents,
        addParent,
        updateParent,
        removeParent
      }}
    >
      {children}
    </ParentsContext.Provider>
  );
};

export const useParents = () => useContext(ParentsContext);