# Integrasjon: Supabase i Code Island

## Steg 1: Legg til supabase-client.js i prosjektet

1. Kopier `supabase-client.js` til mappen din `/UI-DESIGN-PROSJEKT/`
2. I `index.html`, legg til før `script.js`:

```html
<script src="supabase-client.js"></script>
<script src="script.js"></script>
```

## Steg 2: Test at det funker

Åpne nettleseren, gå til konsollen (F12), og skriv:

```javascript
supabase.getLeaderboard()
```

Hvis det printer en liste med profiler, funker det!

## Steg 3: Integrer med script.js

Her er eksempler på hvordan du bruker `supabase`-objektet i `script.js`:

### Hent spørsmål fra Supabase istedenfor hardkodede

**Før (localhost):**
```javascript
const questions = {
  easy: [ { question: "...", options: [...], correct: 0 }, ... ]
}
```

**Etter (Supabase):**
```javascript
async function loadQuestions() {
  const easyQuestions = await supabase.getQuestionsByDifficulty('easy');
  const mediumQuestions = await supabase.getQuestionsByDifficulty('medium');
  const hardQuestions = await supabase.getQuestionsByDifficulty('hard');
  
  // Bruk disse istedenfor hardkodede
  return { easy: easyQuestions, medium: mediumQuestions, hard: hardQuestions };
}
```

### Sjekk om bruker er logget inn

```javascript
if (supabase.user) {
  console.log('Logget inn som:', supabase.user.email);
} else {
  console.log('Ikke logget inn');
}
```

### Hent brukerens profil

```javascript
async function getUserProfile() {
  const profile = await supabase.getProfile(supabase.user.id);
  console.log('ELO:', profile.elo);
  console.log('Matcher spilt:', profile.matches_played);
}
```

### Oppdater badges under en match

```javascript
async function updateBadges(matchId, playerASide, badgesCount) {
  await supabase.updateMatch(matchId, {
    player_a_badges: badgesCount, // eller player_b_badges
  });
}
```

### Opprett en ny match

```javascript
async function startRankedMatch(opponentId) {
  const match = await supabase.createMatch(supabase.user.id, opponentId);
  console.log('Match opprettet:', match.id);
  return match;
}
```

### Hent leaderboard

```javascript
async function showLeaderboard() {
  const leaderboard = await supabase.getLeaderboard(100);
  leaderboard.forEach((player, index) => {
    console.log(`${index + 1}. ${player.username} - ELO: ${player.elo}`);
  });
}
```

## Steg 4: Deploy til GitHub Pages

1. Commit alt til GitHub:
   ```bash
   git add .
   git commit -m "Supabase integration"
   git push origin main
   ```

2. GitHub Pages deployer automatisk
3. Gå til `https://[ditt-brukernavn].github.io/UI-DESIGN-PROSJEKT/`
4. Du kan nå lese/skrive til Supabase fra GitHub Pages! 🎉

## Neste steg: Multiplayer

Når du vil implementere faktisk multiplayer (WebSocket, matchmaking), trenger du:

- **Edge Functions** i Supabase for server-side logikk (ELO-beregning, anti-cheat)
- **Realtime subscriptions** for live match-oppdateringer
- **Auth** integrasjon (Google login eller magic-link)

Men for nå kan du:
- ✅ Lese/skrive data fra frontend
- ✅ Teste at databasen er sikker (RLS)
- ✅ Bygge UI for profiler, leaderboard, osv

Si fra når du vil implementere neste fase!
