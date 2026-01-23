/**
 * Simple SSE parser that buffers partial chunks and emits data payloads per event.
 */
function createSseParser(onData) {
  let buffer = '';

  function feed(chunk) {
    if (!chunk) return;
    buffer += chunk;
    buffer = buffer.replace(/\r/g, '');

    const events = buffer.split('\n\n');
    buffer = events.pop() ?? '';

    for (const event of events) {
      dispatchEvent(event);
    }
  }

  function flush() {
    if (buffer.trim().length === 0) {
      buffer = '';
      return;
    }
    dispatchEvent(buffer);
    buffer = '';
  }

  function dispatchEvent(eventText) {
    const lines = eventText.split('\n');
    const dataLines = [];

    for (const line of lines) {
      if (!line.startsWith('data:')) continue;
      let value = line.slice(5);
      if (value.startsWith(' ')) value = value.slice(1);
      dataLines.push(value);
    }

    if (dataLines.length > 0) {
      onData(dataLines.join('\n'));
    }
  }

  return { feed, flush };
}

module.exports = {
  createSseParser,
};
