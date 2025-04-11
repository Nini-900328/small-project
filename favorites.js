window.onload = function () {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
  const groupedFavorites = JSON.parse(localStorage.getItem('groupedFavorites')) || [];
  const container = document.getElementById('favorites-container');
  const noFavoritesMsg = document.getElementById('no-favorites-msg');

  container.innerHTML = '';
  noFavoritesMsg.style.display = Object.keys(favorites).length === 0 && groupedFavorites.length === 0 ? 'block' : 'none';

  const rendered = new Set();

  groupedFavorites.forEach(group => {
    const groupElement = createGroupElement(group.title);
    const groupItems = groupElement.querySelector('.group-items');

    group.items.forEach(id => {
      if (favorites[id]) {
        groupItems.appendChild(createFavoriteElement(id, favorites[id]));
        rendered.add(id);
      }
    });

    container.appendChild(groupElement);
  });

  for (const shopId in favorites) {
    if (!rendered.has(shopId)) {
      const element = createFavoriteElement(shopId, favorites[shopId]);
      container.appendChild(element);
    }
  }
};

function createFavoriteElement(shopId, shop) {
  const shopElement = document.createElement('div');
  shopElement.classList.add('favorite-item');
  shopElement.id = shopId;
  shopElement.setAttribute('draggable', true);
  shopElement.innerHTML = `
    <h3>${shop.name}</h3>
    <p>${shop.description}</p>
    <button onclick="removeFavorite('${shopId}')">Remove</button>
  `;
  shopElement.addEventListener('dragstart', handleDragStart);
  shopElement.addEventListener('dragover', event => event.preventDefault());
  shopElement.addEventListener('drop', handleDropOnItem);
  return shopElement;
}

function createGroupElement(title = "New Group") {
  const groupElement = document.createElement('div');
  groupElement.classList.add('favorite-item', 'group');
  groupElement.innerHTML = `
    <h3 class="group-title" contenteditable="true">${title}</h3>
    <div class="group-items"></div>
    <button onclick="removeFavoriteGroup(this)">Remove Group</button>
  `;

  const titleElem = groupElement.querySelector('.group-title');
  titleElem.addEventListener('blur', () => saveGroupedFavorites());

  groupElement.addEventListener('dragover', event => event.preventDefault());
  groupElement.addEventListener('drop', function (event) {
    event.preventDefault();
    const draggedId = event.dataTransfer.getData('text/plain');
    const draggedEl = document.getElementById(draggedId);
    if (!draggedEl || draggedEl.classList.contains('group')) return;

    const groupItems = groupElement.querySelector('.group-items');
    groupItems.appendChild(draggedEl);

    saveGroupedFavorites();
  });

  return groupElement;
}

function handleDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
}

function handleDropOnItem(event) {
  event.preventDefault();
  const draggedId = event.dataTransfer.getData('text/plain');
  const draggedEl = document.getElementById(draggedId);
  const targetEl = event.currentTarget;

  if (!draggedEl || draggedEl === targetEl || draggedEl.classList.contains('group') || targetEl.classList.contains('group')) return;

  // 檢查 target 是否已在群組中
  const targetGroup = targetEl.closest('.group');
  if (targetGroup) {
    const groupItems = targetGroup.querySelector('.group-items');
    groupItems.appendChild(draggedEl);
    saveGroupedFavorites();
  } else {
    const newGroup = createGroupElement();
    const groupItems = newGroup.querySelector('.group-items');
    groupItems.appendChild(draggedEl);
    groupItems.appendChild(targetEl);

    document.getElementById('favorites-container').appendChild(newGroup);
    saveGroupedFavorites();
  }
}

document.getElementById('favorites-container').addEventListener('dragover', function (event) {
  event.preventDefault();
});

document.getElementById('favorites-container').addEventListener('drop', function (event) {
  event.preventDefault();

  const draggedId = event.dataTransfer.getData('text/plain');
  const draggedEl = document.getElementById(draggedId);
  const targetGroup = event.target.closest('.group');

  if (!draggedEl || draggedEl.classList.contains('group')) return;

  if (targetGroup) {
    const groupItems = targetGroup.querySelector('.group-items');
    groupItems.appendChild(draggedEl);
    saveGroupedFavorites();
  }
});

function saveGroupedFavorites() {
  const groups = document.querySelectorAll('.group');
  const groupedFavorites = [];

  groups.forEach(group => {
    const title = group.querySelector('.group-title').innerText.trim() || "New Group";
    const itemIds = Array.from(group.querySelectorAll('.favorite-item'))
      .filter(el => !el.classList.contains('group'))
      .map(el => el.id);
    groupedFavorites.push({ title, items: itemIds });
  });

  localStorage.setItem('groupedFavorites', JSON.stringify(groupedFavorites));
}

function removeFavorite(shopId) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
  delete favorites[shopId];
  localStorage.setItem('favorites', JSON.stringify(favorites));

  const element = document.getElementById(shopId);
  if (element) {
    element.classList.add('fade-out');
    element.addEventListener('animationend', () => {
      element.remove();
      saveGroupedFavorites();
      if (Object.keys(favorites).length === 0 &&
        document.querySelectorAll('.favorite-item:not(.group)').length === 0) {
        document.getElementById('no-favorites-msg').style.display = 'block';
      }
    });
  }
}

function removeFavoriteGroup(button) {
  const groupElement = button.parentElement;
  const groupItems = groupElement.querySelectorAll('.favorite-item');
  const container = document.getElementById('favorites-container');

  groupItems.forEach(item => {
    if (!item.classList.contains('group')) {
      container.appendChild(item);
    }
  });

  groupElement.remove();
  saveGroupedFavorites();
}

function showNewGroupInput() {
  const newGroupInputContainer = document.createElement('div');
  newGroupInputContainer.innerHTML = `
    <input type="text" id="new-group-name" placeholder="Enter new group name" />
    <button onclick="createNewGroup()">Create Group</button>
  `;
  document.body.appendChild(newGroupInputContainer);
}

function createNewGroup() {
  const groupName = document.getElementById('new-group-name').value;
  if (groupName.trim()) {
    const groupElement = createGroupElement(groupName);
    document.getElementById('favorites-container').appendChild(groupElement);
    document.body.removeChild(document.getElementById('new-group-name').parentElement);
  }
}
