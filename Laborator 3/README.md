## 1.1 Raspunsuri teoretice
### 1) Cele 4 metode HTTP principale
- **GET**: citeste resurse de pe server (fara a modifica date).
- **POST**: trimite date noi catre server (de obicei creeaza resurse noi).
- **PUT**: actualizeaza complet o resursa existenta (sau o creeaza la un URL fix).
- **DELETE**: sterge o resursa existenta.

### 2) Coduri de status HTTP
- **200 OK** - cererea a reusit.
- **301 Moved Permanently** - resursa a fost mutata permanent la alt URL.
- **400 Bad Request** - cerere invalida (date lipsa/format gresit).
- **401 Unauthorized** - utilizator neautentificat sau token invalid.
- **403 Forbidden** - utilizator autentificat, dar fara drept de acces.
- **404 Not Found** - resursa ceruta nu exista.
- **500 Internal Server Error** - eroare interna pe server.

### 3) Diferenta dintre HTTP si HTTPS
- **HTTP** transmite datele in clar (fara criptare).
- **HTTPS** foloseste TLS/SSL, deci datele sunt criptate si mai sigure.
- HTTPS ofera:
  - confidentialitate (datele nu se citesc usor pe traseu),
  - integritate (datele nu se modifica usor),
  - autentificarea serverului (certificat digital).

## 1.2 Analiza HTTP (documentare practica)

Exemplu endpoint analizat: `https://httpbin.org/get`.

### Exemplu cerere GET
```
GET /get HTTP/1.1
Host: httpbin.org
User-Agent: Mozilla/5.0 (...)
Accept: text/html,application/json,*/*
Accept-Language: ro-RO,ro;q=0.9,en-US;q=0.8,en;q=0.7
```

### Header-e de raspuns observate uzual pe endpoint
```
Content-Type: application/json
Server: gunicorn
Date: Sun, 22 Mar 2026 ...
```

### Nota pentru capturi de ecran
Pentru livrabilul cu screenshot-uri:
1. Deschide `https://httpbin.org` in browser.
2. F12 -> `Network`.
3. Selecteaza request-ul `GET /get`.
4. Fa capturi pentru tab-urile `Headers` si `Response`.

## 1.3 Testare Fetch API

Comenzi testate (in consola browser):

```javascript
fetch('https://httpbin.org/get')
    .then(response => response.json())
    .then(data => console.log('GET:', data));

fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nume: 'Mihai', laborator: 3 })
})
    .then(response => response.json())
    .then(data => console.log('POST:', data));
```

Rezultatul asteptat:
- la GET primesti obiect JSON cu `url`, `headers`, `origin`,
- la POST serverul intoarce JSON-ul trimis in campul `json`.

## Fisiere implementate

- `index.html`
- `preferences.html`
- `cookies-info.html`
- `login.html`
- `register.html`
- `dashboard.html`
- `cart.html`
- `style.css`
- `js/cookies.js` (conform cerintei, cod furnizat)
- `js/storage.js` (conform cerintei, cod furnizat)

## Functionalitati implementate pe scurt

- **Index**:
  - mesaj de bun venit bazat pe cookie `username`,
  - contor vizite in cookie `visits`,
  - tema din cookie `theme`,
  - tabele pentru cookies, localStorage, sessionStorage,
  - buton `Sterge Tot`.

- **Preferinte**:
  - setare username + tema in cookies,
  - setare limba + dimensiune font in localStorage,
  - pre-populare formular din datele salvate,
  - mesaj succes + redirect catre `index.html`.

- **Cookies info**:
  - afisare `document.cookie`,
  - tabele detaliate pentru cookies/local/session,
  - stergere individuala pe rand,
  - tabel comparativ cookies vs localStorage vs sessionStorage.

- **Autentificare**:
  - `login.html` cu remember me,
  - utilizatori default initializati automat (daca lipsesc),
  - sesiune in `sessionStorage` (userId, username, email, loginTime, sessionId),
  - `register.html` cu validari complete (unicitate + format + parole).

- **Dashboard**:
  - protectie ruta (redirect la login daca nu exista sesiune),
  - afisare date sesiune,
  - durata sesiune actualizata la fiecare secunda,
  - debug brut pentru sessionStorage,
  - deconectare.

- **Cos**:
  - protectie autentificare,
  - lista produse hard-coded,
  - adaugare in cos cu cantitate 1-10,
  - tabel produse + subtotal + total,
  - stergere pe produs + golire cos,
  - persistenta cos in `sessionStorage` pe cheia `cart`.

## Cum rulezi

1. Deschide `laborator3/index.html` direct in browser (dublu click), sau
2. Ruleaza cu Live Server din VS Code/Cursor: click dreapta pe `laborator3/index.html` → "Open with Live Server".

## Date de test login

- `admin` / `password`
- `student` / `student123`
