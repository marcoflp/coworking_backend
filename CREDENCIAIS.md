# 🔐 Credenciais do Sistema

## 👥 Usuários de Teste

### 👑 ADMIN
- **Email**: `admin@coworking.com`
- **Senha**: `admin123`
- **Permissões**: Pode tudo (criar, editar, deletar)

### 👤 USUÁRIO COMUM
- **Email**: `user@coworking.com`
- **Senha**: `user123`
- **Permissões**: Pode criar e editar (não pode deletar)

---

## 🚀 Como Usar

### 1. Fazer Login (Postman ou Frontend):

**POST** `http://localhost:4000/auth/login`

**Body (Admin):**
```json
{
  "email": "admin@coworking.com",
  "senha": "admin123"
}
```

**Body (User):**
```json
{
  "email": "user@coworking.com",
  "senha": "user123"
}
```

### 2. Copiar o Token da Resposta

### 3. Usar o Token nas Requisições:
```
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## 🔄 Recriar Usuários

Se precisar recriar os usuários:

```bash
npx knex seed:run --specific=seed_usuarios_auth.js
```

---

## 📝 Para Produção

Execute o mesmo seed no servidor de produção:

1. Conecte no servidor
2. Entre na pasta do projeto
3. Execute: `npx knex seed:run --specific=seed_usuarios_auth.js`

Ou adicione no script de deploy do Render:
```bash
npm install && npm run migrate && npx knex seed:run --specific=seed_usuarios_auth.js
```

---

## ⚠️ IMPORTANTE

- Troque as senhas em produção!
- Use senhas fortes
- Não compartilhe as credenciais de admin
