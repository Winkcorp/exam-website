export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url);
  const slug = url.searchParams.get('exam');
  const type = url.searchParams.get('type'); // 'paper' | 'solution'
  if (!slug || !['paper','solution'].includes(type))
    return new Response('Bad Request', { status: 400 });

  const key = `downloads:${slug}:${type}`;
  try {
    if (env.DL_KV.increment) {
      await env.DL_KV.increment(key, 1);
    } else {
      const v = Number(await env.DL_KV.get(key)) || 0;
      await env.DL_KV.put(key, String(v + 1));
    }
  } catch (e) {
    // swallow, but continue
  }

  const redirect = `/exams/${slug}/${type}.pdf`;
  return new Response(JSON.stringify({ redirect }), {
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
  });
};