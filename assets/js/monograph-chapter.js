(() => {
  const page = document.querySelector('.chapter-page');
  const button = page?.querySelector('.chapter-copy');
  const citation = page?.querySelector('#chapter-citation-text');
  const status = page?.querySelector('#chapter-copy-status');
  if (!button || !citation || !status) return;

  let copying = false;
  let resetTimer;
  button.hidden = false;
  button.addEventListener('click', async () => {
    if (copying) return;
    copying = true;
    clearTimeout(resetTimer);
    button.classList.remove('is-copied');
    status.classList.add('visually-hidden');
    status.textContent = '';
    button.setAttribute('aria-busy', 'true');
    try {
      await navigator.clipboard.writeText(citation.textContent.replace(/\s+/g, ' ').trim());
      status.textContent = 'Citation copied.';
      button.classList.add('is-copied');
      resetTimer = setTimeout(() => button.classList.remove('is-copied'), 1800);
    } catch {
      status.classList.remove('visually-hidden');
      citation.focus();
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(citation);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      status.textContent = 'Copy unavailable. Select the citation and press Ctrl+C or Command+C to copy.';
    } finally {
      button.removeAttribute('aria-busy');
      copying = false;
    }
  });
})();
