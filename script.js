/*************************************************
 * 🎯 SPØRSMÅLSDATA (ORIGINALE – RØRES IKKE)
 *************************************************/

console.log("✅ script.js lastet!");

const questions = {
  variable: [
    { question: "Hva er en variabel?", answers: ["En beholder for data", "En feilmelding", "En nettadresse"], correct: 0 },
    { question: "Hva skjer hvis du endrer verdien i en variabel?", answers: ["Den erstattes", "Begge lagres", "Den blir slettet"], correct: 0 },
    { question: "Må en variabel ha et navn?", answers: ["Ja", "Nei automatisk", "Bare for tekst"], correct: 0 },
    { question: "Hva er poenget med variabler?", answers: ["Fleksibel kode", "Gjør det raskere", "Lagre ukjent"], correct: 0 },
    { question: "Hva kalles det når variabelen får en verdi?", answers: ["Tildeling", "Erklæring", "Konvertering"], correct: 0 },
    { question: "Kan en variabel inneholde både tall og tekst?", answers: ["Ja, alt", "Nei, tall kun", "Nei, tekst kun"], correct: 0 },
    { question: "Hvis `navn = 'Ole'`, hva inneholder den?", answers: ["'Ole'", "Nummer 1", "En liste"], correct: 0 },
    { question: "Kan du bruke samme variabel flere ganger?", answers: ["Ja", "Nei", "Bare hvis tom"], correct: 0 },
    { question: "Hva skjer hvis du bruker en variabel uten verdi?", answers: ["Undefined", "Ingenting", "Verdien 0"], correct: 0 },
    { question: "Hvorfor variabler når tallet brukes flere steder?", answers: ["Enklere å endre", "Mindre minne", "Ikke bedre"], correct: 0 },
    { question: "Kan du kalle variabel 'var'?", answers: ["Reservert ord", "Forbudt", "Ja alltid"], correct: 0 },
    { question: "Hva gjør variabelen lettere å forstå?", answers: ["Beskrivende navn", "Kjører raskere", "Flere verdier"], correct: 0 },
    { question: "Hvis `x = 5; x = x + 3`, hva er x?", answers: ["8", "5", "3"], correct: 0 },
    { question: "Kan du tilordne en variabel til en annen?", answers: ["Ja", "Nei", "Samme navn kun"], correct: 0 },
    { question: "Hva kalles en variabel som ikke endres?", answers: ["Konstant", "Funksjon", "Løkke"], correct: 0 },
    { question: "Er variabelnavn case-sensitiv?", answers: ["Ja", "Nei", "Tall kun"], correct: 0 },
    { question: "Hva betyr å deklarere en variabel?", answers: ["Erklære den", "Gi den verdi", "Bruke den"], correct: 0 },
    { question: "Kan variabelnavn ha mellomrom?", answers: ["Nei", "Ja", "Bare slutten"], correct: 0 },
    { question: "Hvis `x = 10`, hva vises?", answers: ["10", "'10'", "Feil"], correct: 0 },
    { question: "Norske bokstaver i variabelnavn?", answers: ["Ikke anbefalt", "Greit", "En bokstav kun"], correct: 0 }
  ],

  datatype: [
    { question: "Hva er en datatype?", answers: ["Verdi-kategori", "En variabel", "Feil i koden"], correct: 0 },
    { question: "Hva er forskjellen mellom 5 og '5'?", answers: ["Tall vs tekst", "Ingen", "'5' større"], correct: 0 },
    { question: "Hva er String?", answers: ["Tekst", "Tall", "Liste"], correct: 0 },
    { question: "Hva kalles sann/usann?", answers: ["Boolean", "True-False", "Logikk"], correct: 0 },
    { question: "`tall = '123'` - type?", answers: ["String", "Number", "Ukjent"], correct: 0 },
    { question: "5 + '5'?", answers: ["Tekstsammenslåing", "10", "Feil"], correct: 0 },
    { question: "Hva er Array?", answers: ["Liste", "Tall", "Text"], correct: 0 },
    { question: "Type i JavaScript?", answers: ["typeof", "getType()", "Umulig"], correct: 0 },
    { question: "Hva er Number?", answers: ["Tall", "Hele tall", "Desimal"], correct: 0 },
    { question: "Å endre type heter?", answers: ["Konvertering", "Type endring", "Bytte"], correct: 0 },
    { question: "null er type?", answers: ["Ja", "Nei", "Bare noen"], correct: 0 },
    { question: "parseInt('123.45')?", answers: ["123", "123.45", "Feil"], correct: 0 },
    { question: "Hva er undefined?", answers: ["Ingen verdi", "Tomt objekt", "Feil"], correct: 0 },
    { question: "String med tall?", answers: ["Ja", "Nei", "Ett kun"], correct: 0 },
    { question: "Hva er Object?", answers: ["Egenskaper", "Enkelt verdi", "Feiltype"], correct: 0 },
    { question: "`x = true`?", answers: ["Boolean", "String", "Number"], correct: 0 },
    { question: "'hello' + 'world'?", answers: ["'helloworld'", "Feil", "0"], correct: 0 },
    { question: "Hva er NaN?", answers: ["Ugyldig tall", "Null verdi", "Objekt"], correct: 0 },
    { question: "String × Number?", answers: ["Avhengig", "Nei", "JS kun"], correct: 0 },
    { question: "Hvorfor kjenne typer?", answers: ["Unngå feil", "Ikke viktig", "Avansert kun"], correct: 0 }
  ],

  object: [
    { question: "Hva er objekt?", answers: ["Egenskaper og verdier", "Variabel", "Funksjon"], correct: 0 },
    { question: "{ navn: 'Ole' }?", answers: ["Objekt", "Array", "String"], correct: 0 },
    { question: "Hva er key?", answers: ["Nøkkel", "Verdi", "Feil"], correct: 0 },
    { question: "Få tilgang?", answers: ["obj.prop", "obj->prop", "obj[0]"], correct: 0 },
    { question: "Objekt med funksjon?", answers: ["Ja, metoder", "Nei", "Bare enkle"], correct: 0 },
    { question: "Objekt fordel?", answers: ["Organisert data", "Raskere", "Mindre minne"], correct: 0 },
    { question: "person.navn?", answers: ["'Kari'", "25", "person"], correct: 0 },
    { question: "Endre egenskap?", answers: ["Ja", "Nei låst", "Bare tall"], correct: 0 },
    { question: "Objekt i objekt?", answers: ["Nesting", "Lagring", "Linking"], correct: 0 },
    { question: "Array av objekter?", answers: ["Liste", "Objekt med lister", "Funksjon"], correct: 0 },
    { question: "Legge til egenskap?", answers: ["obj.prop = verdi", "obj = {prop}", "Umulig"], correct: 0 },
    { question: "Hva er JSON?", answers: ["Dataformat", "Objekt type", "Liste"], correct: 0 },
    { question: "Objekt med null?", answers: ["Ja", "Nei feil", "Bare tomt"], correct: 0 },
    { question: "Modellere virkelighet?", answers: ["Enklere", "Raskere", "Ikke nyttig"], correct: 0 },
    { question: "Itere gjennom?", answers: ["for...in loop", "Aldri", "Manuelt"], correct: 0 },
    { question: "Funksjon i objekt?", answers: ["Metode", "Property", "Constructor"], correct: 0 },
    { question: "Hva er start()?", answers: ["Metode", "Egenskap", "Variabel"], correct: 0 },
    { question: "Tom objekt?", answers: ["{}", "Empty", "null"], correct: 0 },
    { question: "Boolske verdier?", answers: ["Ja", "Bare tekst", "Bare tall"], correct: 0 },
    { question: "Objekter beste?", answers: ["Lesbart", "Raskere", "Ikke bedre"], correct: 0 }
  ],

  logic: [
    { question: "Hva er logikk i kode?", answers: ["Regler for hva som skjer", "En feil", "En løkke"], correct: 0 },
    { question: "Hva gjør if?", answers: ["Kjør kode hvis noe er sant", "Gjenta kode", "Lagre data"], correct: 0 },
    { question: "Hva er else?", answers: ["Kjør hvis if ikke er sant", "En løkke", "En variabel"], correct: 0 },
    { question: "Hva er en betingelse?", answers: ["Noe som er sant eller usant", "En funksjon", "En liste"], correct: 0 },
    { question: "Kan kode kjøre bare noen ganger?", answers: ["Ja, med if", "Nei, alltid", "Bare i løkker"], correct: 0 },
    { question: "Hva betyr 'hvis' i kode?", answers: ["Sjekk om noe er sant", "Gjenta", "Stopp"], correct: 0 },
    { question: "Er if nyttig?", answers: ["Ja, for valg", "Nei", "Bare for tall"], correct: 0 },
    { question: "Kan else brukes alene?", answers: ["Nei, trenger if", "Ja", "Bare noen ganger"], correct: 0 },
    { question: "Hva skjer hvis betingelsen er usann?", answers: ["Else kjører", "If kjører", "Ingenting"], correct: 0 },
    { question: "Er logikk viktig i programmering?", answers: ["Ja", "Nei", "Bare for eksperter"], correct: 0 },
    { question: "Kan vi ha flere if?", answers: ["Ja", "Nei", "Bare én"], correct: 0 },
    { question: "Hva er et valg i kode?", answers: ["If eller else", "Løkke", "Variabel"], correct: 0 },
    { question: "Er betingelser enkle?", answers: ["Ja", "Nei", "Bare komplekse"], correct: 0 },
    { question: "Kan kode ta beslutninger?", answers: ["Ja, med logikk", "Nei", "Bare mennesker"], correct: 0 },
    { question: "Hva gjør 'ellers'?", answers: ["Kjør alternativ kode", "Gjenta", "Stopp"], correct: 0 },
    { question: "Er if som et spørsmål?", answers: ["Ja", "Nei", "Bare svar"], correct: 0 },
    { question: "Kan logikk gjøre kode smartere?", answers: ["Ja", "Nei", "Bare tregere"], correct: 0 },
    { question: "Hva er grunnen til å bruke if?", answers: ["For å velge hva som skjer", "For å lagre", "For å telle"], correct: 0 },
    { question: "Er else nødvendig?", answers: ["Nei, valgfritt", "Ja alltid", "Bare i løkker"], correct: 0 },
    { question: "Kan betingelser være enkle?", answers: ["Ja, som sant/usant", "Nei", "Bare tall"], correct: 0 }
  ],

  loop: [
    { question: "Hva er en løkke?", answers: ["Gjenta kode flere ganger", "En variabel", "En betingelse"], correct: 0 },
    { question: "Hvorfor bruker vi løkker?", answers: ["For å unngå å skrive samme kode mange ganger", "For å lagre data", "For å stoppe kode"], correct: 0 },
    { question: "Hva gjør en for-løkke?", answers: ["Gjenta et visst antall ganger", "Gjenta mens noe er sant", "Lagre informasjon"], correct: 0 },
    { question: "Hva gjør en while-løkke?", answers: ["Gjenta mens betingelsen er sant", "Gjenta et antall ganger", "En variabel"], correct: 0 },
    { question: "Kan løkker hjelpe med telling?", answers: ["Ja", "Nei", "Bare for tekst"], correct: 0 },
    { question: "Er løkker nyttige?", answers: ["Ja, for repetisjon", "Nei", "Bare for eksperter"], correct: 0 },
    { question: "Hva skjer hvis løkken stopper?", answers: ["Koden fortsetter videre", "Alt stopper", "Løkken starter på nytt"], correct: 0 },
    { question: "Kan løkker brukes i spill?", answers: ["Ja", "Nei", "Bare i matte"], correct: 0 },
    { question: "Er løkker en del av programmering?", answers: ["Ja", "Nei", "Bare i avansert kode"], correct: 0 },
    { question: "Kan løkker gjøre kode kortere?", answers: ["Ja", "Nei", "Lengre"], correct: 0 },
    { question: "Hva er en enkel løkke?", answers: ["Gjenta noen ganger", "En feil", "En betingelse"], correct: 0 },
    { question: "Brukes løkker ofte?", answers: ["Ja", "Nei", "Bare noen ganger"], correct: 0 },
    { question: "Kan løkker telle ned?", answers: ["Ja", "Nei", "Bare opp"], correct: 0 },
    { question: "Hva er fordel med løkker?", answers: ["Mindre arbeid", "Mer feil", "Tregere kode"], correct: 0 },
    { question: "Er løkker vanskelige?", answers: ["Nei", "Ja", "Bare for barn"], correct: 0 },
    { question: "Kan løkker brukes på lister?", answers: ["Ja", "Nei", "Bare på tall"], correct: 0 },
    { question: "Hva gjør 'gjenta' i løkker?", answers: ["Kjør kode igjen", "Stopp", "Start"], correct: 0 },
    { question: "Er løkker som en sykkel?", answers: ["Ja, runde etter runde", "Nei", "Bare en gang"], correct: 0 },
    { question: "Kan løkker stoppe tidlig?", answers: ["Ja", "Nei", "Alltid ferdig"], correct: 0 },
    { question: "Er løkker grunnleggende?", answers: ["Ja", "Nei", "Kun avansert"], correct: 0 }
  ],

  debug: [
    { question: "Hva er debugging?", answers: ["Finne og fikse feil i kode", "Skrive ny kode", "Slette kode"], correct: 0 },
    { question: "Hva er en bug?", answers: ["En feil i programmet", "En variabel", "Et verktøy"], correct: 0 },
    { question: "Hvorfor fikser vi feil?", answers: ["For at koden skal fungere", "For å gjøre den tregere", "For moro skyld"], correct: 0 },
    { question: "Kan kode ha feil?", answers: ["Ja", "Nei", "Bare noen ganger"], correct: 0 },
    { question: "Hva gjør vi når koden ikke fungerer?", answers: ["Se etter feil", "Skrive om alt", "Gi opp"], correct: 0 },
    { question: "Er debugging viktig?", answers: ["Ja", "Nei", "Bare for eksperter"], correct: 0 },
    { question: "Kan vi bruke console.log for å finne feil?", answers: ["Ja", "Nei", "Bare for tekst"], correct: 0 },
    { question: "Hva er en enkel feil?", answers: ["Noe som ikke fungerer som forventet", "En løkke", "En variabel"], correct: 0 },
    { question: "Hvorfor tester vi kode?", answers: ["For å finne feil tidlig", "For å gjøre den lengre", "For å stoppe"], correct: 0 },
    { question: "Kan feil være små?", answers: ["Ja", "Nei", "Bare store"], correct: 0 },
    { question: "Hva betyr 'fikse'?", answers: ["Gjør koden riktig", "Slett", "Start på nytt"], correct: 0 },
    { question: "Er debugging vanskelig?", answers: ["Nei", "Ja", "Bare for barn"], correct: 0 },
    { question: "Kan vi lære av feil?", answers: ["Ja", "Nei", "Bare glemme"], correct: 0 },
    { question: "Hva er første steg ved feil?", answers: ["Les meldingen", "Slett alt", "Kjør igjen"], correct: 0 },
    { question: "Er feil normale?", answers: ["Ja", "Nei", "Bare for nybegynnere"], correct: 0 },
    { question: "Kan debugging ta tid?", answers: ["Ja", "Nei", "Alltid raskt"], correct: 0 },
    { question: "Hva gjør vi etter å ha funnet feilen?", answers: ["Fiks den", "Ignorer", "Legg til flere"], correct: 0 },
    { question: "Er debugging en del av programmering?", answers: ["Ja", "Nei", "Bare i spill"], correct: 0 },
    { question: "Kan vi bruke verktøy for debugging?", answers: ["Ja", "Nei", "Bare manuelt"], correct: 0 },
    { question: "Hvorfor er debugging nyttig?", answers: ["Gjør kode bedre", "Gjør den verre", "Ingenting"], correct: 0 }
  ]
};

