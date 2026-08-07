// Client-side crypto utilities for novel encryption/decryption
// Uses Web Crypto API with AES-GCM + PBKDF2

const SALT = 'novel-salt-2026';
const ITERATIONS = 100000;

export async function deriveKey(password: string): Promise<CryptoKey> {
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

export async function encrypt(plaintext: string, password: string): Promise<string> {
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
	return btoa(String.fromCharCode(...combined));
}

export async function decrypt(ciphertextBase64: string, password: string): Promise<string> {
	const key = await deriveKey(password);
	const combined = Uint8Array.from(atob(ciphertextBase64), (c) => c.charCodeAt(0));
	const iv = combined.slice(0, 12);
	const ciphertext = combined.slice(12);
	const plaintext = await crypto.subtle.decrypt(
		{ name: 'AES-GCM', iv },
		key,
		ciphertext
	);
	return new TextDecoder().decode(plaintext);
}

export async function hashPassword(password: string): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(password);
	const hash = await crypto.subtle.digest('SHA-256', data);
	return Array.from(new Uint8Array(hash))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
}
