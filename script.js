/*************************************************
 * 🎯 SPØRSMÅLSDATA (ORIGINALE – RØRES IKKE)
 *************************************************/

const questions = {
  variable: [
    { question: "Hva er en variabel?", answers: ["En navngitt beholder for å lagre informasjon", "En funksjon", "En nettadresse"], correct: 0 },
    { question: "Hva skjer hvis du endrer verdien i en variabel?", answers: ["Den gamle verdien erstattes med den nye", "Begge verdiene lagres", "Variabelen blir slettet"], correct: 0 },
    { question: "Må en variabel ha et navn?", answers: ["Ja, for å kunne bruke den senere", "Nei, den får automatisk navn", "Bare hvis den inneholder tekst"], correct: 0 },
    { question: "Hva er poenget med å bruke variabler i stedet for å skrive verdier direkte?", answers: ["Gjør koden mer fleksibel og lesbar", "Gjør koden raskere", "Gjør det mulig å lagre ukjente verdier"], correct: 0 },
    { question: "Hva kalles det når variabelen får en verdi?", answers: ["Tildeling", "Erklæring", "Konvertering"], correct: 0 },
    { question: "Kan en variabel inneholde både tall og tekst?", answers: ["Ja, alt kan lagres i en variabel", "Nei, bare tall", "Nei, bare tekst"], correct: 0 },
    { question: "Hvis en variabel kalles `navn` og får verdien 'Ole', hva inneholder den?", answers: ["Teksten 'Ole'", "Nummeret 1", "En liste"], correct: 0 },
    { question: "Er det mulig å bruke samme variabel flere ganger?", answers: ["Ja, man kan endre den og bruke den på nytt", "Nei, variabelen blir brukt opp", "Bare hvis den er tom"], correct: 0 },
    { question: "Hva skjer hvis du bruker en variabel uten å ha gitt den en verdi først?", answers: ["Den kan være udefinert eller ha en standardverdi", "Det skjer ingenting", "Den får automatisk verdien 0"], correct: 0 },
    { question: "Hvorfor er det bedre å bruke en variabel for en tall som brukes flere steder?", answers: ["Hvis du må endre tallet, trenger du bare å endre det ett sted", "Variabelen bruker mindre minne", "Det er ikke bedre, bare annerledes"], correct: 0 },
    { question: "Kan du kalle en variabel 'var'?", answers: ["Ja, men det er en reservert nøkkelord i noen språk", "Nei, det er forbudt", "Ja, alltid"], correct: 0 },
    { question: "Hva gjør variabelen lettere å forstå i kode?", answers: ["Den gir en beskrivende navn til en verdi", "Den gjør koden kjøre raskere", "Den lagrer flere verdier samtidig"], correct: 0 },
    { question: "Hvis `x = 5` og så `x = x + 3`, hva er verdien av x nå?", answers: ["8", "5", "3"], correct: 0 },
    { question: "Kan du lagre en annen variabel inne i en variabel?", answers: ["Ja, du kan tilordne en variabels verdi til en annen", "Nei, det er ikke mulig", "Bare hvis de har samme navn"], correct: 0 },
    { question: "Hva kalles en variabel som aldri endrer verdi?", answers: ["En konstant", "En funksjon", "En løkke"], correct: 0 },
    { question: "Er et variabelnavn case-sensitiv (skiller stor og liten bokstav)?", answers: ["Ja, `navn` og `Navn` er ulike variabler", "Nei, de behandles som like", "Bare hvis du bruker tall"], correct: 0 },
    { question: "Hva er betydningen av å deklarere en variabel?", answers: ["Å fortelle programmet at variabelen skal eksistere", "Å gi den en verdi", "Å bruke den i kode"], correct: 0 },
    { question: "Kan du ha mellomrom i et variabelnavn?", answers: ["Nei, bruk vanligvis camelCase eller underscore", "Ja, hvor som helst", "Bare på slutten"], correct: 0 },
    { question: "Hva skjer hvis du skriver ut en variabel som inneholder tallet 10?", answers: ["Den viser tallet 10", "Den viser teksten '10'", "Den gir en feilmelding"], correct: 0 },
    { question: "Er det vanlig å bruke norske bokstaver i variabelnavn?", answers: ["Ikke anbefalt, bruk engelsk i de fleste språk", "Det er helt greit", "Bare hvis det er én bokstav"], correct: 0 }
  ],

  datatype: [
    { question: "Hva er en datatype?", answers: ["En kategori som beskriver hva slags verdi noe kan være", "En variabel", "En feil i koden"], correct: 0 },
    { question: "Hva er forskjellen mellom 5 (tall) og '5' (tekst)?", answers: ["Tall kan brukes i matematikk, tekst er bare tegn", "Det er ingen forskjell", "'5' som tekst er større"], correct: 0 },
    { question: "Hva er en String datatype?", answers: ["Tekst omsluttet av anførselstegn", "En rekke med tall", "En liste av instruksjoner"], correct: 0 },
    { question: "Hva kalles datatypen for sann/usann?", answers: ["Boolean", "True-False", "Logikk"], correct: 0 },
    { question: "Hvis du skriver `var tall = '123'`, hva er datatypen?", answers: ["String (tekst), selv om det ser ut som tall", "Number (tall)", "Ukjent"], correct: 0 },
    { question: "Kan du legge sammen 5 + '5' uten problemer?", answers: ["Det avhenger av språket, ofte blir det tekstsammenslåing", "Ja, det blir 10", "Nei, det gir alltid feil"], correct: 0 },
    { question: "Hva er et Array (liste) datatype?", answers: ["En samling med flere verdier av muligens ulike typer", "En enkelt tekstverdi", "En true/false verdi"], correct: 0 },
    { question: "Hvordan sjekker du datatypen til en variabel i JavaScript?", answers: ["Med typeof operator", "Med getType()", "Du kan ikke sjekke det"], correct: 0 },
    { question: "Hva er et Number datatype?", answers: ["Både hele tall og desimaltall", "Bare hele tall", "Bare desimaltall"], correct: 0 },
    { question: "Hva kalles det når du endrer fra en datatype til en annen?", answers: ["Type konvertering eller casting", "Type endring", "Datatype bytte"], correct: 0 },
    { question: "Er null en datatype?", answers: ["Ja, det representerer 'ingenting' eller 'ingen verdi'", "Nei, det er en feil", "Bare i noen språk"], correct: 0 },
    { question: "Hva skjer hvis du gjør parseInt('123.45')?", answers: ["Det blir 123 (decimaldelen fjernes)", "Det blir 123.45", "Det gir en feil"], correct: 0 },
    { question: "Hva er undefined?", answers: ["En verdi som betyr variabelen finnes men har ingen verdi", "Et tomt objekt", "En feil"], correct: 0 },
    { question: "Kan en String inneholde tall?", answers: ["Ja, som tegn (f.eks. '123' er tekst)", "Nei, bare bokstaver", "Bare hvis det er ett siffer"], correct: 0 },
    { question: "Hva er et Object datatype?", answers: ["En struktur med egenskaper og verdier", "En enkelt verdi", "En feiltype"], correct: 0 },
    { question: "Hvis `x = true`, hva er datatypen?", answers: ["Boolean", "String", "Number"], correct: 0 },
    { question: "Hva gir `'hello' + 'world'`?", answers: ["'helloworld' (tekstsammenslåing)", "En feil", "0"], correct: 0 },
    { question: "Hva er NaN?", answers: ["'Not a Number' - en verdi som representerer en ugyldig talloperasjon", "En null verdi", "Et objekt"], correct: 0 },
    { question: "Kan du multiplisere en String med et Number?", answers: ["Ja, men resultatet avhenger av språket", "Nei, aldri", "Bare i JavaScript"], correct: 0 },
    { question: "Hvorfor er det viktig å kjenne til datatyper?", answers: ["For å unngå uventede feil og forstå hvordan data oppfører seg", "Det er ikke viktig", "Bare for avansert programmering"], correct: 0 }
  ],

  object: [
    { question: "Hva er et objekt i programmering?", answers: ["En struktur som lagrer egenskaper og deres verdier", "En variabel", "En funksjon"], correct: 0 },
{ question: "Hvordan lager du et objekt med egenskapen 'navn' og verdien 'Ole'?", answers: ["{ navn: 'Ole' }", "navn = 'Ole'", "[navn, 'Ole']"], correct: 0 },
{ question: "Hva kalles en egenskap i et objekt?", answers: ["Key (nøkkel) og value (verdi)", "En variabel", "En funksjon"], correct: 0 },
{ question: "Hvordan får du tilgang til en egenskap i et objekt?", answers: ["object.egenskap eller object['egenskap']", "object->egenskap", "object[0]"], correct: 0 },
{ question: "Kan et objekt inneholde funksjoner?", answers: ["Ja, disse kalles metoder", "Nei, bare verdier", "Bare hvis de er enkle"], correct: 0 },
{ question: "Hva er fordelen med å bruke objekter i stedet for mange variabler?", answers: ["Grupperer relatert data sammen og gjør koden mer organisert", "Det gjør koden raskere", "Det sparer minne"], correct: 0 },
{ question: "Hvis du har `person = { navn: 'Kari', alder: 25 }`, hva er person.navn?", answers: ["'Kari'", "25", "person"], correct: 0 },
{ question: "Kan du endre en egenskap i et objekt etter at det er laget?", answers: ["Ja, person.navn = 'Anna' vil endre verdien", "Nei, objekter er låst", "Bare hvis det er tall"], correct: 0 },
{ question: "Hva kalles det når et objekt inneholder et annet objekt?", answers: ["Nesting (innbygging)", "Lagring", "Linking"], correct: 0 },
{ question: "Hva er en Array of Objects?", answers: ["En liste med flere objekter", "Et objekt med lister", "En funksjon"], correct: 0 },
{ question: "Hvis `student = { navn: 'Per', mål: 'A' }`, hvordan legger du til en ny egenskap?", answers: ["student.klasse = '10A'", "student = { klasse: '10A' }", "Du kan ikke"], correct: 0 },
{ question: "Hva er JSON?", answers: ["JavaScript Object Notation - et format for å lagre og overføre data", "En type objekt", "En liste"], correct: 0 },
{ question: "Kan et objekt ha en egenskap som er null?", answers: ["Ja, det representerer 'ingen verdi'", "Nei, det gir feil", "Bare hvis objektet er tomt"], correct: 0 },
{ question: "Hva er poenget med å bruke objekter for å modellere virkeligheten?", answers: ["Det gjør det lettere å tenke på og håndtere kompleks data", "Det gjør det raskere", "Det er ikke nyttig"], correct: 0 },
{ question: "Kan du itere gjennom egenskapene i et objekt?", answers: ["Ja, med for...in løkke eller Object.keys()", "Nei, aldri", "Bare manuelt"], correct: 0 },
{ question: "Hva kalles en egenskap som inneholder en funksjon?", answers: ["En metode", "En property", "En constructor"], correct: 0 },
{ question: "Hvis du har `car = { brand: 'Toyota', start() { ... } }`, hva er start?", answers: ["En metode som kan kjøres", "En egenskap", "En variabel"], correct: 0 },
{ question: "Hvordan lager du en tom objekt?", answers: ["{} eller new Object()", "Empty", "null"], correct: 0 },
{ question: "Kan objekter inneholde boolske verdier som egenskaper?", answers: ["Ja, f.eks. { isActive: true }", "Nei, bare tekst", "Bare tall"], correct: 0 },
{ question: "Hva er fordelen med objekter når du har mange relaterte verdier?", answers: ["Det er mer lesbart og organisert enn separate variabler", "Det er raskere", "Det sparer kode ikke"], correct: 0 }
  ],

  logic: [
    { question: "Hva er logikk i programmering?", answers: ["Et sett av regler som bestemmer hva som skal skje under ulike forhold", "En feil i koden", "En løkke"], correct: 0 },
{ question: "Hva er en if-setning brukt til?", answers: ["Å kjøre kode bare hvis en betingelse er sann", "Å gjenta kode", "Å deklarere variabler"], correct: 0 },
{ question: "Hva betyr `if (x > 5) { ... }`?", answers: ["Kjør koden bare hvis x er større enn 5", "Kjør alltid koden", "Kjør hvis x er mindre enn 5"], correct: 0 },
{ question: "Hva er en else-setning?", answers: ["Kode som kjører hvis if-betingelsen er usann", "En løkke", "En variabel"], correct: 0 },
{ question: "Hva er en betingelse?", answers: ["Et utsagn som kan være sant eller usant", "En funksjon", "En liste"], correct: 0 },
{ question: "Hva gjør operatoren &&?", answers: ["AND - returnerer sant bare hvis begge betingelser er sanne", "OR - returnerer sant hvis minst en er sann", "NOT - inverterer verdien"], correct: 0 },
{ question: "Hva gjør operatoren ||?", answers: ["OR - returnerer sant hvis minst en betingelse er sann", "AND - begge må være sanne", "NOT - inverterer"], correct: 0 },
{ question: "Hva betyr `if (x == 5) { ... }`?", answers: ["Kjør koden hvis x lik 5", "Kjør hvis x ikke er 5", "Kjør hvis x større enn 5"], correct: 0 },
{ question: "Hva er forskjellen mellom == og ===?", answers: ["=== sjekker både verdi og type, == sjekker bare verdi", "De er like", "=== er raskere"], correct: 0 },
{ question: "Hva er en switch-setning?", answers: ["En måte å velge mellom flere mulige verdier", "En løkke", "En variabel"], correct: 0 },
{ question: "Hvis `x = 3` og du sjekker `if (x < 5 && x > 1)`, hva skjer?", answers: ["Koden i if-blokken kjøres (begge betingelser er sanne)", "Koden skips (minst en er usann)", "Det gir en feil"], correct: 0 },
{ question: "Hva er en ternær operator?", answers: ["En kortkort form for if-else: condition ? true : false", "En løkke", "En array"], correct: 0 },
{ question: "Hva gjør `!true`?", answers: ["Returnerer false (negerer verdien)", "Returnerer true", "Gir en feil"], correct: 0 },
{ question: "Hva kalles koden som kjøres inne i en if-blokk?", answers: ["En block eller statement", "En funksjon", "En variabel"], correct: 0 },
{ question: "Kan du ha multiple else-if setninger?", answers: ["Ja, du kan sjekke flere betingelser i rekkefølge", "Nei, bare en if og en else", "Bare med switch"], correct: 0 },
{ question: "Hvis `name = 'Oslo'` og du sjekker `if (name == 'Bergen')`, hva skjer?", answers: ["Hvis-blokken skips (betingelsen er usann)", "Hvis-blokken kjøres", "Det gir en feil"], correct: 0 },
{ question: "Hva er logisk thinking i koding?", answers: ["Å planlegge hvordan data skal flyte gjennom programmet basert på regler", "Å skrive kode raskt", "Å bruke mange if-setninger"], correct: 0 },
{ question: "Hva er det motsatte av `if (x > 5)`?", answers: ["if (x <= 5) eller if (!(x > 5))", "if (x < 5)", "else"], correct: 0 },
{ question: "Kan du kombinere && og || i samme setning?", answers: ["Ja, men pass på rekkefølgen med parenteser", "Nei, velg en", "Bare i noen språk"], correct: 0 },
{ question: "Hva skjer hvis en if-betingelse aldri er sann?", answers: ["Koden i if-blokken kjøres aldri, og programmet fortsetter", "Programmet stopper", "Det gir en feil"], correct: 0 }
  ],

  loop: [
    { question: "Hva er en løkke i programmering?", answers: ["En måte å gjenta kode flere ganger", "En variabel", "En betingelse"], correct: 0 },
{ question: "Hva er en for-løkke?", answers: ["En løkke som kjører et visst antall ganger basert på en teller", "En løkke som kjører mens en betingelse er sann", "En måte å lagre data"], correct: 0 },
{ question: "Hva gjør denne for-løkken: `for (let i = 0; i < 5; i++)`?", answers: ["Kjører 5 ganger (i = 0, 1, 2, 3, 4)", "Kjører uendelig", "Kjører 4 ganger"], correct: 0 },
{ question: "Hva er en while-løkke?", answers: ["En løkke som kjører så lenge en betingelse er sann", "En løkke som kjører et visst antall ganger", "En variabel"], correct: 0 },
{ question: "Hva kalles den første delen av en for-løkke?", answers: ["Initialisering (starter telleren)", "Betingelse", "Inkrementering"], correct: 0 },
{ question: "Hva kalles det når du bruker `i++` i en løkke?", answers: ["Inkrementering (øker verdien)", "Dekrementering", "Initialisering"], correct: 0 },
{ question: "Hva skjer hvis betingelsen i en while-løkke aldri blir usann?", answers: ["Løkken kjører uendelig (infinite loop)", "Løkken stopper etter 10 iterasjoner", "Det gir en feil"], correct: 0 },
{ question: "Hva er break-setningen brukt til i en løkke?", answers: ["Å stoppe løkken før betingelsen blir usann", "Å hoppe over en iterasjon", "Å starte løkken på nytt"], correct: 0 },
{ question: "Hva er continue-setningen brukt til?", answers: ["Å hoppe over resten av iterasjonen og gå til neste", "Å stoppe løkken", "Å starte på nytt"], correct: 0 },
{ question: "Hva er en forEach-løkke?", answers: ["En løkke som itererer gjennom hver element i en array", "En løkke som kjører ett antall ganger", "En while-løkke"], correct: 0 },
{ question: "Hvis du har `for (let i = 0; i < 3; i++)` og du skriver `console.log(i)`, hva vises?", answers: ["0, 1, 2", "1, 2, 3", "0, 1, 2, 3"], correct: 0 },
{ question: "Hva er en nested loop?", answers: ["En løkke inni en annen løkke", "En løkke som aldri slutter", "En forEach"], correct: 0 },
{ question: "Hva er en do-while løkke?", answers: ["En løkke som kjører minst en gang før den sjekker betingelsen", "En vanlig while-løkke", "En for-løkke"], correct: 0 },
{ question: "Når bruker du while vs for?", answers: ["for når du vet hvor mange ganger, while når det avhenger av betingelse", "De er like", "Bare while"], correct: 0 },
{ question: "Hva gjør `for (let i = 10; i > 0; i--)`?", answers: ["Teller ned fra 10 til 1", "Teller opp fra 10", "Gir en feil"], correct: 0 },
{ question: "Kan du bruke en løkke til å fylle en array?", answers: ["Ja, du kan legge til elementer i hver iterasjon", "Nei, arrays er statiske", "Bare manuelt"], correct: 0 },
{ question: "Hva er fordelen med løkker?", answers: ["Du unngår gjentakelse og koden blir kortere og lettere å vedlikeholde", "Løkkker er raskere", "De bruker mindre minne"], correct: 0 },
{ question: "Hvis en array har 5 elementer, hvor mange ganger kjøres en forEach?", answers: ["5 ganger (en gang per element)", "4 ganger", "Det avhenger av betingelsen"], correct: 0 },
{ question: "Hva skjer hvis du legger break i en nested loop?", answers: ["Bare den innerste løkken stopper", "Alle løkker stopper", "Ingenting"], correct: 0 },
{ question: "Er løkker essensielle i programmering?", answers: ["Ja, de brukes for å håndtere gjentakende oppgaver", "Nei, du kan skrive alt manuelt", "Bare i kompleks kode"], correct: 0 }
  ],

  debug: [
    { question: "Hva er debugging?", answers: ["Prosessen med å finne og fikse feil (bugs) i kode", "Å skrive ny kode", "Å slette feilaktig kode"], correct: 0 },
{ question: "Hva er en bug?", answers: ["En feil i koden som gjør at programmet oppfører seg uventet", "En type variabel", "Et verktøy"], correct: 0 },
{ question: "Hva er en syntax error?", answers: ["En feil i skrivemåten av koden (stavefeil, manglende tegn)", "En logisk feil", "En kjøretidfeil"], correct: 0 },
{ question: "Hva er en logic error?", answers: ["Når koden kjører men gjør noe annet enn det som var ment", "En stavefeil", "En runtime feil"], correct: 0 },
{ question: "Hva bruker du console.log() til?", answers: ["Å skrive ut verdier for å se hva koden gjør", "Å lagre data", "Å kjøre funksjoner"], correct: 0 },
{ question: "Hvis en funksjon returnerer undefined, hva kan være problemet?", answers: ["Funksjonen mangler return-setning eller returnerer ingenting", "Variabelen er for stor", "Det er en loop"], correct: 0 },
{ question: "Hva er en breakpoint?", answers: ["Et punkt der debuggeren stopper programmet så du kan inspisere verdier", "En feil i koden", "En løkke"], correct: 0 },
{ question: "Hva gjør du først når du får en feilmelding?", answers: ["Leser feilmeldingen nøye for å forstå hvor feilen er", "Sletter koden", "Starter helt på nytt"], correct: 0 },
{ question: "Hva er et error stack trace?", answers: ["En liste som viser hvor feilen oppstod og hvilke funksjoner som var involvert", "En type variabel", "En løkke"], correct: 0 },
{ question: "Hvis `x = 5` men programmet sier `x is not defined`, hva kan være problemet?", answers: ["Variabelen ble ikke deklarert eller er utenfor scope", "Verdien er feil", "Det er en loop"], correct: 0 },
{ question: "Hva er test-driven development?", answers: ["Å skrive tester før koden for å fange bugs tidlig", "Å debugge etter at alt er ferdig", "Å skrive manuell dokumentasjon"], correct: 0 },
{ question: "Hva gjør console.error() vs console.log()?", answers: ["error() viser normalt rødt og brukes for feilmeldinger", "De gjør det samme", "error() brukes bare for loops"], correct: 0 },
{ question: "Hva er en runtime error?", answers: ["En feil som oppstår når programmet kjører (ikke under skriving)", "En stavefeil", "En designfeil"], correct: 0 },
{ question: "Hvis en løkke kjører uendelig, hva kan være feilen?", answers: ["Betingelsen blir aldri usann eller break-setningen mangler", "Løkken er for stor", "Det er for mange variabler"], correct: 0 },
{ question: "Hvordan debugger du en array som ikke inneholder forventet data?", answers: ["Bruk console.log() for å se innholdet, sjekk hvor elementer legges til", "Oppgi en ny array", "Slett hele programmet"], correct: 0 },
{ question: "Hva er try-catch brukt til?", answers: ["Å håndtere feil som kan oppstå uten at programmet krasjer", "Å lagre data", "Å deklarere variabler"], correct: 0 },
{ question: "Hvis en funksjon returnerer null i stedet for en verdi, hva kan være galt?", answers: ["Funksjonen returnerer ingenting eller sjekker feil betingelse", "Variabelen er tom", "Det er en type error"], correct: 0 },
{ question: "Hva er DRY-prinsippet (Don't Repeat Yourself) i forhold til bugs?", answers: ["Gjentatt kode lager flere steder der bugs kan gjemme seg", "Det betyr ingenting", "Det handler om løkker"], correct: 0 },
{ question: "Hvordan finner du feil i kode uten en debugger?", answers: ["Lese koden nøye, bruke console.log(), eller tegne det ut på papir", "Prøv bare kjøre det", "Spør AI"], correct: 0 },
{ question: "Hva er en best practice ved debugging?", answers: ["Isoler problemet og test en liten del av gangen", "Endre alle variabler samtidig", "Kjør alt en gang til"], correct: 0 }
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

