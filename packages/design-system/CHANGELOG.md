# Changelog

All notable changes to the MicroShop Design System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-18

### Added

- Initial release of Design System
- MicroShop color palette (dark, blue, orange, yellow, link colors)
- Primary and secondary color variants
- Standard spacing scale (xs to 2xl)
- Spin-slow animation
- Centralized Tailwind config
- Design tokens for all MFEs

### Design Tokens

- `microshop-*`: Brand colors (dark, blue, orange, yellow, link)
- `primary-*`: Primary color variants
- `secondary-*`: Secondary color variants
- Spacing: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- Animation: `spin-slow`

### Usage

```javascript
// In your MFE's tailwind.config.js
module.exports = {
  presets: [require('@microshop/design-system/tailwind.config')],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
};
```
