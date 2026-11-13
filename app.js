const chips = [...document.querySelectorAll('.filter-chip')];
const cards = [...document.querySelectorAll('.event-card')];
const search = document.querySelector('#event-search');
const emptyState = document.querySelector('#empty-state');
const toast = document.querySelector('#toast');
let activeFilter = 'Todos';
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function filterEvents() {
  const query = search.value.trim().toLocaleLowerCase('pt-BR');
  let visible = 0;
  cards.forEach((card) => {
    const matchesCategory = activeFilter === 'Todos' || card.dataset.category === activeFilter;
    const matchesQuery = `${card.dataset.search} ${card.innerText}`.toLocaleLowerCase('pt-BR').includes(query);
    card.hidden = !(matchesCategory && matchesQuery);
    if (!card.hidden) visible += 1;
  });
  emptyState.hidden = visible !== 0;
}

chips.forEach((chip) => chip.addEventListener('click', () => {
  activeFilter = chip.dataset.filter;
  chips.forEach((item) => item.classList.toggle('selected', item === chip));
  filterEvents();
}));
search.addEventListener('input', filterEvents);

document.querySelectorAll('.join-button').forEach((button) => {
  button.addEventListener('click', () => {
    const joined = button.classList.toggle('joined');
    button.textContent = joined ? '✓' : '+';
    button.setAttribute('aria-pressed', String(joined));
    showToast(joined ? 'Você está na lista! Te esperamos lá.' : 'Encontro removido dos seus planos.');
  });
});

document.querySelector('#suggest-button').addEventListener('click', () => {
  showToast('Adoramos a ideia! Em breve você poderá criar seu encontro por aqui.');
});
document.querySelector('.profile-button').addEventListener('click', () => showToast('Seu espaço, do seu jeito.'));
document.querySelector('.notification-button').addEventListener('click', () => showToast('Tudo em dia por aqui.'));

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach((item) => item.classList.toggle('active', item === link));
    if (link.dataset.page !== 'Início' && link.dataset.page !== 'Agenda') {
      showToast(`${link.dataset.page}: novidades chegando em breve.`);
    }
  });
});

let installPrompt;
const installButton = document.querySelector('#install-button');
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.hidden = false;
});
installButton.addEventListener('click', async () => {
  if (!installPrompt) return;
  installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
  installButton.hidden = true;
});
window.addEventListener('appinstalled', () => showToast('CONVIVA instalado. Bom ter você por perto!'));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
