# Documentação do Backend de Cadastro de Pais

Uma aplicação backend Spring Boot para gerenciamento de cadastro de pais com integração ao banco de dados SQLite.

## Índice
- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Dependências](#dependências)
- [Configuração](#configuração)
- [Documentação da API](#documentação-da-api)
- [Banco de Dados](#banco-de-dados)
- [Guia de Desenvolvimento](#guia-de-desenvolvimento)
- [Testes](#testes)
- [Deploy](#deploy)

## Visão Geral

O backend foi construído usando Spring Boot 2.7.0 e fornece endpoints RESTful para gerenciamento de cadastro de pais. Utiliza SQLite como banco de dados e inclui recursos para validação de dados, tratamento de erros e monitoramento de conexão.

## Estrutura do Projeto

```
backend-parents-registration/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/parents/registration/
│   │   │       ├── controller/
│   │   │       │   └── ParentController.java
│   │   │       ├── dao/
│   │   │       │   └── ParentDAO.java
│   │   │       ├── database/
│   │   │       │   └── DatabaseHelper.java
│   │   │       ├── model/
│   │   │       │   └── Parent.java
│   │   │       └── Main.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
└── pom.xml
```

## Dependências

Principais dependências no `pom.xml`:
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <version>2.7.0</version>
    </dependency>
    <dependency>
        <groupId>org.xerial</groupId>
        <artifactId>sqlite-jdbc</artifactId>
        <version>3.36.0.3</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.13.0</version>
    </dependency>
</dependencies>
```

## Configuração

### application.properties
```properties
server.port=8080
spring.jackson.serialization.write-dates-as-timestamps=false
```

### Configuração do Banco de Dados
O banco de dados é criado e gerenciado automaticamente pelo `DatabaseHelper.java`. O arquivo do banco de dados é criado no diretório raiz do projeto.

## Documentação da API

### Endpoints do Parent Controller

#### Testar Conexão
- **URL**: `/api/parents/test`
- **Método**: `GET`
- **Resposta**: 
  ```json
  {
    "status": "success",
    "message": "Backend is working!"
  }
  ```

#### Criar Pai/Mãe
- **URL**: `/api/parents`
- **Método**: `POST`
- **Corpo da Requisição**:
  ```json
  {
    "name": "string",
    "surname": "string",
    "email": "string",
    "age": "integer",
    "address": "string"
  }
  ```
- **Resposta**: 
  ```json
  {
    "status": "success",
    "message": "Parent registered successfully"
  }
  ```

#### Obter Todos os Pais
- **URL**: `/api/parents`
- **Método**: `GET`
- **Resposta**: Array de objetos de pais

#### Obter Pai por ID
- **URL**: `/api/parents/{id}`
- **Método**: `GET`
- **Resposta**: Objeto de um único pai

## Banco de Dados

### Esquema
O banco de dados consiste em duas tabelas:

1. Tabela **parents**:
   - id (PRIMARY KEY)
   - name (TEXT)
   - surname (TEXT)
   - email (TEXT, UNIQUE)
   - age (INTEGER)
   - address (TEXT)
   - created_at (TIMESTAMP)

2. Tabela **students**:
   - id (PRIMARY KEY)
   - parent_id (FOREIGN KEY)
   - name (TEXT)
   - birth_date (DATE)
   - grade (TEXT)
   - created_at (TIMESTAMP)

### Operações no Banco de Dados
A classe `ParentDAO` gerencia todas as operações no banco:
- Gerenciamento de conexão
- Operações CRUD
- Prepared statements
- Tratamento de erros

## Guia de Desenvolvimento

### Pré-requisitos
- Java 11 ou superior
- Maven 3.6 ou superior
- SQLite

### Configuração
1. Clone o repositório
2. Navegue até o diretório do backend
3. Execute `mvn clean install`
4. Inicie a aplicação com `mvn spring-boot:run`

### Estilo de Código
- Siga as convenções de nomenclatura Java
- Use nomes significativos para variáveis
- Adicione comentários para lógicas complexas
- Trate exceções apropriadamente

## Testes

### Testes Unitários
Execute os testes com:
```bash
mvn test
```

### Testes de API
Use ferramentas como Postman ou curl para testar os endpoints:
```bash
# Testar conexão
curl http://localhost:8080/api/parents/test

# Criar pai
curl -X POST http://localhost:8080/api/parents \
  -H "Content-Type: application/json" \
  -d '{"name":"João","surname":"Silva","email":"joao@exemplo.com"}'
```

## Deploy

### Deploy em Produção
1. Construa o arquivo JAR:
   ```bash
   mvn clean package
   ```

2. Execute o JAR:
   ```bash
   java -jar target/parents-registration-backend-1.0.0.jar
   ```

### Variáveis de Ambiente
- `SERVER_PORT`: Sobrescreve a porta padrão (8080)
- `DATABASE_PATH`: Caminho personalizado para o arquivo do banco de dados

## Tratamento de Erros

O backend implementa tratamento de erros abrangente:
- Validação de entrada
- Erros de conexão com o banco de dados
- Exceções SQL
- Códigos de status HTTP
- Erros de parsing JSON

## Segurança

- Validação de entrada
- Prevenção contra SQL injection
- Configuração CORS
- Sanitização de mensagens de erro

## Monitoramento

O sistema inclui:
- Monitoramento de status de conexão
- Log de erros
- Log de requisições/respostas
- Log de operações no banco de dados