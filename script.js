/*************************************************
 * 🎯 SPØRSMÅLSDATA (ORIGINALE – RØRES IKKE)
 *************************************************/

const questions = {

  // 📦 VARIABEL
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
    { question: "Kan variabler brukes i spill?", answers: ["Ja", "Nei", "Bare i matte"], correct: 0 },
    { question: "Er variabler nyttige i hverdagslogikk?", answers: ["Ja", "Nei", "Kun i kode"], correct: 0 },
    { question: "Kan variabler gjøre kode enklere?", answers: ["Ja", "Nei", "Mer komplisert"], correct: 0 },
    { question: "Er variabler noe man lærer tidlig?", answers: ["Ja", "Nei", "Kun senere"], correct: 0 }
  ],

  // 🔤 DATATYPE
  datatype: [
    { question: "Hva beskriver en datatype?", answers: ["Hva slags informasjon noe er", "Hvor rask koden er", "Hvor pen nettsiden er"], correct: 0 },
    { question: "Er tekst en datatype?", answers: ["Ja", "Nei", "Bare noen ganger"], correct: 0 },
    { question: "Er tall en datatype?", answers: ["Ja", "Nei", "Kun i matte"], correct: 0 },
    { question: "Er sann/usann en datatype?", answers: ["Ja", "Nei", "Bare i spill"], correct: 0 },
    { question: "Hvorfor trenger vi datatyper?", answers: ["For å forstå data", "For å gjøre koden lengre", "For moro skyld"], correct: 0 },
    { question: "Er 'Hei' tekst?", answers: ["Ja", "Nei", "Et tall"], correct: 0 },
    { question: "Er 10 et tall?", answers: ["Ja", "Nei", "Tekst"], correct: 0 },
    { question: "Er true tekst?", answers: ["Nei", "Ja", "Begge deler"], correct: 0 },
    { question: "Er datatyper viktige?", answers: ["Ja", "Nei", "Kun på eksamen"], correct: 0 },
    { question: "Brukes datatyper i variabler?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
    { question: "Kan en variabel ha ulik datatype?", answers: ["Ja", "Nei", "Kun én gang"], correct: 0 },
    { question: "Er tall og tekst det samme?", answers: ["Nei", "Ja", "Noen ganger"], correct: 0 },
    { question: "Er datatype noe vi bestemmer?", answers: ["Ja", "Nei", "Datamaskinen alltid"], correct: 0 },
    { question: "Hjelper datatyper datamaskinen?", answers: ["Ja", "Nei", "Bare litt"], correct: 0 },
    { question: "Er datatyper vanskelige?", answers: ["Nei", "Ja", "Bare for lærere"], correct: 0 },
    { question: "Er datatyper en del av programmering?", answers: ["Ja", "Nei", "Kun i JavaScript"], correct: 0 },
    { question: "Kan tekst og tall behandles ulikt?", answers: ["Ja", "Nei", "Alltid likt"], correct: 0 },
    { question: "Kan datatyper hjelpe oss å unngå feil?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
    { question: "Er datatyper noe man lærer tidlig?", answers: ["Ja", "Nei", "Kun senere"], correct: 0 },
    { question: "Er datatyper nyttige?", answers: ["Ja", "Nei", "Ikke egentlig"], correct: 0 }
  ],

  // 🧱 OBJEKT
  object: [
    { question: "Hva er et objekt?", answers: ["En samling med informasjon", "En løkke", "En feilmelding"], correct: 0 },
    { question: "Kan et objekt inneholde flere verdier?", answers: ["Ja", "Nei", "Bare én"], correct: 0 },
    { question: "Brukes objekter til å samle ting?", answers: ["Ja", "Nei", "Bare i spill"], correct: 0 },
    { question: "Kan et objekt beskrive en person?", answers: ["Ja", "Nei", "Bare tall"], correct: 0 },
    { question: "Kan objekter gjøre kode ryddigere?", answers: ["Ja", "Nei", "Mer rotete"], correct: 0 },
    { question: "Kan objekter ha navn på verdier?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
    { question: "Er objekter en del av programmering?", answers: ["Ja", "Nei", "Kun avansert"], correct: 0 },
    { question: "Kan objekter brukes til struktur?", answers: ["Ja", "Nei", "Bare pynt"], correct: 0 },
    { question: "Kan objekter inneholde tekst?", answers: ["Ja", "Nei", "Bare tall"], correct: 0 },
    { question: "Kan objekter inneholde tall?", answers: ["Ja", "Nei", "Bare tekst"], correct: 0 },
    { question: "Kan objekter inneholde ulike typer data?", answers: ["Ja", "Nei", "Kun én type"], correct: 0 },
    { question: "Er objekter nyttige?", answers: ["Ja", "Nei", "Bare store programmer"], correct: 0 },
    { question: "Er objekter vanskelige å forstå?", answers: ["Nei", "Ja", "Alltid"], correct: 0 },
    { question: "Kan objekter brukes i spill?", answers: ["Ja", "Nei", "Bare i matte"], correct: 0 },
    { question: "Er objekter grunnleggende?", answers: ["Ja", "Nei", "Kun ekstra"], correct: 0 },
    { question: "Kan objekter hjelpe oss å organisere data?", answers: ["Ja", "Nei", "Bare litt"], correct: 0 },
    { question: "Kan objekter gjøre programmer enklere?", answers: ["Ja", "Nei", "Mer komplisert"], correct: 0 },
    { question: "Er objekter noe man lærer tidlig?", answers: ["Ja", "Nei", "Kun senere"], correct: 0 },
    { question: "Brukes objekter ofte i kode?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
    { question: "Er objekter nyttige for struktur?", answers: ["Ja", "Nei", "Ikke egentlig"], correct: 0 }
  ],

  // 🧠 LOGIKK
  logic: [
    { question: "Hva handler logikk om?", answers: ["Å ta valg", "Å lagre tekst", "Å lage feil"], correct: 0 },
    { question: "Brukes logikk når noe er sant eller usant?", answers: ["Ja", "Nei", "Bare noen ganger"], correct: 0 },
    { question: "Handler logikk om beslutninger?", answers: ["Ja", "Nei", "Om farger"], correct: 0 },
    { question: "Kan logikk styre hva som skjer?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
    { question: "Er logikk viktig i programmering?", answers: ["Ja", "Nei", "Bare i spill"], correct: 0 },
    { question: "Bruker vi logikk i hverdagen?", answers: ["Ja", "Nei", "Bare på data"], correct: 0 },
    { question: "Kan logikk gjøre kode smartere?", answers: ["Ja", "Nei", "Dummere"], correct: 0 },
    { question: "Handler logikk om regler?", answers: ["Ja", "Nei", "Om bilder"], correct: 0 },
    { question: "Kan logikk styre flyt?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
    { question: "Er logikk vanskelig?", answers: ["Nei", "Ja", "Alltid"], correct: 0 },
    { question: "Er logikk en grunnidé?", answers: ["Ja", "Nei", "Kun ekstra"], correct: 0 },
    { question: "Kan logikk hjelpe oss å ta riktige valg?", answers: ["Ja", "Nei", "Tilfeldig"], correct: 0 },
    { question: "Kan logikk brukes i spill?", answers: ["Ja", "Nei", "Bare i matte"], correct: 0 },
    { question: "Er logikk nyttig?", answers: ["Ja", "Nei", "Ikke egentlig"], correct: 0 },
    { question: "Er logikk bare for eksperter?", answers: ["Nei", "Ja", "Kun lærere"], correct: 0 },
    { question: "Kan logikk gjøre programmer mer forståelige?", answers: ["Ja", "Nei", "Mer forvirrende"], correct: 0 },
    { question: "Kan logikk brukes uten kode?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
    { question: "Handler logikk om årsak og virkning?", answers: ["Ja", "Nei", "Om farger"], correct: 0 },
    { question: "Brukes logikk i nesten all kode?", answers: ["Ja", "Nei", "Bare av og til"], correct: 0 },
    { question: "Er logikk noe man lærer tidlig?", answers: ["Ja", "Nei", "Kun senere"], correct: 0 }
  ],

  // 🔁 LØKKE
  loop: [
    { question: "Hva betyr å gjenta noe?", answers: ["Å gjøre noe flere ganger", "Å stoppe", "Å slette"], correct: 0 },
    { question: "Hva brukes løkker til?", answers: ["Å gjenta handlinger", "Å lagre tekst", "Å vise feil"], correct: 0 },
    { question: "Er løkker nyttige?", answers: ["Ja", "Nei", "Bare i spill"], correct: 0 },
    { question: "Brukes løkker én gang?", answers: ["Nei", "Ja", "Alltid"], correct: 0 },
    { question: "Kan løkker spare tid?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
    { question: "Handler løkker om gjentakelse?", answers: ["Ja", "Nei", "Om farger"], correct: 0 },
    { question: "Kan løkker brukes i spill?", answers: ["Ja", "Nei", "Bare i matte"], correct: 0 },
    { question: "Er løkker vanskelige?", answers: ["Nei", "Ja", "Alltid"], correct: 0 },
    { question: "Kan løkker stoppe av seg selv?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
    { question: "Finnes løkker i mange språk?", answers: ["Ja", "Nei", "Bare ett"], correct: 0 },
    { question: "Er løkker viktige å forstå?", answers: ["Ja", "Nei", "Ikke nødvendig"], correct: 0 },
    { question: "Gjør løkker kode kortere?", answers: ["Ja", "Nei", "Lengre"], correct: 0 },
    { question: "Er løkker en grunnidé?", answers: ["Ja", "Nei", "Kun ekstra"], correct: 0 },
    { question: "Kan løkker gjenta tekst?", answers: ["Ja", "Nei", "Bare tall"], correct: 0 },
    { question: "Kan løkker gjenta handlinger?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
    { question: "Er løkker bare for datamaskiner?", answers: ["Nei", "Ja", "Kun roboter"], correct: 0 },
    { question: "Brukes løkker i hverdagen?", answers: ["Ja", "Nei", "Kun på data"], correct: 0 },
    { question: "Er det lurt å lære løkker tidlig?", answers: ["Ja", "Nei", "Bare senere"], correct: 0 },
    { question: "Er løkker nyttige i mange programmer?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
    { question: "Kan løkker gjøre programmer enklere?", answers: ["Ja", "Nei", "Mer komplisert"], correct: 0 }
  ],

  // 🐞 DEBUG
  debug: [
    { question: "Hva betyr feil i kode?", answers: ["Noe virker ikke", "Alt fungerer", "Koden er ferdig"], correct: 0 },
    { question: "Hva gjør debugging?", answers: ["Finner feil", "Lager feil", "Sletter kode"], correct: 0 },
    { question: "Er det normalt å få feil?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
    { question: "Er feil en del av læring?", answers: ["Ja", "Nei", "Bare for nybegynnere"], correct: 0 },
    { question: "Hva gjør man når noe ikke virker?", answers: ["Finne feilen", "Gi opp", "Slette alt"], correct: 0 },
    { question: "Er debugging viktig?", answers: ["Ja", "Nei", "Kun i store programmer"], correct: 0 },
    { question: "Kan alle gjøre feil?", answers: ["Ja", "Nei", "Kun nybegynnere"], correct: 0 },
    { question: "Er feil farlig?", answers: ["Nei", "Ja", "Alltid"], correct: 0 },
    { question: "Kan man lære av feil?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
    { question: "Er feil vanlig i programmering?", answers: ["Ja", "Nei", "Kun av og til"], correct: 0 },
    { question: "Kan feil rettes?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
    { question: "Er debugging en ferdighet?", answers: ["Ja", "Nei", "Bare flaks"], correct: 0 },
    { question: "Er debugging bare for eksperter?", answers: ["Nei", "Ja", "Kun lærere"], correct: 0 },
    { question: "Er det lov å gjøre feil?", answers: ["Ja", "Nei", "Kun første gang"], correct: 0 },
    { question: "Hjelper debugging oss å lære?", answers: ["Ja", "Nei", "Ikke egentlig"], correct: 0 },
    { question: "Kan feil være små?", answers: ["Ja", "Nei", "Alltid store"], correct: 0 },
    { question: "Kan feil være nyttige?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
    { question: "Er debugging en del av koding?", answers: ["Ja", "Nei", "Kun testing"], correct: 0 },
    { question: "Skjer feil ofte i kode?", answers: ["Ja", "Nei", "Aldri"], correct: 0 },
    { question: "Er feil noe alle møter?", answers: ["Ja", "Nei", "Bare noen"], correct: 0 }
  ]
};

/*************************************************
 * 🎴 ARBEIDSBUNKER (TILFELDIG, INGEN GJENTAKELSE)
 *************************************************/

const decks = {};

for (let island in questions) {
  decks[island] = [...questions[island]];
}

/*************************************************
 * 🏝️ VELG ØY
 *************************************************/
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

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
 * ❓ VIS SPØRSMÅL
 *************************************************/

function showQuestion(question) {
  document.getElementById("questionBox").classList.remove("hidden");
  document.getElementById("questionText").innerText = question.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  // Lag en kopi av svarene med original indeks
  const answers = question.answers.map((text, index) => ({
    text: text,
    originalIndex: index
  }));

  // Randomiser rekkefølgen
  shuffleArray(answers);

  answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;

    button.onclick = function () {
      if (answer.originalIndex === question.correct) {
        alert("✅ Riktig!");
      } else {
        alert("❌ Ikke helt riktig – prøv igjen.");
      }
    };

    answersDiv.appendChild(button);
  });
}
