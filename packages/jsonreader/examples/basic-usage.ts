import { jsonReader, jsonPathReader } from '../src/index';

/**
 * Example 1: Basic usage with fetch API
 */
async function basicExample() {
  console.log('Example 1: Basic usage with fetch API');
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.body) throw new Error('No response body');
    
    const reader = response.body.getReader();
    
    console.log('Processing JSON stream...');
    for await (const partialData of jsonReader(reader)) {
      console.log('Received partial data:', partialData);
    }
  } catch (error) {
    console.error('Error in basic example:', error);
  }
}

/**
 * Example 2: Using jsonPathReader to extract specific paths
 */
async function pathReaderExample() {
  console.log('\nExample 2: Using jsonPathReader to extract specific paths');
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.body) throw new Error('No response body');
    
    const reader = response.body.getReader();
    
    // Define paths we're interested in
    const paths = [
      '0.name',
      '0.email',
      '1.name',
      '1.email',
      '*.username'
    ];
    
    console.log('Extracting specific paths...');
    for await (const [value, path] of jsonPathReader(reader, paths)) {
      console.log(`Path "${path}" is now available:`, value);
    }
  } catch (error) {
    console.error('Error in path reader example:', error);
  }
}

/**
 * Example 3: Using options to control when data is yielded
 */
async function optionsExample() {
  console.log('\nExample 3: Using options to control when data is yielded');
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.body) throw new Error('No response body');
    
    const reader = response.body.getReader();
    
    console.log('Processing with options...');
    for await (const partialData of jsonReader(reader, {
      // Only yield when these properties are available
      required: ['0.id', '0.name'],
      
      // Don't include these properties in partial results
      silent: ['*.address', '*.company'],
      
      // Add these values to every yielded result
      assign: { 
        _source: 'jsonplaceholder',
        _timestamp: Date.now()
      }
    })) {
      console.log('Received filtered data:', partialData);
    }
  } catch (error) {
    console.error('Error in options example:', error);
  }
}

// Run the examples
async function runExamples() {
  await basicExample();
  await pathReaderExample();
  await optionsExample();
}

runExamples().catch(console.error); 