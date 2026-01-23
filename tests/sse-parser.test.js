const test = require('node:test');
const assert = require('node:assert/strict');
const { createSseParser } = require('../src/lib/streaming/sse');

test('buffers partial SSE events across chunks', () => {
  const events = [];
  const parser = createSseParser((data) => events.push(data));

  parser.feed('data: {"type":"chunk","data":"hel');
  parser.feed('lo"}\n\n');

  assert.equal(events.length, 1);
  assert.equal(events[0], '{"type":"chunk","data":"hello"}');
});

test('handles multiple events in one chunk', () => {
  const events = [];
  const parser = createSseParser((data) => events.push(data));

  parser.feed('data: {"type":"chunk","data":"a"}\n\n' +
    'data: {"type":"chunk","data":"b"}\n\n');

  assert.deepEqual(events, [
    '{"type":"chunk","data":"a"}',
    '{"type":"chunk","data":"b"}',
  ]);
});
