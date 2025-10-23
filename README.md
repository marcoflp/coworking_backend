# 🔧 Coworking API - Backend

API REST para sistema de reservas de espaços coworking.

## 🚀 Deploy no Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com)

## 🛠️ Tecnologias

- Node.js + Express
- Objection.js (ORM)
- Knex (Query Builder)
- PostgreSQL

## 📋 Estrutura do Banco de Dados

### Tabelas

**usuarios**
- id (PK)
- nome
- email (unique)
- telefone

**salas**
- id (PK)
- nome (unique)
- capacidade
- localizacao
- recursos

**reservas**
- id (PK)
- usuario_id (FK → usuarios.id)
- sala_id (FK → salas.id)
- horario_inicio
- horario_fim
- proposito

## 🔗 Endpoints

### Usuários
- `GET /usuarios` - Listar todos
- `POST /usuarios` - Criar novo
- `GET /usuarios/:id` - Buscar por ID
- `PATCH /usuarios/:id` - Atualizar
- `DELETE /usuarios/:id` - Deletar

### Salas
- `GET /salas` - Listar todas
- `POST /salas` - Criar nova
- `GET /salas/:id` - Buscar por ID
- `PATCH /salas/:id` - Atualizar
- `DELETE /salas/:id` - Deletar

### Reservas
- `GET /reservas` - Listar todas (com usuário e sala)
- `POST /reservas` - Criar nova
- `GET /reservas/:id` - Buscar por ID
- `PATCH /reservas/:id` - Atualizar
- `DELETE /reservas/:id` - Deletar

## 🏃 Rodando Localmente

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Crie um arquivo `.env`:
```env
DATABASE_URL=postgresql://user:pass@host/db
PORT=4000
```

### 3. Executar migrations
```bash
npm run migrate
```

### 4. Popular banco de dados
```bash
npm run seed
```

### 5. Iniciar servidor
```bash
npm run dev
```

Servidor rodando em: http://localhost:4000

## 📦 Deploy no Render

### Configurações:

**Build Command:**
```bash
npm install && npm run migrate && npm run seed
```

**Start Command:**
```bash
npm start
```

**Environment Variables:**
- `DATABASE_URL`: Connection string do PostgreSQL (ex: Neon)
- `PORT`: 4000

### Banco de Dados (Neon):

1. Acesse: https://neon.tech
2. Crie um projeto PostgreSQL
3. Copie a connection string
4. Cole em `DATABASE_URL` no Render

## 🧪 Testando a API

```bash
# Listar usuários
curl https://sua-api.onrender.com/usuarios

# Criar usuário
curl -X POST https://sua-api.onrender.com/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"João","email":"joao@email.com","telefone":"51-99999-9999"}'

# Atualizar usuário
curl -X PATCH https://sua-api.onrender.com/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{"telefone":"51-88888-8888"}'

# Deletar usuário
curl -X DELETE https://sua-api.onrender.com/usuarios/1
```

## 📝 Scripts Disponíveis

- `npm start` - Inicia o servidor
- `npm run dev` - Inicia com nodemon (desenvolvimento)
- `npm run migrate` - Executa migrations
- `npm run seed` - Popula banco com dados iniciais

## 🔐 CORS

O backend aceita requisições de:
- http://localhost:3000 (desenvolvimento)
- Seu domínio do frontend (produção)

Para adicionar mais origens, edite `src/app.js`:
```javascript
app.use(cors({
  origin: ['https://seu-frontend.vercel.app', 'http://localhost:3000']
}));
```
