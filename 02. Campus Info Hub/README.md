# Campus Info Hub

Un mic site informativ pentru resursele disponibile în campus (bibliotecă, cantină, evenimente).

## Structura proiectului

```
/
├── index.html          # Pagina principală
├── css/style.css       # Stiluri
├── js/app.js           # JavaScript pentru încărcare dinamică
├── data/
│   └── resources.json  # Date despre resurse
├── pages/
│   ├── library.html    # Biblioteca
│   ├── cafeteria.html  # Cantina
│   └── events.html     # Evenimente
└── README.md
```

## Răspunsuri la întrebări

### 1. Ce este o resursă (resource) în aplicația ta?

O **resursă** este orice loc, serviciu sau eveniment util studenților din campus. Exemple: Biblioteca Centrală, Cantina Universitară, Sala de Lectură, Festivalul Studențesc. Fiecare resursă are proprietăți ca: nume, tip (studiu, alimentație, eveniment), locație, program și tag-uri.

### 2. Da exemplu de un URI și explică componentele acestuia.

**Exemplu:** `https://example.com/pages/library.html#schedule`

Componentele:
- **Scheme:** `https://` – protocolul
- **Host:** `example.com` – domeniul
- **Path:** `/pages/library.html` – calea către fișierul HTML
- **Fragment:** `#schedule` – identificatorul unei secțiuni în pagină (sari la program)

În contextul aplicației locale, un URI relativ: `/pages/library.html#schedule` – referă pagina bibliotecii și secțiunea cu id-ul „schedule”.

### 3. Care părți sunt statice și care sunt dinamice?

**Statice:**
- Structura HTML a tuturor paginilor (index, library, cafeteria, events)
- Design-ul CSS
- Conținutul din paginile resource (Biblioteca, Cantina, Evenimente)

**Dinamice:**
- Lista de resurse pe pagina principală – încărcată cu `fetch()` din `resources.json`
- Rezultatele filtrate (ex: doar locuri de studiu) – generate prin JavaScript
- Afișarea tag-urilor/categoriilor – extrase din JSON la rulare
- Filtrele interactive (dropdown tip, dropdown tag) – actualizează lista la schimbare

### 4. Este aplicația ta document-centric, interactivă sau ambele? De ce?

**Ambele.**

- **Document-centric:** Paginile Biblioteca, Cantina, Evenimente sunt documente HTML statice. Fiecare pagină prezintă informații fixe, consumate prin citire, fără modificare din partea utilizatorului.

- **Interactivă:** Pagina principală permite:
  - Încărcarea dinamică a resurselor din JSON
  - Filtrarea după tip (studiu, alimentație, eveniment)
  - Filtrarea după tag
  - Actualizarea conținutului afișat în funcție de selectări

Aplicația combină informații statice (documente) cu interacțiune (filtre, afișare dinamică), ceea ce o face hibridă: document-centrică pentru resursele detaliate și interactivă pe homepage.
