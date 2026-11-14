type Level = 'debug' | 'info' | 'warn' | 'error';

const order: Record<Level, number> = { debug: 0, info: 1, warn: 2, error: 3 };
const minLevel: Level = import.meta.env.DEV ? 'debug' : 'warn';

function emit(level: Level, message: string, data?: unknown): void {
  if (order[level] < order[minLevel]) return;
  const line = `[decoupage] ${message}`;
  // The logger is the single place allowed to write to the console.
  const sink = globalThis.console[level];
  if (data === undefined) sink(line);
  else sink(line, data);
}

export const logger = {
  debug: (m: string, d?: unknown): void => emit('debug', m, d),
  info: (m: string, d?: unknown): void => emit('info', m, d),
  warn: (m: string, d?: unknown): void => emit('warn', m, d),
  error: (m: string, d?: unknown): void => emit('error', m, d),
};
