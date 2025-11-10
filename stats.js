export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url);
  const slug = url.searchParams.get('exam');
  if (!slug) return new Response('Bad Request', { status: 400 });

  const getN = async (k) => Number(await env.DL_KV.get(k)) || 0;

  const paper = await getN(`downloads:${slug}:paper`);
  const solution = await getN(`downloads:${slug}:solution`);

  return new Response(JSON.stringify({ paper, solution }), {
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
  });
};