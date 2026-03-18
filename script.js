/*************************************************
 * 🎯 SPØRSMÅLSDATA (ORIGINALE – RØRES IKKE)
 *************************************************/

const questions = {
  variable: [
    { question: "Hva er en variabel?", answers: ["En måte å lagre informasjon på", "En feilmelding", "En nettside"], correct: 0 },
    { question: "Hva kan en variabel inneholde?", answers: ["Informasjon", "Bare tall", "Bare tekst"], correct: 0 },
    { question: "Hvorfor bruker vi variabler?", answers: ["For å huske verdier", "For å gjøre koden tregere", "For å lage feil"], correct: 0 },
    { question: "Kan en variabel endres?", answers: ["Ja", "Nei", "Bare på tirsdager"], correct: 0 },
    { question: "Trenger variabler et navn?", answers: ["Ja", "Nei", "Noen ganger"], correct: 0 },
    { question: "Kan en variabel lagre tekst?", answers: ["Ja", "Nei", "Bare tall"], correct: 0 },
    { question: "Kan en variabel lagre tall?", answers: ["Ja", "Nei", "Bare tekst"], correct: 0 },
    { question: "Er variabler nyttige?", answers: ["Ja", "Nei", "Bare i store programmer"], correct: 0 },
    { question: "Kan to variabler ha samme verdi?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
    { question: "Er variabler grunnleggende i koding?", answers: ["Ja", "Nei", "Kun avansert"], correct: 0 },
    { question: "Brukes variabler kun én gang?", answers: ["Nei", "Ja", "Bare i spill"], correct: 0 },
    { question: "Kan variabler hjelpe oss å huske data?", answers: ["Ja", "Nei", "Bare datamaskinen"], correct: 0 },
    { question: "Er variabler bare for eksperter?", answers: ["Nei", "Ja", "Kun lærere"], correct: 0 },
    { question: "Kan variabler brukes flere steder?", answers: ["Ja", "Nei", "Bare én gang"], correct: 0 },
    { question: "Kan variabler endre verdi over tid?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
    { question: "Er variabler en del av programmering?", answers: ["Ja", "Nei", "Bare i spill"], correct: 0 },
    { question: "Kan variabler gjøre kode enklere?", answers: ["Ja", "Nei", "Mer komplisert"], correct: 0 },
    { question: "Er variabler noe man lærer tidlig?", answers: ["Ja", "Nei", "Kun senere"], correct: 0 }
  ],

  datatype: [
    { question: "Hva beskriver en datatype?", answers: ["Hva slags informasjon noe er", "Hvor rask koden er", "Hvor pen nettsiden er"], correct: 0 },
    { question: "Er tekst en datatype?", answers: ["Ja", "Nei", "Bare noen ganger"], correct: 0 },
    { question: "Er tall en datatype?", answers: ["Ja", "Nei", "Kun i matte"], correct: 0 },
    { question: "Er sann/usann en datatype?", answers: ["Ja", "Nei", "Bare i spill"], correct: 0 },
    { question: "Er 'Hei' tekst?", answers: ["Ja", "Nei", "Et tall"], correct: 0 },
    { question: "Er 10 et tall?", answers: ["Ja", "Nei", "Tekst"], correct: 0 },
    { question: "Er datatyper viktige?", answers: ["Ja", "Nei", "Kun på eksamen"], correct: 0 },
    { question: "Brukes datatyper i variabler?", answers: ["Ja", "Nei", "Aldri"], correct: 0 }
  ],

  object: [
    { question: "Brukes objekter til å samle informasjon på ett sted?", answers: ["Ja", "Nei", "Bare i spill"], correct: 0 },
{ question: "Kan et objekt beskrive en ting, for eksempel en person?", answers: ["Ja", "Nei", "Bare tall"], correct: 0 },
{ question: "Kan et objekt ha flere deler med informasjon?", answers: ["Ja", "Nei", "Bare én del"], correct: 0 },
{ question: "Er objekter nyttige for å holde orden på data?", answers: ["Ja", "Nei", "Ikke nødvendig"], correct: 0 },
{ question: "Kan et objekt inneholde både tekst og tall?", answers: ["Ja", "Nei", "Kun én type"], correct: 0 },
{ question: "Er objekter en del av programmering?", answers: ["Ja", "Nei", "Kun i spill"], correct: 0 },
{ question: "Kan objekter gjøre det lettere å forstå koden?", answers: ["Ja", "Nei", "Mer forvirrende"], correct: 0 },
{ question: "Kan et objekt brukes til å beskrive noe med flere egenskaper?", answers: ["Ja", "Nei", "Bare én egenskap"], correct: 0 },
{ question: "Bruker vi objekter for å organisere informasjon?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
{ question: "Er objekter laget for å holde sammen informasjon som hører til hverandre?", answers: ["Ja", "Nei", "Bare noen ganger"], correct: 0 }
  ],

  logic: [
    { question: "Hva gjør vi når programmet ikke virker som det skal?", answers: ["Leter etter feilen", "Slår av PC-en", "Sletter alt"], correct: 0 },
{ question: "Er det vanlig at kode må fikses?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
{ question: "Hva kaller vi det når vi retter feil i kode?", answers: ["Debugging", "Lagring", "Design"], correct: 0 },
{ question: "Kan små feil gjøre at koden stopper?", answers: ["Ja", "Nei", "Bare store feil"], correct: 0 },
{ question: "Er feil en naturlig del av programmering?", answers: ["Ja", "Nei", "Kun for nybegynnere"], correct: 0 },
{ question: "Hva er første steg når noe ikke virker?", answers: ["Sjekke hva som er galt", "Gi opp", "Starte på nytt"], correct: 0 },
{ question: "Kan man bli bedre av å rette feil?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
{ question: "Er debugging noe alle programmerere gjør?", answers: ["Ja", "Nei", "Bare eksperter"], correct: 0 },
{ question: "Kan feil i kode være enkle å rette?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
{ question: "Er det viktig å forstå hvorfor noe gikk galt?", answers: ["Ja", "Nei", "Ikke nødvendig"], correct: 0 }
  ],

  loop: [
    { question: "Når noe skjer om og om igjen, hva gjør vi i koding?", answers: ["Bruker en løkke", "Sletter koden", "Stopper programmet"], correct: 0 },
{ question: "Kan en løkke brukes til å gjøre samme oppgave mange ganger?", answers: ["Ja", "Nei", "Bare én gang"], correct: 0 },
{ question: "Er en løkke laget for ting som skjer flere ganger?", answers: ["Ja", "Nei", "Kun i spill"], correct: 0 },
{ question: "Hva passer best når noe skal gjentas mange ganger?", answers: ["En løkke", "En variabel", "En feilmelding"], correct: 0 },
{ question: "Kan en løkke gjøre jobben raskere for oss?", answers: ["Ja", "Nei", "Gjør det tregere"], correct: 0 },
{ question: "Er løkker en måte å spare tid på i koding?", answers: ["Ja", "Nei", "Ikke nødvendig"], correct: 0 },
{ question: "Kan en løkke gjøre noe helt automatisk flere ganger?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
{ question: "Er løkker nyttige når vi slipper å skrive samme kode mange ganger?", answers: ["Ja", "Nei", "Bare noen ganger"], correct: 0 },
{ question: "Kan løkker brukes når noe må gjøres i riktig rekkefølge flere ganger?", answers: ["Ja", "Nei", "Bare én gang"], correct: 0 },
{ question: "Er løkker laget for oppgaver som gjentas?", answers: ["Ja", "Nei", "Kun for tall"], correct: 0 }
  ],

  debug: [
    { question: "Hva gjør vi når programmet ikke virker som det skal?", answers: ["Leter etter feilen", "Slår av PC-en", "Sletter alt"], correct: 0 },
{ question: "Er det vanlig at kode må fikses?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
{ question: "Hva kaller vi det når vi retter feil i kode?", answers: ["Debugging", "Lagring", "Design"], correct: 0 },
{ question: "Kan små feil gjøre at koden stopper?", answers: ["Ja", "Nei", "Bare store feil"], correct: 0 },
{ question: "Er feil en naturlig del av programmering?", answers: ["Ja", "Nei", "Kun for nybegynnere"], correct: 0 },
{ question: "Hva er første steg når noe ikke virker?", answers: ["Sjekke hva som er galt", "Gi opp", "Starte på nytt"], correct: 0 },
{ question: "Kan man bli bedre av å rette feil?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
{ question: "Er debugging noe alle programmerere gjør?", answers: ["Ja", "Nei", "Bare eksperter"], correct: 0 },
{ question: "Kan feil i kode være enkle å rette?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
{ question: "Er det viktig å forstå hvorfor noe gikk galt?", answers: ["Ja", "Nei", "Ikke nødvendig"], correct: 0 }
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

