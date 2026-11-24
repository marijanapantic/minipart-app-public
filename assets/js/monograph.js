(() => {
  const page = document.querySelector('.monograph-page');
  const cover = page?.querySelector('.monograph-cover img');
  if (page && cover) {
    // The visible spine begins at x=444 in the 1290px-wide cover artwork.
    const alignChapters = () => {
      const imageBounds = cover.getBoundingClientRect();
      const pageBounds = page.getBoundingClientRect();
      const bookLeft = imageBounds.left - pageBounds.left + imageBounds.width * (444 / 1290);
      page.style.setProperty('--monograph-book-left', `${bookLeft}px`);
    };
    alignChapters();
    const observer = new ResizeObserver(alignChapters);
    observer.observe(page);
    observer.observe(cover);
  }

  const button = document.querySelector('.monograph-copy');
  const citation = document.getElementById('monograph-citation-text');
  const status = document.getElementById('monograph-copy-status');
  if (!button || !citation || !status) return;

  let copying = false;
  let resetTimer;
  button.hidden = false;
  button.addEventListener('click', async () => {
    if (copying) return;
    copying = true;
    const text = citation.textContent.replace(/\s+/g, ' ').trim();
    clearTimeout(resetTimer);
    button.classList.remove('is-copied');
    status.classList.add('visually-hidden');
    status.textContent = '';
    button.setAttribute('aria-busy', 'true');
    try {
      await navigator.clipboard.writeText(text);
      status.textContent = 'Citation copied.';
      button.classList.add('is-copied');
      resetTimer = setTimeout(() => button.classList.remove('is-copied'), 1800);
    } catch {
      // Keep a usable manual path when clipboard permission is unavailable.
      status.classList.remove('visually-hidden');
      citation.focus();
      const range = document.createRange();
      range.selectNodeContents(citation);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Copy unavailable. Citation selected; press Ctrl+C or Command+C to copy.';
    } finally {
      button.removeAttribute('aria-busy');
      copying = false;
    }
  });
})();
