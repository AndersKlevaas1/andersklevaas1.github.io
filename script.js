/*************************************************
 * 🎯 SPØRSMÅLSDATA (ORIGINALE – RØRES IKKE)
 *************************************************/

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
    { question: "Hva er logikk?", answers: ["Regler for hva som skal skje", "Feil i koden", "Løkke"], correct: 0 },
    { question: "if-setning brukt til?", answers: ["Kjør hvis sant", "Gjenta kode", "Deklarer variabel"], correct: 0 },
    { question: "if (x > 5)?", answers: ["Kjør hvis sant", "Alltid", "Hvis mindre"], correct: 0 },
    { question: "Hva er else?", answers: ["Kjør hvis usant", "Løkke", "Variabel"], correct: 0 },
    { question: "Hva er betingelse?", answers: ["Sant eller usant", "Funksjon", "Liste"], correct: 0 },
    { question: "Hva gjør &&?", answers: ["AND", "OR", "NOT"], correct: 0 },
    { question: "Hva gjør ||?", answers: ["OR", "AND", "NOT"], correct: 0 },
    { question: "== vs ===?", answers: ["Type sjekk", "Samme", "=== raskere"], correct: 0 },
    { question: "switch-setning?", answers: ["Velg verdier", "Løkke", "Variabel"], correct: 0 },
    { question: "x=3, x<5&&x>1?", answers: ["Kjøres", "Hoppet", "Feil"], correct: 0 },
    { question: "Ternær operator?", answers: ["condition ? true : false", "Løkke", "Array"], correct: 0 },
    { question: "!true?", answers: ["false", "true", "Feil"], correct: 0 },
    { question: "Kode i if-blokk?", answers: ["Block", "Funksjon", "Variabel"], correct: 0 },
    { question: "Flere else-if?", answers: ["Ja", "Nei kun", "Med switch"], correct: 0 },
    { question: "name='Oslo', if oslo?", answers: ["Hoppes", "Kjøres", "Feil"], correct: 0 },
    { question: "Logisk tenking?", answers: ["Planlegge data", "Raskt", "Mange if"], correct: 0 },
    { question: "Motsatt av x>5?", answers: ["x<=5", "x<5", "else"], correct: 0 },
    { question: "Kombiner &&||?", answers: ["Ja med parentes", "Nei velg", "Bare noen"], correct: 0 },
    { question: "if aldri sant?", answers: ["Hoppes", "Stopper", "Feil"], correct: 0 },
    { question: "Logikk viktig?", answers: ["Ja essensielt", "Nei ikke", "Bare kompleks"], correct: 0 }
  ],

  loop: [
    { question: "Hva er løkke?", answers: ["Gjenta kode", "Variabel", "Betingelse"], correct: 0 },
    { question: "Hva er for-løkke?", answers: ["Visst antall ganger", "Mens sant", "Lagre data"], correct: 0 },
    { question: "for(let i=0;i<5;i++)?", answers: ["5 ganger", "Uendelig", "4 ganger"], correct: 0 },
    { question: "Hva er while-løkke?", answers: ["Mens sant", "Visst antall", "Variabel"], correct: 0 },
    { question: "Første del for?", answers: ["Initialisering", "Betingelse", "Inkrementering"], correct: 0 },
    { question: "Hva er i++?", answers: ["Inkrementering", "Dekrementering", "Initialisering"], correct: 0 },
    { question: "while aldri usann?", answers: ["Uendelig", "Etter 10", "Feil"], correct: 0 },
    { question: "break i løkke?", answers: ["Stopper", "Hopp over", "Start på nytt"], correct: 0 },
    { question: "continue?", answers: ["Hopp over iteration", "Stopp", "Start"], correct: 0 },
    { question: "Hva er forEach?", answers: ["Alle elementer", "Visst antall", "while"], correct: 0 },
    { question: "console.log(i) i for?", answers: ["0, 1, 2", "1, 2, 3", "0, 1, 2, 3"], correct: 0 },
    { question: "Hva er nested loop?", answers: ["Løkke i løkke", "Aldri stopper", "forEach"], correct: 0 },
    { question: "Hva er do-while?", answers: ["Minst en gang", "Vanlig while", "for"], correct: 0 },
    { question: "while vs for?", answers: ["for visst, while betingelse", "Samme", "Bare while"], correct: 0 },
    { question: "for(i=10;i>0;i--)?", answers: ["Teller ned", "Teller opp", "Feil"], correct: 0 },
    { question: "Løkke fylle array?", answers: ["Ja", "Nei statisk", "Manuelt"], correct: 0 },
    { question: "Løkker fordel?", answers: ["Unngå repetisjon", "Raskere", "Mindre minne"], correct: 0 },
    { question: "5 elementer forEach?", answers: ["5 ganger", "4 ganger", "Avhengig"], correct: 0 },
    { question: "break i nested?", answers: ["Innerste stopper", "Alle stopper", "Ingenting"], correct: 0 },
    { question: "Løkker essensielt?", answers: ["Ja", "Nei manuelt", "Bare kompleks"], correct: 0 }
  ],

  debug: [
    { question: "Hva er debugging?", answers: ["Finne og fikse feil", "Skrive ny kode", "Slett feil"], correct: 0 },
    { question: "Hva er bug?", answers: ["Feil i kode", "Variabel type", "Verktøy"], correct: 0 },
    { question: "Syntax error?", answers: ["Skrivefeil", "Logisk feil", "Runtime feil"], correct: 0 },
    { question: "Logic error?", answers: ["Gjør noe annet", "Stavefeil", "Runtime feil"], correct: 0 },
    { question: "console.log() brukt til?", answers: ["Skrive ut verdier", "Lagre data", "Kjør funksjon"], correct: 0 },
    { question: "Funksjon returnerer undefined?", answers: ["Mangler return", "Variabel stor", "Er løkke"], correct: 0 },
    { question: "Hva er breakpoint?", answers: ["Stopp for inspeksjon", "Feil", "Løkke"], correct: 0 },
    { question: "Første ved feil?", answers: ["Les feilmelding", "Slett kode", "Start på nytt"], correct: 0 },
    { question: "Stack trace?", answers: ["Feil-plassering", "Variabel type", "Løkke"], correct: 0 },
    { question: "x=5, 'not defined'?", answers: ["Utenfor scope", "Verdien feil", "Er løkke"], correct: 0 },
    { question: "Test-driven dev?", answers: ["Tester før koden", "Debugg slutt", "Dokumenter"], correct: 0 },
    { question: "console.error()?", answers: ["Rødt error", "Som log()", "Bare loops"], correct: 0 },
    { question: "Runtime error?", answers: ["Mens kjøring", "Stavefeil", "Design feil"], correct: 0 },
    { question: "Uendelig løkke?", answers: ["Betingelse aldri usann", "For stor", "Mange vars"], correct: 0 },
    { question: "Debug array?", answers: ["console.log() innhold", "Ny array", "Slett alt"], correct: 0 },
    { question: "Try-catch brukt til?", answers: ["Håndtere feil", "Lagre data", "Deklarer var"], correct: 0 },
    { question: "Funksjon returnerer null?", answers: ["Ingenting returnert", "Variabel tom", "Type error"], correct: 0 },
    { question: "DRY-prinsippet?", answers: ["Gjentakelse gjemmer bugs", "Betyr ingenting", "For løkker"], correct: 0 },
    { question: "Uten debugger?", answers: ["Les nøye", "Prøv kjøre", "Spør AI"], correct: 0 },
    { question: "Best practice?", answers: ["Isoler problem", "Endre alle", "Kjør igjen"], correct: 0 }
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
  "API-kallet returnerte success! Gå fremover 3.",
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
  // Trekk et tilfeldig kort fra banken
  const randomIndex = Math.floor(Math.random() * chanceCards.length);
  const card = chanceCards[randomIndex];
  
  // Vis kortet
  document.getElementById("chanceCardBox").classList.remove("hidden");
  document.getElementById("chanceCardText").innerText = card;
  
  // Scroll til kortet
  document.getElementById("chanceCardBox").scrollIntoView({ behavior: "smooth", block: "center" });
}

/*************************************************
 * 🎲 LUKK SJANSEKORT
 *************************************************/

function closeChanceCard() {
  document.getElementById("chanceCardBox").classList.add("hidden");
}
