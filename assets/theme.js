
function filterCards(filter) {
  const cards = document.querySelectorAll('#cards .card');

  

  cards.forEach(card => {
    if (filter === 'all' || card.parentNode.getAttribute('data-category') === filter) {
      card.parentNode.style.display = 'flex';
    } else {
      card.parentNode.style.display = 'none';
    }
  });
}