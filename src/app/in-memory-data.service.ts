import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './heroes/hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() { 
    const heroes = [
      { id: 11, name: 'Solomon Grundy' },
      { id: 12, name: 'Robin' },
      { id: 13, name: 'Deathstroke' },
      { id: 14, name: 'The Flash' },
      { id: 15, name: 'Gorilla Grodd' },
      { id: 16, name: 'Black Canary' },
      { id: 17, name: 'Green Lantern' },
      { id: 18, name: 'Wonder-Woman' },
      { id: 19, name: 'Superman' },
      { id: 20, name: 'Batman' }
    ];
    return {heroes};
  }

  genId(heroes: Hero[]): number {
    console.log('genId going');
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.

}


