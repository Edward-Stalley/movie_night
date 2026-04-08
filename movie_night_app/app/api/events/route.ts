// api/events/route.ts
import { getListenerClient } from '@/lib/realtime/pgListener';

export async function GET() {
  // Only require at runtime
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    console.log('SSE route running at runtime');
  }

  const client = await getListenerClient();

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      function send(event: string, data?: string) {
        try {
          if (data) controller.enqueue(encoder.encode(`event: ${event}\ndata: ${data}\n\n`));
          else controller.enqueue(encoder.encode(`event: ${event}\n\n`));
        } catch {}
      }

      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`:\n\n`));
        } catch {
          clearInterval(heartbeat);
        }
      }, 25000);

      // Wrap LISTEN calls in try/catch to prevent build-time errors
      try {
        await client.query('LISTEN sessions_updated');
        await client.query('LISTEN votes_updated');
      } catch (err) {
        console.warn('Postgres LISTEN failed:', err);
      }

      client.on('notification', (msg) => {
        try {
          if (msg.channel === 'sessions_updated') send('sessions-updated', msg.payload);
          if (msg.channel === 'votes_updated') send('votes-updated', msg.payload);
        } catch {}
      });

      return () => clearInterval(heartbeat);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
