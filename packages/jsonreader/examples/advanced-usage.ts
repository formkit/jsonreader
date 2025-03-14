import { jsonReader, jsonPathReader, read } from '../src/index';

/**
 * Example 1: Processing a large paginated API response with streaming
 */
async function paginatedApiExample() {
  console.log('Example 1: Processing a large paginated API with streaming');
  
  const allUsers: any[] = [];
  
  try {
    // Simulate processing multiple pages
    for (let page = 1; page <= 3; page++) {
      console.log(`\nFetching page ${page}...`);
      
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=3`);
      if (!response.body) throw new Error('No response body');
      
      const reader = response.body.getReader();
      
      // Process each page as it streams in
      for await (const partialData of jsonReader(reader)) {
        console.log(`Page ${page} - Partial users received:`, partialData.length);
        
        // Process items as they become available
        for (const user of partialData) {
          if (user.id && !allUsers.some(u => u.id === user.id)) {
            // Process the user immediately
            console.log(`Processing user ${user.id}: ${user.name}`);
            
            // Add to our collection
            allUsers.push(user);
          }
        }
      }
    }
    
    console.log(`\nTotal users processed: ${allUsers.length}`);
  } catch (error) {
    console.error('Error in paginated API example:', error);
  }
}

/**
 * Example 2: Progressive UI updates with path-specific extraction
 */
async function progressiveUIExample() {
  console.log('\nExample 2: Progressive UI updates with path-specific extraction');
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    if (!response.body) throw new Error('No response body');
    
    const reader = response.body.getReader();
    
    // Define paths in order of UI priority
    const paths = [
      'name',        // Update user name immediately
      'email',       // Then update email
      'phone',       // Then update phone
      'address.city', // Then update city
      'company.name'  // Finally company info
    ];
    
    console.log('Building UI progressively...');
    console.log('UI starting with loading state for all fields...\n');
    
    const ui = {
      name: 'Loading...',
      email: 'Loading...',
      phone: 'Loading...',
      address: {
        city: 'Loading...'
      },
      company: {
        name: 'Loading...'
      }
    };
    
    // Simulate UI updates as data becomes available
    for await (const [value, path] of jsonPathReader(reader, paths)) {
      // Update our UI model
      updateNestedProperty(ui, path, value);
      
      // Log the current state of the UI
      console.log(`UI Update (${path} became available):`);
      console.log(JSON.stringify(ui, null, 2));
      console.log(); // Empty line for readability
      
      // In a real app, you would update the DOM here
      // e.g., document.getElementById(path).textContent = value;
    }
    
    console.log('UI fully loaded!');
  } catch (error) {
    console.error('Error in progressive UI example:', error);
  }
}

/**
 * Example 3: Combining with other stream processing techniques
 */
async function streamProcessingExample() {
  console.log('\nExample 3: Combining with other stream processing techniques');
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=10');
    if (!response.body) throw new Error('No response body');
    
    const reader = response.body.getReader();
    
    console.log('Processing raw chunks first, then JSON:');
    
    // Set up a simple pipeline
    // 1. Read raw chunks and log their size
    // 2. Pass them through to a JSON processor
    
    // Create a transform stream for processing
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const newReader = readable.getReader();
    
    // Step 1: Process raw chunks
    (async () => {
      let totalBytes = 0;
      let chunkCount = 0;
      
      for await (const chunk of read(reader)) {
        chunkCount++;
        totalBytes += chunk.byteLength;
        
        console.log(`Chunk ${chunkCount}: ${chunk.byteLength} bytes`);
        
        // Pass the chunk through to the next stage
        await writer.write(chunk);
      }
      
      console.log(`\nTotal: ${chunkCount} chunks, ${totalBytes} bytes`);
      writer.close();
    })();
    
    // Step 2: Process as JSON
    let commentCount = 0;
    let emailCount = 0;
    
    // Process specific paths from the comments
    for await (const [value, path] of jsonPathReader(newReader, ['*.email'])) {
      emailCount++;
      console.log(`Email ${emailCount}: ${value}`);
    }
    
    console.log(`Processed ${emailCount} email addresses`);
  } catch (error) {
    console.error('Error in stream processing example:', error);
  }
}

// Helper function to update a nested property based on a path
function updateNestedProperty(obj: any, path: string, value: any) {
  const segments = path.split('.');
  let current = obj;
  
  // Navigate to the parent object
  for (let i = 0; i < segments.length - 1; i++) {
    const segment = segments[i];
    if (!current[segment]) {
      current[segment] = {};
    }
    current = current[segment];
  }
  
  // Set the value
  const lastSegment = segments[segments.length - 1];
  current[lastSegment] = value;
}

// Run the examples
async function runAdvancedExamples() {
  await paginatedApiExample();
  await progressiveUIExample();
  await streamProcessingExample();
}

runAdvancedExamples().catch(console.error); 