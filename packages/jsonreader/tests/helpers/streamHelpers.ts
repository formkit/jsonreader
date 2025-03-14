/**
 * Read the stream one chunk at a time and reduce it to a single value.
 * @param reader - ReadableStreamDefaultReader<Uint8Array>
 * @param onChunk - The callback to use on each chunk
 */
export async function readStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onChunk?: (chunk: Uint8Array) => void
) {
  const { value, done } = await reader.read();
  if (value && onChunk) {
    onChunk(value);
  }
  if (!done) {
    await readStream(reader, onChunk);
  }
}

export function createStream(str: string) {
  const message = str.split('').map((char) => new TextEncoder().encode(char))
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const chunk of message) {
        controller.enqueue(chunk)
        await new Promise((resolve) => setTimeout(resolve, 10))
      }
      controller.close()
    },
  })
}

export function multiplexBuffer(buffer: Record<string, string>) {
  return (channelName: string, stream: ReadableStream<Uint8Array>): void => {
    buffer[channelName] = ''
    readStream(stream.getReader(), (chunk) => {
      buffer[channelName] += new TextDecoder().decode(chunk)
    })
  }
}