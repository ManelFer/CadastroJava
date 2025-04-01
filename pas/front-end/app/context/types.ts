// context/types.ts
export interface Parent {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    address: string;
  }
  
  export type ParentsContextType = {
    parents: Parent[];
    addParent: (parent: Omit<Parent, 'id'>) => Promise<void>;
    updateParent: (parent: Parent) => Promise<void>;
    deleteParent: (id: string) => Promise<void>;
    loading: boolean;
    error: string | null;
  };