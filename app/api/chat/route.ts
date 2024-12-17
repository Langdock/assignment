import { NextRequest, NextResponse } from 'next/server';
import { generateStream } from '@/app/actions/openai';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const stream = await generateStream(prompt);

    // Create a TransformStream to process the chunks
    const encoder = new TextEncoder();

    // Directly pipe the stream through the transformStream
    // Create a readable stream from the OpenAI stream
    const readableStream = new ReadableStream({
      async start(controller) {
        // Buffer to store the text chunks in chunks of 200 characters.
        // This is an artificial limitation to simulate the behavior of some of the LLM APIs. Do not change the behavior of the buffer.
        let buffer = '';
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || '';
          if (text) {
            buffer += text;
            // When buffer reaches 200 chars or we have remaining text at the end
            if (buffer.length >= 200) {
              controller.enqueue(encoder.encode(`data: ${buffer}\n\n`));
              buffer = '';
            }
          }
        }
        // Send any remaining text in buffer
        if (buffer.length > 0) {
          controller.enqueue(encoder.encode(`data: ${buffer}\n\n`));
        }
        controller.close();
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data from OpenAI' }, { status: 500 });
  }
}
