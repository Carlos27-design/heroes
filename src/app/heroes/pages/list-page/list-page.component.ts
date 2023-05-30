import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/hero.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [],
})
export class ListPageComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private _heroesService: HeroesService) {}

  ngOnInit(): void {
    this.getheroes();
  }

  private getheroes(): void {
    this._heroesService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes));
  }
}
