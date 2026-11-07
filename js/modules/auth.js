/**
 * Dhaka College International Hall - Authentication & Hash Verification
 * Module: js/modules/auth.js
 */

// Cryptographic SHA-256 Hash Digest Engine (zero dependencies)
function computeSha256(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }
  var mathPow = Math.pow;
  var maxWord = mathPow(2, 32);
  var lengthProperty = 'length';
  var i, j;
  var result = '';
  var words = [];
  var asciiBitLength = ascii[lengthProperty] * 8;
  var hash = [];
  var k = [];
  var primeCounter = 0;
  var isComposite = {};
  for (var candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1/3) * maxWord) | 0;
    }
  }
  ascii += '\x80';
  while (ascii[lengthProperty] % 64 - 56) ascii += '\x00';
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return '';
    words[i >> 2] |= j << ((3 - i) % 4) * 8;
  }
  words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
  words[words[lengthProperty]] = (asciiBitLength) | 0;
  for (j = 0; j < words[lengthProperty];) {
    var w = words.slice(j, j += 16);
    var oldHash = hash;
    hash = hash.slice(0, 8);
    for (i = 0; i < 64; i++) {
      var w15 = w[i - 15], w2 = w[i - 2];
      var a = hash[0], e = hash[4];
      var temp1 = hash[7]
        + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
        + ((e & hash[5]) ^ ((~e) & hash[6]))
        + k[i]
        + (w[i] = (i < 16) ? w[i] : (
            w[i - 16]
            + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
            + w[i - 7]
            + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
          ) | 0
        );
      var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
        + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }
    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }
  for (i = 0; i < 8; i++) {
    for (var b = 3; b >= 0; b--) {
      var byteVal = (hash[i] >> (8 * b)) & 255;
      result += (byteVal < 16 ? '0' : '') + byteVal.toString(16);
    }
  }
  return result;
}

// Precomputed one-way SHA-256 hashes (never exposes plaintext credentials)
const AUTH_MASTER_HASHES = [
  "0ebd02954b7d4ad2aeadcd54c036f39f3e1d1e7eb4f758f40ffa5b31c1b0560b" // Master Access Hash
];

const AUTH_BATCH_HASHES = {
  "hsc24": ["d496a2e9db529d3ac67e1dc0697518d51339141054ff8485d35a0e19ab5c35f6"],
  "hsc25": ["ec6740cda1b453b2c952acf97838c765376d940812a36c560c9a808ac30ac43b"],
  "hsc26": ["d134b0d9cb95ef83720ef627560b12f96421858c088c742cd0e8bfef7a4892df"],
  "hsc27": [
    "0ebd02954b7d4ad2aeadcd54c036f39f3e1d1e7eb4f758f40ffa5b31c1b0560b", // Founder Batch Key
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

function verifyAuthSecret(secret) {
  if (!secret) return null;
  const hash = computeSha256(String(secret).trim());
  if (AUTH_MASTER_HASHES.includes(hash)) return "master";
  for (const [bKey, hashes] of Object.entries(AUTH_BATCH_HASHES)) {
    if (hashes.includes(hash)) return bKey;
  }
  return null;
}
