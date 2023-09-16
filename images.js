function updateImages(tag) {
    // Atualize o fundo .hero
    const heroBackground = document.querySelector('.hero');
    const randomQuery = Math.random().toString(36).substring(7); // Gere um parâmetro de consulta aleatório
    const backgroundImageURL = `https://source.unsplash.com/random/?${tag}&${randomQuery}`;
    heroBackground.style.backgroundImage = `url(${backgroundImageURL})`;

    // Atualize as imagens nas tags <img> dentro das cartas
    const cards = document.querySelectorAll('.card-img img');
    cards.forEach((img, index) => {
        const randomQuery = Math.random().toString(36).substring(7); // Gere um parâmetro de consulta aleatório
        const imageUrl = `https://source.unsplash.com/random/600x400/?${tag}&${index + 1}&${randomQuery}`;
        img.src = imageUrl;
    });
}


function updateCustomImage() {
    const customTag = document.getElementById('customTag').value;
    updateImages(customTag);
}
