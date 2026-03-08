/**
 * Campus Info Hub - Încarcă și afișează resurse din JSON
 */

// URL relativ către fișierul JSON (exemplu de relative URL)
const RESOURCES_URL = 'data/resources.json';

// Date fictive de rezervă (folosite când fetch eșuează, ex: file://)
const FALLBACK_RESOURCES = [
  { name: "Biblioteca Centrală", type: "studiu", location: "Clădirea A, Etaj 2", program: "L-V: 08:00-22:00, S: 09:00-14:00", tags: ["studiu", "cărți", "liniște"] },
  { name: "Sala de Lectură", type: "studiu", location: "Clădirea B, Etaj 1", program: "L-V: 07:00-23:00", tags: ["studiu", "individual", "wifi"] },
  { name: "Cantina Universitară", type: "alimentație", location: "Clădirea C, Parter", program: "L-V: 08:00-18:00", tags: ["mâncare", "prânz", "social"] },
  { name: "Cafeteria Starbucks", type: "alimentație", location: "Lobby Clădirea Principală", program: "L-V: 07:00-20:00", tags: ["cafea", "studiu", "wifi"] },
  { name: "Festivalul Studențesc", type: "eveniment", location: "Piața Centrală Campus", program: "15-17 Mai 2025", tags: ["muzică", "social", "distracție"] },
  { name: "Workshop Programare", type: "eveniment", location: "Sala 101, Clădirea Informatică", program: "Fiecare Sâmbătă 10:00-12:00", tags: ["studiu", "tehnologie", "workshop"] }
];

document.addEventListener('DOMContentLoaded', function() {
  loadResources();
});

function loadResources() {
  fetch(RESOURCES_URL)
    .then(response => {
      if (!response.ok) throw new Error('Eroare la încărcarea datelor');
      return response.json();
    })
    .then(data => {
      const resources = data.resources || data;
      renderAll(resources);
    })
    .catch(() => {
      renderAll(FALLBACK_RESOURCES);
    });
}

function renderAll(resources) {
  displayResourceList(resources);
  displayFilteredResults(resources);
  displayTags(resources);
  setupFilters(resources);
}

// a) Afișează lista de resurse
function displayResourceList(resources) {
  const container = document.getElementById('lista-resurse');
  if (!container) return;

  let html = '<h3 style="margin-bottom:0.75rem;">Lista resurselor</h3>';
  resources.forEach(res => {
    const typeClass = escapeHtml(res.type || '');
    html += `
      <div class="card">
        <h3>${escapeHtml(res.name)} <span class="type-badge ${typeClass}">${typeClass}</span></h3>
        <p><strong>Locație:</strong> ${escapeHtml(res.location)}</p>
        <p><strong>Program:</strong> ${escapeHtml(res.program)}</p>
        <p><strong>Tag-uri:</strong> ${(res.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join(' ')}</p>
      </div>
    `;
  });
  container.innerHTML = html;
}

// b) Afișează rezultate filtrate (doar locuri destinate studiului)
function displayFilteredResults(resources) {
  const container = document.getElementById('resurse-filtrate');
  if (!container) return;

  const studyPlaces = resources.filter(r => r.type === 'studiu');
  let html = '<h3 style="margin-bottom:0.75rem; margin-top:1.5rem;">Locuri destinate studiului (filtrat)</h3>';
  
  if (studyPlaces.length === 0) {
    html += '<p class="card">Nu există resurse de tip studiu.</p>';
  } else {
    studyPlaces.forEach(res => {
      html += `
        <div class="card">
          <h3>${escapeHtml(res.name)} <span class="type-badge studiu">studiu</span></h3>
          <p><strong>Locație:</strong> ${escapeHtml(res.location)}</p>
          <p><strong>Program:</strong> ${escapeHtml(res.program)}</p>
        </div>
      `;
    });
  }
  container.innerHTML = html;
}

// c) Afișează tags/categories
function displayTags(resources) {
  const container = document.getElementById('toate-tagurile');
  if (!container) return;

  const tagSet = new Set();
  resources.forEach(r => {
    (r.tags || []).forEach(t => tagSet.add(t));
  });
  const tags = Array.from(tagSet).sort();

  let html = '<h3 style="margin-bottom:0.75rem; margin-top:1.5rem;">Tag-uri / Categorii</h3>';
  html += '<div class="card"><p>' + 
    tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join(' ') + 
    '</p></div>';
  container.innerHTML = html;
}

function setupFilters(resources) {
  const typeFilter = document.getElementById('filter-type');
  const tagFilter = document.getElementById('filter-tag');
  const listContainer = document.getElementById('lista-resurse');

  // Populează dropdown-ul de tag-uri
  const tagSet = new Set();
  resources.forEach(r => (r.tags || []).forEach(t => tagSet.add(t)));
  Array.from(tagSet).sort().forEach(tag => {
    const opt = document.createElement('option');
    opt.value = tag;
    opt.textContent = tag;
    tagFilter.appendChild(opt);
  });

  function applyFilters() {
    const typeVal = typeFilter ? typeFilter.value : 'toate';
    const tagVal = tagFilter ? tagFilter.value : '';
    let filtered = resources;

    if (typeVal !== 'toate') {
      filtered = filtered.filter(r => r.type === typeVal);
    }
    if (tagVal) {
      filtered = filtered.filter(r => (r.tags || []).includes(tagVal));
    }

    // Reafișează lista filtrată
    displayResourceList(filtered);
  }

  if (typeFilter) typeFilter.addEventListener('change', applyFilters);
  if (tagFilter) tagFilter.addEventListener('change', applyFilters);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
