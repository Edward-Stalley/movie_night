import { getListenerClient } from '@/lib/realtime/pgListener';

export async function GET() {
  const client = await getListenerClient();

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      function send(event: string) {
        controller.enqueue(encoder.encode(`data: ${event}\n\n`));
      }

      const heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode(`:\n\n`));
      }, 25000);

      await client.query('LISTEN sessions_updated');

      client.on('notification', (msg) => {
        if (msg.channel === 'sessions_updated') {
          send('sessions-updated');
        }
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
