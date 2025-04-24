const zoomableImages = document.querySelectorAll('#zoomable');
const overlay = document.getElementById('overlay');
const zoomedImg = document.getElementById('zoomedImg');

zoomableImages.forEach(img => {
  img.addEventListener('click', () => {
    zoomedImg.src = img.src;
    overlay.style.display = 'flex';
  });
});

overlay.addEventListener('click', () => {
  overlay.style.display = 'none';
  zoomedImg.src = '';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    overlay.style.display = 'none';
    zoomedImg.src = '';
  }
});