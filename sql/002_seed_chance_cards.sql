-- Seed chance_cards — kjør ETTER 001_ranked_migration.sql
BEGIN;

TRUNCATE chance_cards RESTART IDENTITY;

INSERT INTO chance_cards (text, weight, is_sabotage) VALUES
  ('Du løste en bug! Gå 1 steg fremover.', 10, FALSE),
  ('Feil i koden! Gå 1 steg bakover.', 10, FALSE),
  ('Du brukte beste praksis! Gå 2 steg fremover.', 8, FALSE),
  ('Syntax error! Gå 2 steg bakover.', 8, FALSE),
  ('Du lærte noe nytt! Kast terningen på nytt.', 6, FALSE),
  ('Variabelen din inneholder null. Gå 1 steg bakover.', 10, FALSE),
  ('Perfekt testresultat! Gå 2 steg fremover.', 8, FALSE),
  ('Du glemte et semikolon. Gå 1 steg bakover.', 10, FALSE),
  ('Koden din er optimalisert! Gå 3 steg fremover.', 4, FALSE),
  ('Stack overflow! Gå 3 steg bakover.', 4, FALSE),
  ('Du skrev ryddig kode! Gå 1 steg fremover.', 10, FALSE),
  ('Endelig løste du algoritmen! Gå 3 steg fremover.', 4, FALSE),
  ('Debuggingen tok lenger tid enn forventet. Stå over 1 runde.', 5, FALSE),
  ('Du refaktorerte koden! Gå 2 steg fremover.', 8, FALSE),
  ('Runtime error! Stå over 1 runde.', 5, FALSE),
  ('Du implementerte en ny funksjon! Gå 1 steg fremover.', 10, FALSE),
  ('Uendelig løkke! Gå 2 steg bakover.', 8, FALSE),
  ('Alle tester grønn! Gå 2 steg fremover.', 8, FALSE),
  ('Du leste dokumentasjonen! Gå 1 steg fremover.', 10, FALSE),
  ('Memory leak! Gå 1 steg bakover.', 10, FALSE),
  ('Du brukte riktig datatype! Gå 1 steg fremover.', 10, FALSE),
  ('Regex-mønsteret fungerte! Kast terningen på nytt.', 6, FALSE),
  ('Nettleseren krasjet. Stå over 1 runde.', 5, FALSE),
  ('Klasser og arv mestret! Gå 2 steg fremover.', 8, FALSE),
  ('JSON-feil! Gå 1 steg bakover.', 10, FALSE),
  ('API-kallet returnerte success! Gå 3 steg fremover.', 4, FALSE),
  ('Teleport! Flytt til øyen tvers ovenfor.', 4, FALSE),
  ('Kast terning — flytt til øy med det tallet.', 4, FALSE),
  ('🌟 JACKPOT! Få en valgfri badge.', 0.5, FALSE),
  ('SABOTASJE: Du pushet til main uten å teste! En motspiller (du velger) må gå 2 steg bakover.', 2, TRUE),
  ('SABOTASJE: Merge conflict! Velg en motspiller som må stå over 1 runde.', 2, TRUE),
  ('SABOTASJE: Du slettet en annens branch ved et uhell. En motspiller går 3 steg bakover.', 1, TRUE),
  ('SABOTASJE: Du introduserte en bug i teamets kode. Alle andre spillere går 1 steg bakover.', 1, TRUE),
  ('SABOTASJE: Force push! Velg en motspiller som mister sitt neste terningkast.', 2, TRUE),
  ('SABOTASJE: Du kommenterte ut testene. En motspiller (du velger) går 2 steg bakover.', 2, TRUE),
  ('SABOTASJE: DDOS-angrep! Spilleren til venstre for deg står over 1 runde.', 2, TRUE),
  ('SABOTASJE: Du byttet om på variabelnavnene til en motspiller. Velg én som går 2 steg bakover.', 2, TRUE),
  ('SABOTASJE: Produksjonsserveren er nede! Alle andre spillere stopper der de står neste runde.', 1, TRUE),
  ('SABOTASJE: Du stjal kaffen til utvikleren ved siden av. Spilleren til høyre for deg går 1 steg bakover.', 3, TRUE);

COMMIT;
