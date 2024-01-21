import { Test1Middleware } from './test1.middleware';

describe('Test1Middleware', () => {
  it('should be defined', () => {
    expect(new Test1Middleware()).toBeDefined();
  });
});
