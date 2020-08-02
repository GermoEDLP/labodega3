import { HtmlDecoderPipe } from './html-decoder.pipe';

describe('HtmlDecoderPipe', () => {
  it('create an instance', () => {
    const pipe = new HtmlDecoderPipe();
    expect(pipe).toBeTruthy();
  });
});
