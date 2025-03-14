# jsonreader

A lightweight utility for reading and parsing JSON from streams in real-time, yielding progressively updated results as data arrives.

## Features

- 🚀 Progressive JSON parsing from streams
- 🔄 Async generators for real-time processing
- 🔍 Extract specific properties as soon as they're available
- 🌳 Path-based filtering with wildcards
- 📖 TypeScript support
- 📦 ESM-only package

## License

**Dual License:**
- **Personal Use**: 100% free for personal projects, open source contributions, and learning.
- **Commercial Use**: $10 per project for commercial applications. [Purchase a license](https://buy.stripe.com/14k7uU7jqc7x4jmdQS).

Each commercial project requires a separate license. See the [documentation](https://jsonreader.dev) for more details.

## Installation

```bash
# npm
npm install jsonreader

# yarn
yarn add jsonreader

# pnpm
pnpm add jsonreader
```

## Basic Usage

```typescript
import { jsonReader } from 'jsonreader';

// Example with a fetch request
const response = await fetch('https://api.example.com/large-data.json');
if (!response.body) throw new Error('No response body');

const reader = response.body.getReader();

// Process JSON as it streams in, getting progressive updates
for await (const partialData of jsonReader(reader)) {
  console.log('Partial data available:', partialData);
  // This will yield multiple times as more data becomes available
  // Each yield contains a more complete version of the JSON
}
```

## Advanced Usage

### Getting Specific Properties as Soon as They're Available

```typescript
import { jsonPathReader } from 'jsonreader';

const response = await fetch('https://api.example.com/large-data.json');
if (!response.body) throw new Error('No response body');

const reader = response.body.getReader();

// Define paths you want to extract as soon as they're complete
const paths = ['user.name', 'user.email', 'metadata.version'];

// Get values as soon as each path is completely read
for await (const [value, path] of jsonPathReader(reader, paths)) {
  console.log(`Path ${path} is now available:`, value);
  
  // You can take immediate action on specific properties
  if (path === 'user.name') {
    updateUserInterface(value);
  }
}
```

### Controlling When Data is Yielded

```typescript
import { jsonReader } from 'jsonreader';

const response = await fetch('https://api.example.com/large-data.json');
if (!response.body) throw new Error('No response body');

const reader = response.body.getReader();

// Configure options for the reader
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
```

## API Reference

### `jsonReader(reader, options?)`

An async generator function that reads a JSON stream as it arrives and yields progressively updated results until the stream is complete.

#### Parameters:

- `reader` (ReadableStreamDefaultReader<Uint8Array>): The reader to read from
- `options` (object, optional): Configuration options
  - `required` (string[], optional): Dot-notation paths that must be complete before yielding any results
  - `silent` (string[], optional): Dot-notation paths to exclude from partial results (can use * as wildcard)
  - `assign` (Record<string, any>, optional): Values to assign to every yielded result

#### Returns:

An async generator yielding progressively more complete JSON objects as data arrives

### `jsonPathReader(reader, paths)`

Reads a JSON stream and only yields values at the specified paths when they are complete.

#### Parameters:

- `reader` (ReadableStreamDefaultReader<Uint8Array>): The reader to read from
- `paths` (string[]): An array of dot-notation paths to monitor (can use * as wildcard)

#### Returns:

An async generator yielding tuples of `[value, path]` as each monitored path becomes complete

### Path Syntax

Paths use dot notation to refer to nested properties:

- `user.profile.name`: References the name property in a nested object
- `items.0.id`: References the id of the first element in the items array
- `data.*.value`: Uses wildcard (*) to match any property at that position

## Use Cases

- Processing large JSON API responses without waiting for the entire payload
- Updating UI elements as soon as relevant data is available
- Streaming large data files while providing real-time feedback
- Progressive rendering of complex data structures
- Implementing type-ahead search with real-time results

## Example: Real-time UI Updates During File Upload

```typescript
import { jsonPathReader } from 'jsonreader';

async function processFileUpload(fileUploadResponse) {
  const reader = fileUploadResponse.body.getReader();
  
  // Define important paths to monitor
  const paths = [
    'progress.percentage',
    'progress.bytesUploaded',
    'status',
    'preview_url'
  ];
  
  // Update UI as each piece of information becomes available
  for await (const [value, path] of jsonPathReader(reader, paths)) {
    switch (path) {
      case 'progress.percentage':
        updateProgressBar(value);
        break;
      case 'status':
        updateStatusMessage(value);
        break;
      case 'preview_url':
        displayPreview(value);
        break;
    }
  }
}
```

## How It Works

The `jsonreader` utility parses JSON data character by character as it arrives from a stream. It builds up a syntactically valid JSON structure as data comes in, closing any unclosed objects or arrays to create valid partial representations.

For each chunk of data received:

1. The stream is decoded from Uint8Array to text
2. The JSON structure is analyzed character by character
3. Property paths are tracked as the parser encounters them
4. When all required properties are available, a partial result is yielded
5. Silent properties are excluded from partial results
6. The process continues until the stream is complete

This approach allows for real-time processing of JSON data without waiting for the entire payload to be received. 