# 🛍️ MicroShop - Estudo de Arquitetura Microfrontends

![CI](https://github.com/jonasmessias/microfrontend/actions/workflows/ci.yml/badge.svg)

> 📚 **Projeto de Estudo** - Este é um projeto educacional criado para aprender e demonstrar os conceitos fundamentais da arquitetura de microfrontends usando **Webpack Module Federation**.

## 🎯 Propósito

Este projeto foi desenvolvido como uma **jornada de aprendizado** para entender na prática como funciona a arquitetura de microfrontends. O objetivo é explorar:

- ✅ Como **Module Federation** permite compartilhar código em runtime
- ✅ Como múltiplas aplicações React podem ser **integradas dinamicamente**
- ✅ Como gerenciar **estado compartilhado** entre microfrontends
- ✅ Como implementar **comunicação entre MFEs** de forma desacoplada
- ✅ Quando usar (e quando NÃO usar) arquitetura de microfrontends

> ⚠️ **Nota**: Este é um projeto educacional/demonstrativo, não uma aplicação de produção. Foi criado para fins de aprendizado e compreensão dos padrões arquiteturais de microfrontends.

## 🏗️ Architecture

**Monorepo Structure** with independent microfrontends powered by **Turborepo**:

```
packages/
├── shell/              # Host application (port 3000)
├── mfe-products/       # Products catalog MFE (port 3001)
├── mfe-cart/           # Shopping cart MFE (port 3002)
└── design-system/      # Shared design tokens
```

### Module Federation com Webpack

Este projeto utiliza **Webpack Module Federation** (solução madura e estável) para compartilhar componentes entre microfrontends:

- **Shell (Host)**: Orquestra a aplicação, gerencia roteamento e carrega MFEs remotos dinamicamente
- **Products MFE**: Expõe catálogo de produtos e funcionalidade de busca
- **Cart MFE**: Expõe gerenciamento do carrinho e estado compartilhado (Zustand)
- **Deployment Independente**: Cada MFE pode ser implantado separadamente sem afetar os outros

**Por que Webpack e não Vite?** Durante este estudo, aprendi que plugins de Module Federation para Vite (como `@originjs/vite-plugin-federation`) ainda não são maduros para produção. Webpack 5 tem suporte nativo e estável para Module Federation desde 2020, sendo a escolha mais confiável para aprender os conceitos corretamente.

## 🚀 Stack Tecnológica

### Tecnologias Principais

- **React 18.3** - Framework UI com recursos de renderização concorrente
- **TypeScript 5.2** - Type safety e melhor experiência de desenvolvimento
- **Webpack 5.103** - Bundler com suporte nativo a Module Federation
- **npm Workspaces** - Gerenciamento de pacotes no monorepo
- **Turborepo** - Sistema de build de alta performance para monorepos

### Gerenciamento de Estado

- **Zustand 4.5** - State management leve compartilhado via Module Federation
- **CustomEvent API** - Comunicação nativa do browser entre MFEs

### Estilo

- **Tailwind CSS 3.4** - Framework CSS utility-first
- **Estratégia Shell-First** - Compilação centralizada do Tailwind
- **Design System** - Tokens compartilhados com versionamento SemVer

### Testes

- **Jest 30** - Framework de testes unitários
- **React Testing Library 16** - Testes de componentes
- **70% de cobertura** - Qualidade de código garantida

## ✨ Aprendizados de Arquitetura

### Conceitos Explorados Neste Projeto

✅ **Module Federation** - Compartilhamento de código em runtime e lazy loading  
✅ **Error Boundaries** - Isolamento de falhas por MFE  
✅ **Deployment Independente** - Cada MFE faz build e deploy separadamente  
✅ **Dependências Compartilhadas** - React/Zustand como singleton entre MFEs  
✅ **Comunicação Event-Driven** - Interações desacopladas entre MFEs

### Experiência de Desenvolvimento

✅ **TypeScript Modo Strict** - Type safety em todos os pacotes  
✅ **Configuração Centralizada** - `tsconfig.base.json` para consistência  
✅ **Hot Module Replacement** - Iteração rápida no desenvolvimento  
✅ **ESLint + Prettier** - Qualidade e formatação de código  
✅ **Testes Automatizados** - Jest com cobertura abrangente

### Quando Usar Microfrontends?

Durante este estudo, aprendi que microfrontends **NÃO** são para todos os casos:

#### ✅ Use quando:
- Múltiplos times trabalhando em features isoladas
- Necessidade de deploy independente de partes da aplicação
- Diferentes stacks/versões do framework por domínio
- Aplicação muito grande que precisa ser dividida

#### ❌ NÃO use quando:
- Time pequeno ou único time
- Aplicação simples/média (use monolito modular)
- Performance é crítica (overhead de Module Federation)
- Não há necessidade real de deploy independente

> 💡 **Lição Principal**: Microfrontends resolvem problemas de **organização de times e deployment**, não problemas técnicos. A complexidade adicional só vale a pena quando há benefícios organizacionais claros.

## 🛠️ Como Executar

### Pré-requisitos

- Node.js >= 16.0.0
- npm >= 8.0.0

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd microfrontend

# Instale todas as dependências
npm install
```

### Desenvolvimento

```bash
# Execute todos os microfrontends simultaneamente (via Turborepo)
npm run dev

# Ou execute individualmente
npm run dev:shell      # http://localhost:3000
npm run dev:products   # http://localhost:3001
npm run dev:cart       # http://localhost:3002
```

Abra http://localhost:3000 no navegador para ver a aplicação Shell carregando os microfrontends remotos.

### Testes

```bash
# Execute todos os testes
npm test

# Execute testes de um pacote específico
npm test --workspace=shell
npm test --workspace=mfe-products
npm test --workspace=mfe-cart

# Modo watch
npm run test:watch --workspace=shell

# Relatório de cobertura
npm run test:coverage --workspace=shell
```

### Build de Produção

```bash
# Build de todos os pacotes (com cache do Turborepo)
npm run build

# Build individual
npm run build:shell
npm run build:products
npm run build:cart

# Limpar artefatos de build
npm run clean
```

## 📦 Estrutura dos Pacotes

### Shell (Aplicação Host)

- **Porta**: 3000
- **Responsabilidade**: Shell da aplicação, navegação, orquestração do estado global
- **Expõe**: Nada (apenas host)
- **Consome**: `mfe-products/Products`, `mfe-cart/Cart`, `mfe-cart/cartStore`

### mfe-products (Catálogo de Produtos)

- **Porta**: 3001
- **Responsabilidade**: Listagem de produtos, busca, filtros
- **Expõe**: Componente `./Products`
- **Dependências**: Zustand para estado local

### mfe-cart (Carrinho de Compras)

- **Porta**: 3002
- **Responsabilidade**: Gerenciamento do carrinho, checkout
- **Expõe**: Componente `./Cart`, store `./cartStore` (Zustand)
- **Estado Compartilhado**: Store do carrinho acessível do Shell para contador de badge

### design-system

- **Propósito**: Design tokens centralizados e configuração do Tailwind
- **Versionamento**: SemVer para evolução segura
- **Tokens**: Cores, espaçamento, animações

## 🎨 Design System

O projeto utiliza um design system centralizado com configuração baseada em presets do Tailwind:

```javascript
// Cada MFE importa o preset base
presets: [require('../design-system/tailwind.config')];
```

**Design Tokens**:

- `microshop-dark`, `microshop-blue`, `microshop-orange` - Cores da marca
- `primary-*`, `secondary-*` - Cores de ação
- `xs` até `2xl` - Escala de espaçamento
- `spin-slow` - Animações customizadas

## 🔄 Padrões de Comunicação

### 1. Module Federation (Compartilhamento em Runtime)

```typescript
// Shell importa componente Products
const Products = lazy(() => import('mfeProducts/Products'));
```

### 2. Estado Compartilhado (Zustand)

```typescript
// Store do carrinho compartilhada entre Shell e Cart MFE
const cartStore = await import('mfeCart/cartStore');
```

### 3. EventBus (CustomEvents)

```typescript
// Products emite evento cart:add-item
EventBus.emit('cart:add-item', { product, quantity });

// Cart escuta e atualiza o estado
EventBus.on('cart:add-item', (data) => addItem(data));
```

## ⚡ Turborepo

Este monorepo usa **Turborepo** para orquestração inteligente de builds:

- **Cache inteligente**: Builds são cacheados e nunca re-executados desnecessariamente
- **Orquestração de tarefas**: Executa tarefas entre pacotes na ordem ideal
- **Execução paralela**: Executa tarefas independentes simultaneamente
- **Consciência de dependências**: Entende relacionamentos entre pacotes automaticamente

**Benefícios principais:**

- ⚡ **Builds 10x mais rápidos** com cache inteligente
- 🎯 **Executa apenas o que mudou** (detecção de pacotes afetados)
- 📦 **Pipeline de tarefas otimizado** (build → test → lint)
- 🔄 **Builds incrementais** para monorepos massivos

Configuração: [`turbo.json`](turbo.json)

## 📊 Estratégia de Testes

- **Testes Unitários**: Lógica de stores, funções utilitárias
- **Testes de Componentes**: Componentes UI com interações do usuário
- **Testes de Integração**: Comunicação via EventBus
- **Cobertura**: 70% de threshold para branches, funções e linhas

## 🚢 Deployment (Conceitual)

Cada microfrontend pode ser implantado independentemente:

1. **Products MFE** atualizado → Deploy apenas de `mfe-products`
2. **Cart MFE** atualizado → Deploy apenas de `mfe-cart`
3. **Shell** atualizado → Deploy do `shell` (puxa os remotes mais recentes)

Variáveis de ambiente controlam URLs remotas:

- Development: `localhost:300x`
- Production: Configurável via `.env.production`

> 💡 **Nota de Aprendizado**: Este projeto demonstra os conceitos de deployment independente, mas não inclui configuração real de CI/CD ou hospedagem, pois o foco é educacional.

## 📚 Recursos de Aprendizado

Durante o desenvolvimento deste projeto, os seguintes recursos foram úteis:

- [Webpack Module Federation Docs](https://webpack.js.org/concepts/module-federation/)
- [Micro Frontends - Martin Fowler](https://martinfowler.com/articles/micro-frontends.html)
- [Module Federation Examples](https://github.com/module-federation/module-federation-examples)

## 🤝 Boas Práticas Implementadas

1. **Responsabilidade Única**: Cada MFE possui um domínio de negócio
2. **Baixo Acoplamento**: Comunicação via eventos e estado compartilhado
3. **Deployment Independente**: Não requer deployments em cascata
4. **Type Safety**: Cobertura completa de TypeScript
5. **Isolamento de Erros**: ErrorBoundary por MFE
6. **Consistência de Design**: Design system centralizado
7. **Cobertura de Testes**: Testes unitários e de integração abrangentes

## 📝 Licença

MIT

---

**💡 Projeto desenvolvido para fins educacionais** - Criado para aprender e demonstrar os conceitos fundamentais da arquitetura de microfrontends com Webpack Module Federation.

Se você está estudando microfrontends, sinta-se livre para explorar o código, fazer fork e experimentar! 🚀
