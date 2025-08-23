// Genera el code_challenge a partir del code_verifier para OAuth PKCE (Mercado Pago)
// Ejecuta este archivo con Node.js
const crypto = require('crypto');

function base64urlEncode(str) {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function generateCodeChallenge(codeVerifier) {
  const hash = crypto.createHash('sha256').update(codeVerifier).digest('base64');
  return base64urlEncode(hash);
}

const codeVerifier = 'C224.OS_15Pv8M~kZZd3f2mvOTBo-oPbyjrfb6-~XkfIYgQzJzZuuD1B-OEbqBJZ'; // Pega aquí tu code_verifier
console.log('code_challenge:', generateCodeChallenge(codeVerifier));
