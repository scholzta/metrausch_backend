import { ClearCookiesMiddleware } from './clear-cookies.middleware';

describe('ClearCookiesMiddleware', () => {
  it('should be defined', () => {
    expect(new ClearCookiesMiddleware()).toBeDefined();
  });
});
