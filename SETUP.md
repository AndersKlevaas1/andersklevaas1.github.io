# Ranked Code Island — Setup

Denne guiden tar deg gjennom de manuelle stegene for å få ranked multiplayer opp å kjøre.

## 1. Kjør SQL-migrasjonen

I Supabase Dashboard → SQL Editor, kjør i rekkefølge:

1. [sql/001_ranked_migration.sql](sql/001_ranked_migration.sql) — schema, RLS, functions
2. [sql/002_seed_chance_cards.sql](sql/002_seed_chance_cards.sql) — sjansekort
3. [sql/003_seed_questions.sql](sql/003_seed_questions.sql) — ~170 spørsmål

Hvis 001 feiler, les feilen og fiks før du kjører 002/003.

## 2. Slå på Google OAuth i Supabase

### 2a. Google Cloud Console
1. Gå til https://console.cloud.google.com/
2. Opprett et prosjekt (eller bruk eksisterende)
3. APIs & Services → Credentials → **Create Credentials → OAuth client ID**
4. Application type: **Web application**
5. Authorized redirect URIs — legg til:
   ```
   https://ozsgwukldmqbfhxdpdzx.supabase.co/auth/v1/callback
   ```
6. Kopier **Client ID** og **Client Secret**

### 2b. Supabase Dashboard
1. Authentication → Providers → **Google**
2. Enable
3. Lim inn Client ID og Client Secret
4. Save

### 2c. URL Configuration
Authentication → URL Configuration:
- **Site URL:** `https://andersklevaas1.github.io`
- **Redirect URLs** (add both for lokal test og deploy):
  ```
  https://andersklevaas1.github.io/UI-DESIGN-PROSJEKT/**
  http://localhost:*/**
  ```

## 3. Deploy til GitHub Pages

1. Push til `main`:
   ```bash
   git add .
   git commit -m "Ranked multiplayer"
   git push origin main
   ```
2. GitHub repo → Settings → **Pages**
3. Source: `main` branch, `/` (root)
4. Vent ~1 min, siden ligger på:
   ```
   https://andersklevaas1.github.io/UI-DESIGN-PROSJEKT/
   ```

## 4. Test-sjekkliste

Åpne siden i **Chrome** + **Chrome Incognito** (to forskjellige Google-kontoer):

- [ ] Logg inn på begge
- [ ] Begge trykker "Finn ranked match" → pares innen få sek
- [ ] Velg øy → spørsmål dukker opp
- [ ] Svar riktig → badge +1, turn bytter
- [ ] Svar feil → turn bytter uten badge
- [ ] Trekk sjansekort → tekst vises
- [ ] Først til 6 badges → match avsluttes, ELO oppdateres
- [ ] Leaderboard viser oppdaterte tall

### Angrepstester (DevTools console)
Disse SKAL feile:
```js
// 1. Fasit skal være skjult
await sb.from('questions').select('*')
// Forventet: tom liste / permission denied

// 2. ELO-manipulasjon skal blokkeres
await sb.from('profiles').update({ elo: 9999 }).eq('id', (await sb.auth.getUser()).data.user.id)
// Forventet: feil pga WITH CHECK-policy

// 3. Sette vinner direkte skal blokkeres
await sb.from('matches').update({ winner_id: (await sb.auth.getUser()).data.user.id })
// Forventet: permission denied
```

Hvis én av disse returnerer suksess — STOPP og fix RLS før du deployer offentlig.

## 5. Valgfritt: forfeit cron

For auto-forfeit av disconnected spillere, sett opp en cron job i Supabase:

Dashboard → Database → **Cron Jobs** → New cron job:
- Name: `forfeit_stale_matches`
- Schedule: `*/1 * * * *` (hvert minutt)
- SQL: `SELECT forfeit_stale_matches();`
