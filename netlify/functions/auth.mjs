/**
 * Dhaka College International Hall - Serverless Auth Function
 * Validates student batch and admin master credentials securely on the server.
 */

import { createHash } from 'node:crypto';

const AUTH_MASTER_HASHES = [];
const AUTH_BATCH_HASHES = {};

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
