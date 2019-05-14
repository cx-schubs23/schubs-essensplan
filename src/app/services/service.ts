import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Gericht } from '../classes/gericht';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})

export class Service {

  private apiUrl: string;
  private imageUrl: string;

  constructor(private http: HttpClient, private datePipe: DatePipe) {
    const url: string = 'https://cx-schubsit-api.azurewebsites.net/';
    this.apiUrl = url + 'api/';
    this.imageUrl = url + 'images/';
  }

  /**
   * Lädt die Hauptgerichte für das angegebene Datum.
   * @param datum Das Datum, für das die Gerichte geladen werden sollen.
   */
  ladeHauptgerichte(datum: Date): Observable<Gericht[]> {
    return this.ladeGerichte(datum, 'haupt');
  }

  /**
   * Lädt die Beilagen für das angegebene Datum.
   * @param datum Das Datum, für das die Gerichte geladen werden sollen.
   */
  ladeBeilagen(datum: Date): Observable<Gericht[]> {
    return this.ladeGerichte(datum, 'beilagen');
  }

  private ladeGerichte(datum: Date, typ?: string): Observable<Gericht[]> {

    if(datum == undefined)
      return of([]);

    let datumText = this.datePipe.transform(datum, "yyyy-MM-dd");
    let url = this.apiUrl + `speiseplan/datum/${datumText}`;

    if (typ !== undefined) {
      url += `/${typ}`;
    }

    return this.http.get<Gericht[]>(url)
      .pipe(catchError(this.handleError<Gericht[]>("ladeGerichte datum: " + datumText)));
  }

  /**
   * Behandelt eine fehlgeschlagene HTTP-Operation
   * Lässt die App weiter laufen.
   * @param fehlerMeldung - Name der Fehlgeschlagenen Operation.
   * @param result - Optionaler Wert, der die default-Rückgabe festlegt.
   */
  private handleError<T>(fehlerMeldung = 'operation', result?: T) {
    return (fehler: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(fehlerMeldung + fehler); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * Lädt das Gericht mit der angegebenen ID vom Server.
   * @param id - Die ID, zu der das zugehörige Gericht gesucht werden soll.
   */
  ladeGericht(id: number): Observable<Gericht> {
    return this.http.get<Gericht>(this.apiUrl + 'gericht/' + id)
      .pipe(catchError(this.handleError<Gericht>("ladeGericht id: " + id)));
  }

  /**
   * Wandelt den angegebenen Pfad in einen absoluten Pfad um.
   * @param pfad - Der zu prüfende relative oder absolute Pfad.
   */
  getBildPfad(pfad: string): string {
    if (pfad != null) {
      if (pfad.startsWith('http://') || pfad.startsWith('https://')) {
        return pfad;
      } else {
        return this.imageUrl + pfad;
      }
    } else {
      return '../../assets/defaultEssen.jpg';
    }
  }

  /**
   * Prüft, ob die angegebene Kategorie andeutet, dass es sich um ein Hauptgericht handelt.
   * @param kategorie - Die zu prüfende Kategorie.
   */
  isHauptGericht(kategorie: string): boolean {
    return kategorie.search("Hauptspeise") !== -1;
  }
}