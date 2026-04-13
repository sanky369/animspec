const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

export const ANIMSPEC_WIDGET_URI = 'ui://widget/animspec-results-v1.html';

export function getAnimSpecWidgetHtml(): string {
  const initialState = {
    title: 'AnimSpec',
    subtitle: 'Run a video analysis from ChatGPT and inspect the result here.',
  };

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>AnimSpec Results</title>
    <style>
      :root {
        color-scheme: light dark;
        --bg: #0f1117;
        --panel: rgba(18, 21, 31, 0.88);
        --panel-border: rgba(255, 255, 255, 0.08);
        --text: #f5f7fb;
        --muted: #a5afc1;
        --accent: #71f7c7;
        --accent-2: #71b8ff;
        --code-bg: rgba(9, 12, 19, 0.95);
        --pill: rgba(255, 255, 255, 0.08);
      }

      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; min-height: 100%; background:
        radial-gradient(circle at top left, rgba(113, 247, 199, 0.15), transparent 36%),
        radial-gradient(circle at top right, rgba(113, 184, 255, 0.18), transparent 32%),
        linear-gradient(180deg, #11131b 0%, #090b11 100%);
        color: var(--text);
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      main {
        width: min(920px, calc(100vw - 24px));
        margin: 0 auto;
        padding: 16px 0 24px;
      }

      .shell {
        border: 1px solid var(--panel-border);
        background: var(--panel);
        backdrop-filter: blur(18px);
        border-radius: 22px;
        overflow: hidden;
        box-shadow: 0 20px 70px rgba(0, 0, 0, 0.38);
      }

      .hero {
        padding: 20px 20px 14px;
        border-bottom: 1px solid var(--panel-border);
      }

      .kicker {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--accent);
      }

      h1 {
        margin: 10px 0 8px;
        font-size: clamp(24px, 4vw, 34px);
        line-height: 1.05;
      }

      .subtitle {
        margin: 0;
        color: var(--muted);
        font-size: 14px;
        line-height: 1.5;
      }

      .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding: 16px 20px 0;
      }

      .pill {
        padding: 7px 10px;
        border-radius: 999px;
        background: var(--pill);
        color: var(--muted);
        font-size: 12px;
      }

      .body {
        display: grid;
        gap: 16px;
        padding: 16px 20px 20px;
      }

      .panel {
        border: 1px solid var(--panel-border);
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.03);
        overflow: hidden;
      }

      .panel h2 {
        margin: 0;
        padding: 14px 16px;
        font-size: 13px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--accent-2);
        border-bottom: 1px solid var(--panel-border);
      }

      .panel .content {
        padding: 16px;
        line-height: 1.6;
        font-size: 14px;
      }

      pre {
        margin: 0;
        white-space: pre-wrap;
        word-break: break-word;
        background: var(--code-bg);
        padding: 16px;
        font-size: 12px;
        line-height: 1.55;
        overflow: auto;
      }

      .empty {
        color: var(--muted);
      }
    </style>
  </head>
  <body>
    <main>
      <div class="shell">
        <div class="hero">
          <div class="kicker">AnimSpec App</div>
          <h1 id="title">${escapeHtml(initialState.title)}</h1>
          <p class="subtitle" id="subtitle">${escapeHtml(initialState.subtitle)}</p>
        </div>
        <div class="meta" id="meta"></div>
        <div class="body">
          <section class="panel">
            <h2>Overview</h2>
            <div class="content" id="overview"><span class="empty">Run an analysis to populate this view.</span></div>
          </section>
          <section class="panel">
            <h2>Output</h2>
            <pre id="code">Waiting for tool result…</pre>
          </section>
          <section class="panel" id="notes-panel" hidden>
            <h2>Notes</h2>
            <div class="content" id="notes"></div>
          </section>
        </div>
      </div>
    </main>
    <script>
      const titleEl = document.getElementById('title');
      const subtitleEl = document.getElementById('subtitle');
      const metaEl = document.getElementById('meta');
      const overviewEl = document.getElementById('overview');
      const codeEl = document.getElementById('code');
      const notesPanelEl = document.getElementById('notes-panel');
      const notesEl = document.getElementById('notes');

      function escapeHtml(value) {
        return String(value)
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')
          .replaceAll('"', '&quot;')
          .replaceAll("'", '&#39;');
      }

      function render(data) {
        const title = data?.format ? 'Analysis ready' : 'AnimSpec';
        const subtitle = data?.mode === 'shared-app-account'
          ? 'Using the shared ChatGPT app account.'
          : 'Rendered from the latest tool result.';

        titleEl.textContent = title;
        subtitleEl.textContent = subtitle;

        const pills = [
          data?.format ? 'Format: ' + data.format : null,
          data?.creditsUsed != null ? 'Credits: ' + data.creditsUsed : null,
          data?.creditsRemaining != null ? 'Remaining: ' + data.creditsRemaining : null,
          data?.pipelineFamily ? 'Pipeline: ' + data.pipelineFamily : null,
          data?.verificationScore != null ? 'Score: ' + data.verificationScore : null,
        ].filter(Boolean);

        metaEl.innerHTML = pills.map((pill) => '<span class="pill">' + escapeHtml(pill) + '</span>').join('');
        overviewEl.innerHTML = data?.overview ? escapeHtml(data.overview) : '<span class="empty">No overview yet.</span>';
        codeEl.textContent = data?.code || 'No output yet.';

        if (data?.notes) {
          notesPanelEl.hidden = false;
          notesEl.textContent = data.notes;
        } else {
          notesPanelEl.hidden = true;
          notesEl.textContent = '';
        }
      }

      window.addEventListener('message', (event) => {
        if (event.source !== window.parent) return;
        const message = event.data;
        if (!message || message.jsonrpc !== '2.0') return;
        if (message.method !== 'ui/notifications/tool-result') return;
        render(message.params?.structuredContent || {});
      }, { passive: true });
    </script>
  </body>
</html>`;
}
