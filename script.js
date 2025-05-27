// Definindo os elementos
const playButton = document.getElementById('playButton');
const menu = document.getElementById('menu');
const game = document.getElementById('game');
const cards = document.querySelectorAll('.card');
const currentEnergyDisplay = document.getElementById('currentEnergy');
let selectedCards = [];
let currentEnergy = 10;  // Energia inicial do jogador

// Função para alternar para o campo de batalha
playButton.addEventListener('click', () => {
  if (selectedCards.length > 0) {
    // Ocultar o menu e exibir o campo de batalha
    menu.classList.add('hidden');
    game.classList.remove('hidden');
    
    // Adicionar as cartas no campo de batalha
    renderBattlefield();
  } else {
    alert('Selecione ao menos uma carta!');
  }
});

// Função para selecionar/deselecionar uma carta
cards.forEach(card => {
  card.addEventListener('click', () => {
    const cardName = card.getAttribute('data-card');
    
    if (selectedCards.includes(cardName)) {
      selectedCards = selectedCards.filter(c => c !== cardName);
      card.style.border = '2px solid #ccc'; // Remover a seleção
    } else {
      selectedCards.push(cardName);
      card.style.border = '2px solid #4CAF50'; // Marcar como selecionada
    }
  });
});

// Função para renderizar as cartas no campo de batalha
function renderBattlefield() {
  const battlefield = document.getElementById('battlefield');
  battlefield.innerHTML = ''; // Limpa o campo de batalha antes de adicionar novas cartas

  selectedCards.forEach(cardName => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    
    // Adiciona a imagem e nome da carta
    const img = document.createElement('img');
    img.src = getCardImage(cardName);
    cardElement.appendChild(img);
    
    const p = document.createElement('p');
    p.textContent = cardName.charAt(0).toUpperCase() + cardName.slice(1);
    cardElement.appendChild(p);

    battlefield.appendChild(cardElement);

    // Adiciona o evento para jogar a carta
    cardElement.addEventListener('click', () => playCard(cardName));
  });
}

// Função para obter a imagem da carta com base no nome
function getCardImage(cardName) {
  switch(cardName) {
    case 'barbaro':
      return 'https://3.bp.blogspot.com/-UYazgEzVVbo/VscHAmmg7WI/AAAAAAAAmOQ/Vvs1aYExsSE/s1600/barbaro-clash-royale.png'; // Imagem do Bárbaro
    // Adicione mais cartas e imagens aqui conforme necessário
    default:
      return '';
  }
}

// Função para jogar a carta
function playCard(cardName) {
  if (cardName === 'barbaro' && currentEnergy >= 5) {
    // Se tiver energia suficiente, joga o Bárbaro
    currentEnergy -= 5;  // Gasta 5 de energia
    updateEnergyDisplay();
    alert('Você jogou o Bárbaro!');
  } else if (cardName === 'barbaro' && currentEnergy < 5) {
    alert('Energia insuficiente para jogar o Bárbaro.');
  }
}

// Função para atualizar a energia exibida na tela
function updateEnergyDisplay() {
  currentEnergyDisplay.textContent = currentEnergy;
}
