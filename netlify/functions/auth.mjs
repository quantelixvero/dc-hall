/**
 * Dhaka College International Hall - Serverless Auth Function
 * Validates student batch and admin master credentials securely on the server.
 */

import { createHash } from 'node:crypto';

const AUTH_MASTER_HASHES = [
  "0ebd02954b7d4ad2aeadcd54c036f39f3e1d1e7eb4f758f40ffa5b31c1b0560b" // Master Access Hash
];

const AUTH_BATCH_HASHES = {
  "hsc24": ["d496a2e9db529d3ac67e1dc0697518d51339141054ff8485d35a0e19ab5c35f6"],
  "hsc25": ["ec6740cda1b453b2c952acf97838c765376d940812a36c560c9a808ac30ac43b"],
  "hsc26": ["d134b0d9cb95ef83720ef627560b12f96421858c088c742cd0e8bfef7a4892df"],
  "hsc27": [
    "0ebd02954b7d4ad2aeadcd54c036f39f3e1d1e7eb4f758f40ffa5b31c1b0560b",
    "f741d0d217ebae0bd49b0fb8bfe3ba31076e27675da9b4de46f96195843dd482"
  ],
  "hsc28": ["b3edc7f3a7d6cb3432685305c8a05bf186651702e12facf678781155a05fcf45"],
  "hsc29": ["e69a6af334e6c1597a806c2c9a89d83da787d930b78bd131fe3d072a7c7e3000"],
  "hsc30": ["35f875a4cc31e3d08a175d8e71edc8f4837084a1188b41af35df3bd6fe072c6b"],
  "hsc31": ["787ba95b8a6046f48431f5615d835f4b58941df5334250b15abc1ada594873a0"],
  "hsc32": ["5eac08e76697da0d2754cd794cfc17091c8e77b6efa14815621dfb1c0fcdf340"],
  "hsc33": ["3024e70565c0433dd0a7607a18d5cff7143fa168527457bd78d6d270139ab81e"],
  "hsc34": ["dfae1bc51c1a98479e03469549c0b1c495e822c0235ef48c2ec22ba2ebe5edd9"],
  "hsc35": ["cfb35ac95fbbfb9c5955ece780d685660ac036306574c935b6f2a44b1281285c"]
};

export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await req.json();
    const secret = (body?.secret || '').trim();

    if (!secret) {
      return new Response(JSON.stringify({ authenticated: false, error: 'Empty password' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const hash = createHash('sha256').update(secret).digest('hex');

    if (AUTH_MASTER_HASHES.includes(hash)) {
      return new Response(JSON.stringify({ authenticated: true, role: 'master', hash }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    for (const [batchKey, hashes] of Object.entries(AUTH_BATCH_HASHES)) {
      if (hashes.includes(hash)) {
        return new Response(JSON.stringify({ authenticated: true, role: batchKey, hash }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response(JSON.stringify({ authenticated: false, error: 'Invalid credentials' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ authenticated: false, error: 'Server error processing request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
