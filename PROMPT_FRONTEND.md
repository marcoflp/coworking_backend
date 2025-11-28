# 🔧 Prompt para Corrigir Frontend

Cole este prompt no chat do frontend:

---

Preciso que você ajuste o frontend para funcionar com o novo sistema de autenticação do backend. Aqui estão as mudanças:

## 📋 Endpoints da API Atualizados:

### Autenticação (NOVOS):
- `POST /auth/registrar` - Criar conta (body: nome, email, telefone, senha)
- `POST /auth/login` - Login (body: email, senha) → retorna { token, usuario }
- `GET /auth/perfil` - Ver perfil logado (precisa token)

### Usuários:
- `GET /usuarios` - Listar usuários (PRECISA TOKEN)
  - Admin vê todos
  - Usuário comum vê só ele mesmo
- `POST /usuarios` - Criar usuário (público, mas use /auth/registrar)
- `GET /usuarios/:id` - Ver usuário (público)
- `PATCH /usuarios/:id` - Editar (PRECISA TOKEN)
  - Admin edita qualquer um
  - Usuário comum edita só ele mesmo
- `DELETE /usuarios/:id` - Deletar (PRECISA TOKEN ADMIN)

### Salas:
- `GET /salas` - Listar (público)
- `GET /salas/:id` - Ver sala (público)
- `POST /salas` - Criar (PRECISA TOKEN)
- `PATCH /salas/:id` - Editar (PRECISA TOKEN)
- `DELETE /salas/:id` - Deletar (PRECISA TOKEN ADMIN)

### Reservas:
- `GET /reservas` - Listar (PRECISA TOKEN)
- `POST /reservas` - Criar (PRECISA TOKEN)
- `GET /reservas/:id` - Ver (PRECISA TOKEN)
- `PATCH /reservas/:id` - Editar (PRECISA TOKEN)
- `DELETE /reservas/:id` - Deletar (PRECISA TOKEN ADMIN)

## 🔑 Como Enviar o Token:

Para todas as requisições que precisam de token, adicione no header:
```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
}
```

## 💾 Armazenar Token e Usuário:

Após login bem-sucedido, salve no localStorage:
```javascript
localStorage.setItem('token', response.token);
localStorage.setItem('usuario', JSON.stringify(response.usuario));
```

## 🔒 Verificar Permissões:

```javascript
const usuario = JSON.parse(localStorage.getItem('usuario'));
const isAdmin = usuario?.role === 'admin';

// Mostrar botão deletar apenas para admin:
{isAdmin && <button onClick={deletar}>Deletar</button>}
```

## 🚨 Tratamento de Erros:

Se receber erro 401 (não autorizado), redirecione para login:
```javascript
if (response.status === 401) {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  navigate('/login');
}
```

## ✅ Checklist de Ajustes Necessários:

1. Criar tela de Login (POST /auth/login)
2. Criar tela de Registro (POST /auth/registrar)
3. Adicionar token em TODAS as requisições protegidas
4. Salvar token e usuário no localStorage após login
5. Criar função para pegar token do localStorage
6. Adicionar verificação de permissão (isAdmin) nos botões de deletar
7. Redirecionar para login se não tiver token ao acessar páginas protegidas
8. Adicionar logout (limpar localStorage)
9. Mostrar nome do usuário logado no header
10. Na listagem de usuários, usuário comum verá apenas ele mesmo (array com 1 item)

## 🎯 Exemplo de Requisição com Token:

```javascript
const token = localStorage.getItem('token');

const response = await fetch('http://localhost:4000/usuarios', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## 🔐 Exemplo de Login:

```javascript
const handleLogin = async (email, senha) => {
  const response = await fetch('http://localhost:4000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });
  
  const data = await response.json();
  
  if (response.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
    navigate('/dashboard');
  } else {
    alert(data.erro);
  }
};
```

## 🚪 Exemplo de Logout:

```javascript
const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  navigate('/login');
};
```

## 🛡️ Proteger Rotas:

Crie um componente ProtectedRoute:
```javascript
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return children;
};
```

Use assim:
```javascript
<Route path="/usuarios" element={
  <ProtectedRoute>
    <Usuarios />
  </ProtectedRoute>
} />
```

## ⚠️ IMPORTANTE - PERMISSÕES:

### 👤 USUÁRIO COMUM PODE:
- ✅ CRIAR salas
- ✅ EDITAR salas
- ✅ CRIAR reservas
- ✅ EDITAR reservas
- ✅ Ver apenas ELE MESMO na lista de usuários
- ✅ EDITAR apenas ELE MESMO

### 👤 USUÁRIO COMUM NÃO PODE:
- ❌ DELETAR salas
- ❌ DELETAR reservas
- ❌ DELETAR usuários
- ❌ Ver outros usuários na lista
- ❌ Editar outros usuários

### 👑 ADMIN PODE:
- ✅ TUDO (criar, editar, deletar tudo)
- ✅ Ver todos os usuários
- ✅ Editar qualquer usuário
- ✅ Deletar qualquer coisa

### 📝 RESUMO:
- Botões de CRIAR e EDITAR: Mostrar para TODOS (user e admin)
- Botões de DELETAR: Mostrar APENAS para ADMIN
- Lista de usuários: User vê só ele, Admin vê todos

Por favor, ajuste o frontend seguindo essas especificações e me avise se encontrar algum erro!

---

