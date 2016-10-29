import { MooneyPage } from './app.po';

describe('mooney App', function() {
  let page: MooneyPage;

  beforeEach(() => {
    page = new MooneyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
