// One-time script to encrypt novel content
// Usage: node scripts/encrypt-novel.mjs "your-password"
import { webcrypto } from 'node:crypto';
globalThis.crypto = webcrypto;

const SALT = 'novel-salt-2026';
const ITERATIONS = 100000;

async function deriveKey(password) {
	const encoder = new TextEncoder();
	const keyMaterial = await crypto.subtle.importKey(
		'raw',
		encoder.encode(password),
		'PBKDF2',
		false,
		['deriveKey']
	);
	return crypto.subtle.deriveKey(
		{
			name: 'PBKDF2',
			salt: encoder.encode(SALT),
			iterations: ITERATIONS,
			hash: 'SHA-256',
		},
		keyMaterial,
		{ name: 'AES-GCM', length: 256 },
		false,
		['encrypt', 'decrypt']
	);
}

async function encrypt(plaintext, password) {
	const key = await deriveKey(password);
	const encoder = new TextEncoder();
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const ciphertext = await crypto.subtle.encrypt(
		{ name: 'AES-GCM', iv },
		key,
		encoder.encode(plaintext)
	);
	const combined = new Uint8Array(iv.length + new Uint8Array(ciphertext).length);
	combined.set(iv);
	combined.set(new Uint8Array(ciphertext), iv.length);
	return Buffer.from(combined).toString('base64');
}

async function hashPassword(password) {
	const encoder = new TextEncoder();
	const data = encoder.encode(password);
	const hash = await crypto.subtle.digest('SHA-256', data);
	return Array.from(new Uint8Array(hash))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
}

const password = process.argv[2];
if (!password) {
	console.error('Usage: node scripts/encrypt-novel.mjs "your-password"');
	process.exit(1);
}

const hash = await hashPassword(password);
console.log('\n=== Novel Encryption Tool ===\n');
console.log('1. Password hash (replace PASSWORD_HASH in novel pages):');
console.log('   ' + hash);
console.log('\n2. Encrypt content. Enter/paste the plaintext (Ctrl+D when done):\n');

let chunks = [];
for await (const chunk of process.stdin) {
	chunks.push(chunk);
}
const plaintext = Buffer.concat(chunks).toString('utf8').trim();

if (plaintext) {
	const encrypted = await encrypt(plaintext, password);
	console.log('\n--- Add this to your novel .md frontmatter ---');
	console.log('ciphertext: "' + encrypted + '"');
	console.log('\n--- Full frontmatter example ---');
	console.log('---');
	console.log('title: "Your Novel Title"');
	console.log('description: "Your description"');
	console.log('pubDate: "Aug 07 2026"');
	console.log('ciphertext: "' + encrypted + '"');
	console.log('---');
	console.log('\nReplace PASSWORD_HASH in src/pages/novel/index.astro and src/pages/novel/[...slug].astro with:');
	console.log('   const PASSWORD_HASH = "' + hash + '";\n');
}
