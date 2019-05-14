/**
 * Enthält die Daten, die zur Darstellung eines Gerichts benötigt und vom Server geladen werden.
 */
export class Gericht {

  /**
   * Die Bezeichnung der Speise (z.B. 'Spaghetti Bolognese').
   */
  Bezeichnung: string;

  /**
   * Der Pfad zum Bild der Speise. Kann relativ sein.
   */
  ImagePfad: string;

  /**
   * Die Datenbank-ID der Speise.
   */
  ID: number;

  /**
   * Die für die Speise hinterlegte Kategorie. z.B. '1. Hauptgericht'
   */
  Kategorie: string;

  /**
   * Der Preis des Gerichts als Zahl, z.b. 6.9
   */
  Preis: number;
}