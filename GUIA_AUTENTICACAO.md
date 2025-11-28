# 🔐 Sistema de Autenticação e Permissões

## ✅ Sistema Implementado

### Permissões por Tipo de Usuário

#### 👤 Usuário Normal (role: 'user')
**Pode:**
- ✅ Ver salas (GET /salas)
- ✅ Criar salas (POST /salas)
- ✅ Editar salas (PATCH /salas/:id)
- ✅ Criar reservas (POST /reservas)
- ✅ Ver reservas (GET /reservas)
- ✅ Editar reservas (PATCH /reservas/:id)
- ✅ Ver apenas seu próprio perfil (GET /usuarios/:id)
- ✅ Editar apenas seu próprio perfil (PATCH /usuarios/:id)

**Não pode:**
- ❌ Deletar salas
- ❌ Deletar reservas
- ❌ Deletar usuários
- ❌ Ver lista de todos os usuários
- ❌ Ver perfil de outros usuários
- ❌ Editar outros usuários

#### 👑 Administrador (role: 'admin')
**Pode tudo:**
- ✅ Todas as operações de usuário normal
- ✅ Deletar salas, reservas e usuários
- ✅ Ver lista de todos os usuários
- ✅ Ver e editar qualquer usuário

---

## 🚀 Como Usar no Postman

### 1️⃣ REGISTRAR NOVO USUÁRIO

**Método:** `POST`  
**URL:** `http://localhost:4000/auth/registrar`  
**Headers:** `Content-Type: application/json`

**Body:**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "51-99999-8888",
  "senha": "senha123"
}
```

**Resposta:**
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "51-99999-8888",
  "role": "user"
}
```

---

### 2️⃣ FAZER LOGIN

**Método:** `POST`  
**URL:** `http://localhost:4000/auth/login`  
**Headers:** `Content-Type: application/json`

**Body:**
```json
{
  "email": "joao@email.com",
  "senha": "senha123"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    "telefone": "51-99999-8888",
    "role": "user"
  }
}
```

**💡 COPIE O TOKEN!** Você vai precisar dele para todas as outras requisições.

---

### 3️⃣ USAR O TOKEN NAS REQUISIÇÕES

Para todas as requisições protegidas, adicione o token no header:

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer SEU_TOKEN_AQUI`

**Exemplo no Postman:**
1. Vá na aba "Headers"
2. Adicione:
   - Key: `Authorization`
   - Value: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

### 4️⃣ CRIAR SALA (Usuário Normal)

**Método:** `POST`  
**URL:** `http://localhost:4000/salas`  
**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer SEU_TOKEN`

**Body:**
```json
{
  "nome": "Sala Inovação",
  "capacidade": 10,
  "localizacao": "2º andar",
  "recursos": "Projetor, Wi-Fi"
}
```

✅ **Funciona** - Usuário normal pode criar salas

---

### 5️⃣ CRIAR RESERVA (Usuário Normal)

**Método:** `POST`  
**URL:** `http://localhost:4000/reservas`  
**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer SEU_TOKEN`

**Body:**
```json
{
  "usuario_id": 1,
  "sala_id": 1,
  "horario_inicio": "2024-01-25T14:00:00.000Z",
  "horario_fim": "2024-01-25T16:00:00.000Z",
  "proposito": "Reunião"
}
```

✅ **Funciona** - Usuário normal pode criar reservas

---

### 6️⃣ TENTAR DELETAR SALA (Usuário Normal)

**Método:** `DELETE`  
**URL:** `http://localhost:4000/salas/1`  
**Headers:**
- `Authorization: Bearer SEU_TOKEN`

**Resposta:**
```json
{
  "erro": "Acesso negado. Apenas administradores."
}
```

❌ **Bloqueado** - Apenas admin pode deletar

---

### 7️⃣ VER PRÓPRIO PERFIL (Usuário Normal)

**Método:** `GET`  
**URL:** `http://localhost:4000/usuarios/1` (seu próprio ID)  
**Headers:**
- `Authorization: Bearer SEU_TOKEN`

✅ **Funciona** - Pode ver seu próprio perfil

---

### 8️⃣ TENTAR VER OUTRO USUÁRIO (Usuário Normal)

**Método:** `GET`  
**URL:** `http://localhost:4000/usuarios/2` (ID de outro usuário)  
**Headers:**
- `Authorization: Bearer SEU_TOKEN`

**Resposta:**
```json
{
  "erro": "Você só pode editar seu próprio perfil"
}
```

❌ **Bloqueado** - Só pode ver seu próprio perfil

---

### 9️⃣ CRIAR ADMIN (Manualmente no Banco)

Para criar um admin, você precisa atualizar diretamente no banco:

```sql
UPDATE usuarios 
SET role = 'admin' 
WHERE email = 'admin@email.com';
```

Ou crie um seed:

```javascript
await Usuario.query().insert({
  nome: 'Admin',
  email: 'admin@email.com',
  telefone: '51-99999-0000',
  senha: await bcrypt.hash('admin123', 10),
  role: 'admin'
});
```

---

## 📋 Resumo de Endpoints

### Públicos (sem token)
- `POST /auth/registrar` - Criar conta
- `POST /auth/login` - Fazer login

### Protegidos (precisa token)
- `GET /auth/perfil` - Ver seu perfil
- `GET /salas` - Listar salas
- `POST /salas` - Criar sala
- `PATCH /salas/:id` - Editar sala
- `GET /reservas` - Listar reservas
- `POST /reservas` - Criar reserva
- `PATCH /reservas/:id` - Editar reserva
- `GET /usuarios/:id` - Ver usuário (só o próprio)
- `PATCH /usuarios/:id` - Editar usuário (só o próprio)

### Apenas Admin (precisa token + role admin)
- `DELETE /salas/:id` - Deletar sala
- `DELETE /reservas/:id` - Deletar reserva
- `DELETE /usuarios/:id` - Deletar usuário
- `GET /usuarios` - Listar todos os usuários

---

## 🚨 Erros Comuns

### "Token não fornecido"
- Você esqueceu de adicionar o header `Authorization`

### "Token inválido"
- Token expirou (24h) ou está incorreto
- Faça login novamente

### "Acesso negado. Apenas administradores."
- Você tentou fazer algo que só admin pode
- Verifique seu `role` no banco

### "Você só pode editar seu próprio perfil"
- Você tentou acessar dados de outro usuário
- Use seu próprio ID

---

## 🔧 Configuração

Certifique-se que o `.env` tem:
```
JWT_SECRET=sua_chave_secreta_super_segura_aqui_123456
```

---

## ✅ Checklist de Teste

- [ ] Registrar usuário normal
- [ ] Fazer login e copiar token
- [ ] Criar sala com token
- [ ] Criar reserva com token
- [ ] Tentar deletar sala (deve dar erro)
- [ ] Ver próprio perfil
- [ ] Tentar ver outro usuário (deve dar erro)
- [ ] Criar admin no banco
- [ ] Login como admin
- [ ] Deletar sala como admin (deve funcionar)
