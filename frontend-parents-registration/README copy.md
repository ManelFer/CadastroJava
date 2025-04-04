# Documentação do Frontend de Cadastro de Pais

Aplicação React Native para o Sistema de Cadastro de Pais, fornecendo uma interface amigável para registro e gerenciamento de pais.

## Índice
- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Dependências](#dependências)
- [Configuração](#configuração)
- [Componentes](#componentes)
- [Gerenciamento de Estado](#gerenciamento-de-estado)
- [Integração com API](#integração-com-api)
- [Guia de Desenvolvimento](#guia-de-desenvolvimento)
- [Testes](#testes)
- [Deploy](#deploy)

## Visão Geral

O frontend foi construído usando React Native e fornece uma interface moderna e responsiva para cadastro de pais. Inclui validação de formulários, feedback em tempo real e tratamento de erros.

## Estrutura do Projeto

```
frontend-parents-registration/
├── app/
│   ├── components/
│   │   ├── FormInput.tsx
│   │   └── SubmitButton.tsx
│   ├── styles/
│   │   └── styles.ts
│   ├── config.ts
│   └── index.tsx
├── package.json
└── tsconfig.json
```

## Dependências

Principais dependências no `package.json`:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-native": "^0.72.0",
    "expo": "^49.0.0",
    "typescript": "^5.0.0"
  }
}
```

## Configuração

### Configuração da API (config.ts)
```typescript
export const API_URL = 'http://localhost:8080';
```

### Variáveis de Ambiente
- `API_URL`: Endpoint da API backend
- `DEBUG_MODE`: Ativa/desativa logs de depuração

## Componentes

### FormInput
- Manipula entrada de texto com validação
- Props:
  - `label`: Rótulo do campo
  - `value`: Valor atual
  - `onChange`: Manipulador de alteração
  - `error`: Mensagem de erro
  - `placeholder`: Texto de orientação
  - `keyboardType`: Tipo de teclado (padrão, email, numérico)

### SubmitButton
- Manipula envio de formulário
- Props:
  - `onPress`: Manipulador de envio
  - `disabled`: Estado do botão
  - `title`: Texto do botão

## Gerenciamento de Estado

A aplicação utiliza React Hooks para gerenciamento de estado:

### Estado do Formulário
```typescript
const [formData, setFormData] = useState({
  name: '',
  surname: '',
  email: '',
  age: '',
  address: ''
});
```

### Estado de Erros
```typescript
const [errors, setErrors] = useState({
  name: '',
  surname: '',
  email: '',
  age: '',
  address: ''
});
```

### Estado de Conexão
```typescript
const [isConnected, setIsConnected] = useState(false);
```

## Integração com API

### Chamadas à API
```typescript
// Testar conexão
const testConnection = async () => {
  try {
    const response = await fetch(`${API_URL}/api/parents/test`);
    const data = await response.json();
    setIsConnected(data.status === 'success');
  } catch (error) {
    setIsConnected(false);
  }
};

// Enviar formulário
const handleSubmit = async () => {
  try {
    const response = await fetch(`${API_URL}/api/parents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    // Tratar resposta
  } catch (error) {
    // Tratar erro
  }
};
```

## Guia de Desenvolvimento

### Pré-requisitos
- Node.js 16 ou superior
- npm ou yarn
- Expo CLI
- Ambiente de desenvolvimento React Native

### Configuração
1. Clone o repositório
2. Navegue até o diretório do frontend
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

### Estilo de Código
- Siga as melhores práticas do TypeScript
- Use componentes funcionais com hooks
- Implemente tratamento de erros adequado
- Adicione comentários para lógicas complexas

## Testes

### Testes de Componentes
```typescript
// Exemplo de teste para FormInput
describe('FormInput', () => {
  it('renderiza corretamente', () => {
    const { getByPlaceholderText } = render(
      <FormInput
        label="Nome"
        value=""
        onChange={() => {}}
        placeholder="Digite o nome"
      />
    );
    expect(getByPlaceholderText('Digite o nome')).toBeTruthy();
  });
});
```

### Testes de Integração
```typescript
// Exemplo de teste para envio de formulário
describe('Envio de Formulário', () => {
  it('envia dados do formulário corretamente', async () => {
    const { getByTestId } = render(<App />);
    fireEvent.changeText(getByTestId('name-input'), 'João');
    fireEvent.press(getByTestId('submit-button'));
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/parents'),
        expect.any(Object)
      );
    });
  });
});
```

## Deploy

### Build de Produção
1. Construa o aplicativo:
   ```bash
   expo build:android
   # ou
   expo build:ios
   ```

2. Publique nas lojas de aplicativos:
   - Siga o guia de publicação do Expo
   - Submeta para Google Play Store ou Apple App Store

### Configuração de Ambiente
- Configure endpoints da API para produção
- Configure rastreamento de erros
- Ative análises (analytics)
- Configure parâmetros de segurança

## Tratamento de Erros

O frontend implementa tratamento abrangente de erros:
- Erros de validação de formulário
- Erros de rede
- Erros de resposta da API
- Feedback ao usuário
- Log de erros

## Segurança

- Sanitização de entrada
- Comunicação segura com API
- Tratamento de mensagens de erro
- Validação de dados

## Performance

### Técnicas de Otimização
- Memoização de componentes
- Carregamento preguiçoso (lazy loading)
- Otimização de imagens
- Cache de requisições de rede

### Monitoramento
- Métricas de performance
- Rastreamento de erros
- Análise de uso (analytics)
- Monitoramento de rede