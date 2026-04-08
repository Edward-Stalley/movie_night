import { getListenerClient } from '@/lib/realtime/pgListener';

export async function GET() {
  const client = await getListenerClient();

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      function send(event: string, data?: string) {
        try {
          if (data) {
            controller.enqueue(encoder.encode(`event: ${event}\ndata: ${data}\n\n`));
          } else {
            controller.enqueue(encoder.encode(`event: ${event}\n\n`));
          }
        } catch {
          // Controller is closed
        }
      }
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`:\n\n`));
        } catch {
          clearInterval(heartbeat);
        }
      }, 25000);

      await client.query('LISTEN sessions_updated');
      await client.query('LISTEN votes_updated');

      client.on('notification', (msg) => {
        if (msg.channel === 'sessions_updated') send('sessions-updated');
        if (msg.channel === 'votes_updated') send('votes-updated', msg.payload);
      });

      return () => {
        clearInterval(heartbeat);
      };
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
