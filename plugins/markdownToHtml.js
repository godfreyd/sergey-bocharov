import {remark} from 'remark';
import html from 'remark-html';
import externalLinks from 'remark-external-links'; 
import customHeaders from './remark-header-custom-ids';
import images from 'remark-images';
import unrwapImages from 'remark-unwrap-images';
import smartyPants from './remark-smartypants';

module.exports = {
  remarkPlugins: [
    externalLinks,
    customHeaders,
    images,
    unrwapImages,
    smartyPants,
  ],
  markdownToHtml,
};

async function markdownToHtml(markdown) {
  const result = await remark()
    .use(externalLinks)
    .use(customHeaders)
    .use(images)
    .use(unrwapImages)
    .use(smartyPants)
    .use(html)
    .process(markdown);
  return result.toString();
}
