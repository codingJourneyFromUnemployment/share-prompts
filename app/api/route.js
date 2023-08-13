export function GET(request) {
  const prompt = "hello world"
  return new Response(JSON.stringify(prompt), {
    headers: { 'content-type': 'application/json' },
  });
}