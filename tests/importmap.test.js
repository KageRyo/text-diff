import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('no script is loaded from another host', () => {
  const sources = [...html.matchAll(/<script[^>]*\ssrc="([^"]+)"/g)].map((match) => match[1]);
  const mapped = [...html.matchAll(/"(https?:\/\/[^"]+\.m?js)"/g)].map((match) => match[1]);
  assert.deepEqual([...sources, ...mapped].filter((url) => /^https?:/.test(url)), []);
});
