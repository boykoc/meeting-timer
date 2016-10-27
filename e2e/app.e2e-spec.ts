import { MeetingTimerPage } from './app.po';

describe('meeting-timer App', function() {
  let page: MeetingTimerPage;

  beforeEach(() => {
    page = new MeetingTimerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
