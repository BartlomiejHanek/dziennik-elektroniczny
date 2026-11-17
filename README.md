# Dziennik elektroniczny

## Aktualny zakres

Responsywny ekran startowy z formularzami rejestracji i logowania, obsługą sesji oraz wylogowaniem. Po uwierzytelnieniu aplikacja pokazuje krótkie potwierdzenie sesji; dodatkowe moduły dziennika nie są jeszcze częścią projektu.

## Technologie

- **Frontend:** React 19, Vite, Tailwind CSS 4
- **Backend:** Node.js, Express 5
- **Baza danych:** MongoDB Atlas przez Mongoose
- **Haszowanie haseł:** bcryptjs

## Uruchomienie

1. Skopiuj `.env.example` do lokalnego pliku `.env` i uzupełnij dane MongoDB Atlas oraz własny `SESSION_SECRET` (minimum 32 znaki).
2. Zainstaluj zależności poleceniem `npm install`.
3. Uruchom aplikację poleceniem `npm run dev`.
4. Otwórz adres Vite podany w terminalu. Vite przekazuje żądania `/api` do Expressa na porcie 4000.

W trybie produkcyjnym `npm run build` przygotowuje frontend, a `npm start` uruchamia Express, który serwuje zbudowaną aplikację i API.

## Endpointy uwierzytelniania

- `POST /api/auth/register` — tworzy konto na podstawie imienia i nazwiska, e-maila oraz hasła.
- `POST /api/auth/login` — weryfikuje e-mail i hasło.
- `POST /api/auth/logout` — kończy sesję.
- `GET /api/auth/me` — zwraca konto dla aktywnej sesji.

Udana rejestracja lub logowanie ustawia sesyjne ciasteczko `HttpOnly`. Żądania do endpointów są ograniczane do 10 prób na adres IP w ciągu 15 minut.

## Zabezpieczenia

- Hasło jest haszowane przez bcrypt przed zapisem; pole hasła w MongoDB zawiera wyłącznie hash.
- Backend waliduje adres e-mail, długość nazwy i hasła. Frontend pokazuje błędy formularza przed wysłaniem.
- Token sesji trafia do ciasteczka `HttpOnly`, `SameSite=Strict`, ważnego przez 7 dni; w środowisku produkcyjnym ciasteczko wymaga HTTPS.
- Pole `passwordHash` nie jest zwracane przez model użytkownika bez jawnego żądania.
- `.env` jest ignorowany przez Git. Nie umieszczaj haseł ani kluczy w commitach.

## Struktura

```text
src/
  components/       Formularze, pola i panel sesji React
  lib/              Klient API
  App.jsx
  index.css         Tailwind oraz style ekranu startowego
server/
  config/           Połączenie z MongoDB Atlas
  controllers/      Rejestracja, logowanie i sesje
  middleware/       Sesja i ograniczanie prób
  models/           Model użytkownika MongoDB
  routes/           Endpointy API
  app.js
  index.js
```

## Planowane funkcje projektu

Docelowy dziennik może obejmować role ucznia, nauczyciela i administratora, oceny, frekwencję oraz ogłoszenia. Te moduły nie są częścią obecnego zakresu.

## Autorzy

- Bartłomiej Hanek
- Karol Tracz
