# jsonreader Examples

[![Tests](https://github.com/formkit/jsonreader/actions/workflows/tests.yml/badge.svg)](https://github.com/formkit/jsonreader/actions/workflows/tests.yml)

This directory contains examples demonstrating how to use the `jsonreader` package for streaming JSON processing.

## Running the Examples

To run these examples, you need to have Node.js installed (version 18 or later).

First, build the package:

```bash
# From the monorepo root
pnpm build

# Or from the jsonreader package directory
cd packages/jsonreader
pnpm build
```

Then run an example using:

```bash
# Using ts-node (install with npm install -g ts-node if needed)
ts-node examples/basic-usage.ts

# Or with Node.js directly (after building)
node examples/basic-usage.js
```

## Available Examples

1. **Basic Usage** (`basic-usage.ts`)
   - Demonstrates the fundamental usage patterns of jsonreader
   - Shows how to use `jsonReader` with fetch API
   - Shows how to use `jsonPathReader` to extract specific paths
   - Shows how to use options to control when data is yielded

2. **Advanced Usage** (`advanced-usage.ts`)
   - Demonstrates more complex scenarios for streaming JSON processing
   - Shows processing a paginated API with streaming
   - Shows progressive UI updates as data becomes available
   - Shows combining with other stream processing techniques

## Example Code Structure

Each example file is structured to demonstrate specific features of the `jsonreader` package:

- **Import**: Import the necessary functions from the package
- **Setup**: Create a ReadableStream or obtain one from an API
- **Processing**: Use `jsonReader` or `jsonPathReader` to process the stream
- **Handling Results**: Demonstrate handling the yielded results in real-time

## Network Requirements

These examples make requests to the JSONPlaceholder API (https://jsonplaceholder.typicode.com/), which is a free online REST API for testing. You will need an internet connection to run these examples successfully.

## Additional Resources

For more details about the API and usage patterns, check the main documentation:

- [Getting Started Guide](../../../docs/content/docs/getting-started.md)
- [API Reference](../../../docs/content/docs/api-reference.md)
- [Advanced Examples](../../../docs/content/docs/examples.md) 