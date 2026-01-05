import fs from 'fs';
import { describe, it, expect, beforeEach } from 'vitest';
import { handler } from '../notifier';

const testevent = fs.readFileSync(__dirname + '/testevent.json', 'utf-8');

describe('notifier handler', () => {
  beforeEach(() => {
  });

  it('dummy test', async () => {
    console.log('Test event content:', testevent);
  });

  it('test notifier', async () => {
    const result = await handler(JSON.parse(testevent));
    expect(result).toBeDefined();
    console.log(result);
  }, 30000);
});
