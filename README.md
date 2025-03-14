# jsonreader monorepo

[![Tests](https://github.com/formkit/jsonreader/actions/workflows/tests.yml/badge.svg)](https://github.com/formkit/jsonreader/actions/workflows/tests.yml)

This is a monorepo for the `@formkit/jsonreader` package and its documentation site.

## About jsonreader

`@formkit/jsonreader` is a specialized utility for processing JSON data from streams in real-time. Unlike traditional JSON parsers that require the entire payload before processing, `@formkit/jsonreader` allows you to:

- Process JSON progressively as it arrives from a stream
- Extract specific properties as soon as they become available
- Update UI elements in real-time without waiting for the complete response
- Handle large JSON payloads efficiently by processing them incrementally

## License

**Dual License:**
- **Personal Use**: 100% free for personal projects, open source contributions, and learning.
- **Commercial Use**: $10 per project for commercial applications. [Purchase a license](https://buy.stripe.com/14k7uU7jqc7x4jmdQS).

Each commercial project requires a separate license. See the [documentation](https://jsonreader.dev) for more details.

## Repository Structure

- `packages/jsonreader`: The ESM package for streaming JSON processing
- `packages/docs`: Documentation site powered by Nuxt 3

## Key Features

- 🚀 **Progressive JSON Parsing**: Process JSON data character-by-character as it streams in
- 🔍 **Path-Based Extraction**: Get specific values as soon as their paths are complete
- 🌳 **Selective Processing**: Configure which properties to wait for and which to exclude
- 🔄 **Async Generator API**: Modern, clean API using async iterators and generators
- 📦 **ESM-ready**: Built for modern JavaScript environments

## Quick Start

```typescript
import { jsonReader, jsonPathReader } from '@formkit/jsonreader';

// Get a stream reader (e.g. from fetch API)
const response = await fetch('https://api.example.com/large-data.json');
const reader = response.body.getReader();

// Method 1: Process JSON as it arrives
for await (const partialData of jsonReader(reader, {
  // Don't yield until these properties are available
  required: ['user.id', 'metadata.timestamp'],
  
  // Don't include these properties in partial results
  silent: ['large_payload', 'image_data', 'items.*.details'],
  
  // Add these values to every yielded result
  assign: { source: 'api', processed: true }
})) {
  console.log('Partial data:', partialData);
}

// Method 2: Extract specific paths as they become available
const paths = ['user.name', 'metadata.version', 'items.*.id'];
for await (const [value, path] of jsonPathReader(reader, paths)) {
  console.log(`Path ${path} is available:`, value);
  
  // Take immediate action on specific values
  if (path === 'user.name') {
    updateUsername(value);
  }
}
```

## Development

This project uses pnpm workspaces for package management.

### Setup

```bash
# Install dependencies
pnpm install
```

### Development Commands

```bash
# Build all packages
pnpm build

# Start the documentation site dev server
pnpm dev:docs

# Watch mode for jsonreader package
pnpm dev:jsonreader

# Run tests
pnpm test
```

## Use Cases

- **Real-time Data Visualization**: Update charts and graphs as data streams in
- **Progressive UI Loading**: Show critical UI elements as soon as their data is available
- **Large API Responses**: Process multi-megabyte JSON responses without waiting for completion
- **Streaming APIs**: Handle JSON streams from WebSockets or Server-Sent Events
- **Optimistic UI Updates**: Implement progressive enhancement for improved UX

## Documentation

The documentation site provides comprehensive guides and API references:

```bash
# Run the documentation site locally
pnpm dev:docs
```

See the [jsonreader README](./packages/jsonreader/README.md) for detailed API documentation. 