/*************************************************
 * 🎴 ARBEIDSBUNKER (INGEN GJENTAKELSE)
 *************************************************/

const decks = {};
for (let island in questions) {
  decks[island] = [...questions[island]];
}

/*************************************************
 * 🔀 SHUFFLE FUNKSJON
 *************************************************/

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/*************************************************
 * 🎲 SJANSEKORT BANK
 *************************************************/

const chanceCards = [
  "Du løst en bug! Gå ett steg fremover.",
  "Feil i koden! Gå ett steg bakover.",
  "Du brukte beste praksis! Trekk et ekstra kort.",
  "Syntax error! Gå bakover 2 steg.",
  "Du lærte noe nytt! Dobbelslag - kast på nytt.",
  "Variabelen din inneholder null. Hopp bakover.",
  "Perfekt testresultat! Gå fremover 2 steg.",
  "Du glemte et semikolon. Gå bakover 1 steg.",
  "Koden din er optimalisert! Trekk to kort.",
  "Stack overflow! Gå bakover 3 steg.",
  "Du skrev ryddig kode! +1 ekstra trekk.",
  "Endelig løste du algoritmens! Gå fremover 3 steg.",
  "Debuggingen tok lenger tid enn forventet. Vit stille 1 runde.",
  "Du refaktorerte koden! Gå fremover 2 steg.",
  "Runtime error! Mist ett trekk.",
  "Du implementerte en ny funksjon! Gå 1 steg forover.",
  "Uendelig løkke! Gå bakover 2 steg.",
  "Alle tester var grønn! Trekk 2 kort.",
  "Du leste dokumentasjonen! +1 ekstra poeng.",
  "Memory leak! Gå bakover 1 steg.",
  "Du brukte riktig datatype! Gå fremover.",
  "Regex-mønsteret fungerte! Dobbelslag.",
  "Bruk en annen nettleser. Vit stille.",
  "Klasser og arving meisket! Gå 2 steg fremover.",
  "JSON-feil! Vend et kort til.",
  "API-kallet returnerte success! Gå fremover 3."
];

