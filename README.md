# 🔔 Lit Sonner

An opinionated toast component for Lit applications, inspired by Sonner.

## Features

- ✨ Clean and modern design
- 🎯 Multiple toast types (success, error, warn, info, default)
- 📍 Configurable positioning (6 positions)
- 🎭 Smooth animations with automatic stacking
- 🏗️ Built with Lit web components
- 📦 Lightweight and dependency-free (except Lit)
- 🎨 Customizable styling

## Quick Start

### Installation

```bash
npm install lit-sonner
```

### Basic Usage

```javascript
import { toast } from 'lit-sonner';

// Basic toast
toast('Hello World!');

// Type-specific toasts
toast.success('Operation completed!');
toast.error('Something went wrong!');
toast.warn('Be careful!');
toast.info('New information available');
```

### Positioning

```javascript
// Set position for individual toasts
toast('Hello!', { position: 'top-left' });
toast.success('Success!', { position: 'bottom-center' });
```

Available positions:
- `top-left`
- `top-center` 
- `top-right` (default)
- `bottom-left`
- `bottom-center`
- `bottom-right`

## API Reference

### `toast(message, options)`

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `message` | `string` | - | The message to display |
| `options` | `object` | `{}` | Configuration options |

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | `'default' \| 'success' \| 'error' \| 'warn' \| 'info'` | `'default'` | Toast type |
| `position` | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'top-right'` | Toast position |

### Helper Methods

```javascript
// Convenience methods for different types
toast.success(message, options);
toast.error(message, options);
toast.warn(message, options);
toast.info(message, options);
```

## Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Demo

Open `demo/index.html` in your browser or run the development server to see the demo.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.