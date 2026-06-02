# ✈️ Mapa Podróży

Prosta statyczna aplikacja do śledzenia odwiedzonych krajów z wizualizacją na mapie świata. Działa w całości w przeglądarce, hostowana na GitHub Pages.

## 🚀 Jak uruchomić własną kopię

### 1. Zrób fork repozytorium

Kliknij przycisk **Fork** w prawym górnym rogu tej strony na GitHubie.  
Zostanie utworzona Twoja własna kopia pod adresem:

```text
https://github.com/TWÓJ-LOGIN/NAZWA-REPO
```

### 2. Włącz GitHub Pages

W Twoim forku wejdź w:  
**Settings → Pages → Source → Deploy from a branch → `main` / `root`**

Po chwili strona będzie dostępna pod adresem:

```text
https://TWÓJ-LOGIN.github.io/NAZWA-REPO
```

### 3. Utwórz Personal Access Token (PAT)

Wejdź na [github.com/settings/tokens](https://github.com/settings/tokens) i utwórz **Fine-grained token**:

| Ustawienie | Wartość |
| --- | --- |
| **Repository access** | tylko Twoje repozytorium z mapą |
| **Contents** | Read and write |

Skopiuj token — zobaczysz go tylko raz.

### 4. Skonfiguruj aplikację

Otwórz swoją stronę na GitHub Pages, kliknij **⚙️ GitHub** w nagłówku i wpisz:

- **Użytkownik GitHub** — Twój login
- **Nazwa repozytorium** — nazwa Twojego forka
- **PAT** — token z kroku 3

Ustawienia są zapisane wyłącznie w localStorage Twojej przeglądarki — token nigdzie nie jest przesyłany poza GitHub API.

### 5. Używanie

- Kliknij kraj na mapie lub wybierz z listy → wypełnij formularz → **Zapisz kraj**
- Kliknij **☁️ Zapisz na GitHub** → dane.json jest commitowany do Twojego repozytorium
- GitHub Pages odświeża się automatycznie po kilkudziesięciu sekundach

---

## 📁 Struktura plików

```text
├── index.html   # cała aplikacja (HTML + CSS + JS)
├── dane.json    # Twoje dane o podróżach
└── README.md
```

Jedynym plikiem który się zmienia podczas użytkowania jest **`dane.json`**.

---

## ❓ Często zadawane pytania

**Czy moje dane są prywatne?**  
Zależy od widoczności repozytorium. Jeśli repo jest publiczne, `dane.json` jest publicznie dostępny. Jeśli chcesz zachować prywatność — ustaw repozytorium jako **prywatne** (GitHub Pages działa też z prywatnymi repo na darmowym planie).

**Czy token PAT jest bezpieczny?**  
Token jest przechowywany tylko w `localStorage` Twojej przeglądarki i wysyłany wyłącznie do GitHub API (`api.github.com`). Nie jest zawarty w kodzie aplikacji ani nigdzie nie jest logowany. Dla bezpieczeństwa utwórz token z dostępem tylko do jednego repozytorium (fine-grained).

**Czy działa bez konfiguracji GitHub?**  
Tak — możesz używać przycisku **⬇ Eksportuj dane.json lokalnie**, a plik ręcznie wgrać do repozytorium.

**Czy mogę używać na kilku urządzeniach?**  
Tak, ale konfigurację (login, repo, token) musisz ustawić osobno na każdym urządzeniu. Dane są zawsze pobierane z `dane.json` w repozytorium, więc są zsynchronizowane.