/*************************************************
 * 🏝️ VELG ØY
 *************************************************/

function chooseIsland(island) {
  if (decks[island].length === 0) {
    decks[island] = [...questions[island]];
  }

  const randomIndex = Math.floor(Math.random() * decks[island].length);
  const question = decks[island][randomIndex];
  decks[island].splice(randomIndex, 1);

  showQuestion(question);
}

/*************************************************
 * ❓ VIS SPØRSMÅL (MED RANDOM SVARREKKEFØLGE)
 *************************************************/

function showQuestion(question) {
  document.getElementById("questionBox").classList.remove("hidden");
  document.getElementById("questionText").innerText = question.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  const answers = question.answers.map((text, index) => ({
    text,
    originalIndex: index
  }));

  shuffleArray(answers);

  answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-btn");

    button.onclick = function () {
      // Fjern gamle ikoner hvis man klikker flere ganger
      const oldIcon = button.querySelector(".feedback-icon");
      if (oldIcon) oldIcon.remove();

      const icon = document.createElement("span");
      icon.classList.add("feedback-icon");

      if (answer.originalIndex === question.correct) {
        icon.innerText = "✔";
        icon.classList.add("correct-icon");
      } else {
        icon.innerText = "✖";
        icon.classList.add("wrong-icon");
      }

      button.appendChild(icon);

      // Fjern ikonet etter 3 sek
      setTimeout(() => {
        icon.remove();
      }, 3000);
    };

    answersDiv.appendChild(button);
  });
}

/*************************************************
 * 🎲 TREKK SJANSEKORT
 *************************************************/

function drawChanceCard() {
  const randomIndex = Math.floor(Math.random() * chanceCards.length);
  const card = chanceCards[randomIndex];
  
  const box = document.getElementById("chanceCardBox");
  box.classList.remove("hidden");
  document.getElementById("chanceCardText").innerText = card;
  
  window.scrollTo(0, box.offsetTop - 50);
}

/*************************************************
 * 🎲 LUKK SJANSEKORT
 *************************************************/

function closeChanceCard() {
  document.getElementById("chanceCardBox").classList.add("hidden");
}