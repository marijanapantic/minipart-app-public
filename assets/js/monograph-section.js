// Keep the new sections' language switch consistent without changing the shared header.
(() => {
  if (!document.querySelector('.monograph-section-page')) return;
  const flag = document.querySelector('.flags-container img[alt="Srpski"]');
  const link = flag?.closest('a');
  if (link) link.setAttribute('href', '/monografija/');
})();
