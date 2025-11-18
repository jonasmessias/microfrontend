# 🛍️ MicroShop - Microfrontend E-commerce

![CI](https://github.com/jonasmessias/microfrontend/actions/workflows/ci.yml/badge.svg)

A modern e-commerce platform built with **Microfrontend Architecture** using Webpack Module Federation, demonstrating scalable and independent deployment strategies.

> 🎯 **Portfolio Project** - Showcasing advanced frontend architecture patterns for large-scale React applications.

## 🎯 Purpose

This project showcases advanced frontend architecture patterns for building large-scale applications where multiple teams can work independently on different features while maintaining a cohesive user experience.

## 🏗️ Architecture

**Monorepo Structure** with independent microfrontends powered by **Turborepo**:

```
packages/
├── shell/              # Host application (port 3000)
├── mfe-products/       # Products catalog MFE (port 3001)
├── mfe-cart/           # Shopping cart MFE (port 3002)
└── design-system/      # Shared design tokens
```

### Module Federation Strategy

- **Shell (Host)**: Orchestrates the application, manages routing, and loads remote MFEs dynamically
- **Products MFE**: Exposes product catalog and search functionality
- **Cart MFE**: Exposes cart state management and checkout features
- **Independent Deployment**: Each MFE can be deployed separately without affecting others

## 🚀 Tech Stack

### Core Technologies

- **React 18.3** - UI framework with concurrent features
- **TypeScript 5.2** - Type safety and better DX
- **Webpack 5** - Module Federation for runtime integration
- **npm Workspaces** - Monorepo package management
- **Turborepo** - High-performance build system for monorepos

### State Management

- **Zustand 4.4** - Lightweight state management shared via Module Federation
- **CustomEvent API** - Browser-native communication between MFEs

### Styling

- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Shell-First Strategy** - Centralized Tailwind compilation
- **Design System** - Shared tokens with SemVer versioning

### Testing

- **Jest** - Unit testing framework
- **React Testing Library** - Component testing
- **70% coverage threshold** - Enforced code quality

## ✨ Key Features

### Architecture Patterns

✅ **Module Federation** - Runtime code sharing and lazy loading  
✅ **Error Boundaries** - Isolated failure handling per MFE  
✅ **Independent Deployment** - Each MFE builds and deploys separately  
✅ **Shared Dependencies** - React/Zustand as singleton across MFEs  
✅ **Event-Driven Communication** - Decoupled MFE interactions

### Developer Experience

✅ **TypeScript Strict Mode** - Type safety across all packages  
✅ **Centralized Config** - `tsconfig.base.json` for consistency  
✅ **Hot Module Replacement** - Fast development iteration  
✅ **ESLint + Prettier** - Code quality and formatting  
✅ **Automated Tests** - Jest with comprehensive coverage

### Production Ready

✅ **Environment Variables** - Separate dev/production configs  
✅ **Design System Versioning** - Safe design token evolution  
✅ **Error Monitoring Ready** - Integration points for Sentry/Datadog  
✅ **Performance Optimized** - Code splitting and lazy loading

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd microfrontend

# Install all dependencies
npm install
```

### Development

```bash
# Run all microfrontends concurrently (powered by Turborepo)
npm run dev

# Or run individually
npm run dev:shell      # http://localhost:3000
npm run dev:products   # http://localhost:3001
npm run dev:cart       # http://localhost:3002
```

### Testing

```bash
# Run all tests
npm test

# Run tests for specific package
npm test --workspace=shell
npm test --workspace=mfe-products
npm test --workspace=mfe-cart

# Watch mode
npm run test:watch --workspace=shell

# Coverage report
npm run test:coverage --workspace=shell
```

### Production Build

```bash
# Build all packages (with Turborepo caching)
npm run build

# Build individually
npm run build:shell
npm run build:products
npm run build:cart

# Clean build artifacts
npm run clean
```

## 📦 Package Structure

### Shell (Host Application)

- **Port**: 3000
- **Responsibility**: Application shell, navigation, global state orchestration
- **Exposes**: Nothing (pure host)
- **Consumes**: `mfe-products/Products`, `mfe-cart/Cart`, `mfe-cart/cartStore`

### mfe-products (Products Catalog)

- **Port**: 3001
- **Responsibility**: Product listing, search, filters
- **Exposes**: `./Products` component
- **Dependencies**: Zustand for local state

### mfe-cart (Shopping Cart)

- **Port**: 3002
- **Responsibility**: Cart management, checkout
- **Exposes**: `./Cart` component, `./cartStore` (Zustand store)
- **Shared State**: Cart store accessible from Shell for badge counter

### design-system

- **Purpose**: Centralized design tokens and Tailwind configuration
- **Versioning**: SemVer for safe evolution
- **Tokens**: Colors, spacing, animations

## 🎨 Design System

The project uses a centralized design system with preset-based Tailwind configuration:

```javascript
// Each MFE imports the base preset
presets: [require('../design-system/tailwind.config')];
```

**Design Tokens**:

- `microshop-dark`, `microshop-blue`, `microshop-orange` - Brand colors
- `primary-*`, `secondary-*` - Action colors
- `xs` to `2xl` - Spacing scale
- `spin-slow` - Custom animations

## 🔄 Communication Patterns

### 1. Module Federation (Runtime Sharing)

```typescript
// Shell imports Products component
const Products = lazy(() => import('mfeProducts/Products'));
```

### 2. Shared State (Zustand)

```typescript
// Cart store shared across Shell and Cart MFE
const cartStore = await import('mfeCart/cartStore');
```

### 3. EventBus (CustomEvents)

```typescript
// Products emits cart:add-item event
EventBus.emit('cart:add-item', { product, quantity });

// Cart listens and updates state
EventBus.on('cart:add-item', (data) => addItem(data));
```

## ⚡ Turborepo

This monorepo uses **Turborepo** for intelligent build orchestration:

- **Intelligent caching**: Builds are cached and never re-executed unnecessarily
- **Task orchestration**: Runs tasks across packages in optimal order
- **Parallel execution**: Executes independent tasks simultaneously
- **Dependency awareness**: Understands package relationships automatically

**Key benefits:**

- ⚡ **10x faster builds** with intelligent caching
- 🎯 **Runs only what changed** (affected packages detection)
- 📦 **Optimized task pipeline** (build → test → lint)
- 🔄 **Incremental builds** for massive monorepos

Configuration: [`turbo.json`](turbo.json)

## 📊 Testing Strategy

- **Unit Tests**: Store logic, utility functions
- **Component Tests**: UI components with user interactions
- **Integration Tests**: EventBus communication
- **Coverage**: 70% threshold for branches, functions, lines

## 🚢 Deployment

Each microfrontend can be deployed independently:

1. **Products MFE** updates → Deploy only `mfe-products`
2. **Cart MFE** updates → Deploy only `mfe-cart`
3. **Shell** updates → Deploy `shell` (pulls latest remotes)

Environment variables control remote URLs:

- Development: `localhost:300x`
- Production: Configurable via `.env.production`

## 🤝 Best Practices Implemented

1. **Single Responsibility**: Each MFE owns one business domain
2. **Loose Coupling**: Communication via events and shared state
3. **Independent Deployment**: No cascade deployments required
4. **Type Safety**: Full TypeScript coverage
5. **Error Isolation**: ErrorBoundary per MFE
6. **Design Consistency**: Centralized design system
7. **Test Coverage**: Comprehensive unit and integration tests

## 📝 License

MIT

---

Built with ❤️ for demonstrating modern microfrontend architecture patterns.
