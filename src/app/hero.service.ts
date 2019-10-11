import { Injectable } from '@angular/core';
import { Hero } from './heroes/hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

constructor(private messageService: MessageService) { }

// getHeroes() {
//   return HEROES;
// }

getHeroes(): Observable<Hero[]> {
  //TODO: Send message AFTER sending the heroes
  this.messageService.add('Hero Service: fetched heroes');

  return of(HEROES);
}

}
