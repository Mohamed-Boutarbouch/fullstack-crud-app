export default function getPageNum(url) {
  if (url) {
    const pageURL = new URL(url);
    const pageNum = new URLSearchParams(pageURL.search);
    return parseInt(pageNum.get('page'));
  }
}
