# @microshop/design-system

Design System compartilhado para todos os microfrontends do MicroShop.

## 📦 Instalação

```bash
# No workspace raiz (já está configurado)
npm install
```

## 🎨 Uso

### Em cada MFE (Shell, Products, Cart):

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@microshop/design-system/tailwind.config')],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
};
```

## 🎨 Design Tokens

### Cores MicroShop

```jsx
// Cores principais da marca
bg - microshop - dark; // #131921 - Header/Footer
bg - microshop - blue; // #232f3e - Navbar
bg - microshop - orange; // #ff9900 - Accent
bg - microshop - yellow; // #febd69 - Busca

// Cores de ação
bg - microshop - yellow - bright; // #ffd814 - Botões principais
hover: bg - microshop - yellow - bright - hover; // #f7ca00

// Links
text - microshop - link; // #007185
hover: text - microshop - link - hover; // #c7511f
```

### Espaçamentos

```jsx
p-xs    // 0.25rem (4px)
p-sm    // 0.5rem (8px)
p-md    // 1rem (16px)
p-lg    // 1.5rem (24px)
p-xl    // 2rem (32px)
p-2xl   // 3rem (48px)
```

### Animações

```jsx
animate - spin - slow; // Spin mais lento (1.5s)
```

## 🔄 Versionamento

Este Design System segue [Semantic Versioning](https://semver.org/):

- **MAJOR** (2.0.0): Mudanças que quebram compatibilidade (mudar cores existentes)
- **MINOR** (1.1.0): Adicionar novas features (novas cores, sem quebrar)
- **PATCH** (1.0.1): Bugfixes e ajustes menores

## 📝 Como Fazer Mudanças

### ✅ Mudanças Seguras (Minor):

```javascript
// tokens.js
colors: {
  microshop: {
    // ... cores existentes
    'orange-light': '#ffad33',  // ✅ Adicionar nova cor
  }
}
```

### ⚠️ Mudanças Breaking (Major):

```javascript
// tokens.js
colors: {
  microshop: {
    dark: '#0f1419',  // ⚠️ Mudar cor existente
  }
}
// Incrementar versão: 1.0.0 → 2.0.0
```

## 🚀 Workflow

1. **Editar tokens**: `packages/design-system/tokens.js`
2. **Atualizar versão**: `packages/design-system/package.json`
3. **Documentar mudança**: `packages/design-system/CHANGELOG.md`
4. **Reinstalar**: `npm install` (workspace auto-atualiza)
5. **Testar**: Verificar em todos os MFEs

## 📚 Estrutura

```
design-system/
├── package.json           # Versionamento
├── tokens.js              # Design tokens centralizados
├── tailwind.config.js     # Configuração base do Tailwind
├── CHANGELOG.md           # Histórico de mudanças
└── README.md              # Documentação
```

## 🎯 Benefícios

- ✅ **Consistência**: Todas as cores/espaçamentos em um lugar
- ✅ **Manutenibilidade**: Mudar uma vez, aplica em todos os MFEs
- ✅ **Versionamento**: Controle de mudanças com SemVer
- ✅ **Independência**: Cada MFE pode escolher quando atualizar
- ✅ **Documentação**: CHANGELOG rastreia todas as mudanças

## 📖 Exemplos

### Botão Primário

```jsx
<button
  className="bg-microshop-yellow-bright hover:bg-microshop-yellow-bright-hover 
                   px-md py-sm rounded-lg"
>
  Adicionar ao Carrinho
</button>
```

### Card com Cores da Marca

```jsx
<div className="bg-white border border-gray-200 p-md rounded-lg">
  <h3 className="text-microshop-link hover:text-microshop-link-hover">Produto</h3>
</div>
```

---

**Versão**: 1.0.0  
**Última Atualização**: 18/11/2025
