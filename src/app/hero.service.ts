import { Injectable } from '@angular/core';
import { Hero } from './heroes/hero';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesURL = 'api/heroes';

constructor(
  private messageService: MessageService,
  private http: HttpClient
  ) { }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

  private handleError<T> (operation = 'operation', result?: T){
    return(error: any): Observable<T> =>  {
      //TODO: Send error to remote logging infrastructure...like Sentry?
      console.error(error);
      //TODO: Better job of transforming error for user consumption
      this.log(`${operation} failed ${error.message}`);

      return of(result as T);
    }
  }

httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

getHeroes(): Observable<Hero[]> {

  return this.http.get<Hero[]>(this.heroesURL)
  .pipe(
    tap(_ => this.log('fetched heroes')),
    catchError(this.handleError<Hero[]>('getHeroes',[]))
  )

  //TODO: Send message AFTER sending the heroes
  // this.messageService.add('Hero Service: fetched heroes');

  // return of(HEROES);
}

//Post: a new hero to the server
addHero(hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesURL, hero, this.httpOptions)
  .pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id of ${newHero.id}`) ),
    catchError(this.handleError<Hero>('addHero'))
  );
}


getHero(id: number): Observable<Hero> {
  const url = `${this.heroesURL}/${id}`;
  return this.http.get<Hero>(url)
  .pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id:${id}`))
  );
}



          // getHero(id: number): Observable<Hero> {
          //   this.messageService.add(`HeroService: fetched hero id=${id}`);
          //   return of(HEROES.find(hero => hero.id === id));
          // }


  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesURL, hero, this.httpOptions)
    .pipe(
      tap(_ => this.log(`Updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesURL}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
    .pipe(
      tap(_ => this.log(`Deleted hero id: ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  } 

  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesURL}/?name=${term}`)
    .pipe(
      tap(_ => this.log(`found heroes matching ${term}`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    )

  }



}
