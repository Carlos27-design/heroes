import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/hero.service';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [],
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(private _heroesService: HeroesService) {}

  public searchHero(): void {
    const value: string = this.searchInput.value || '';

    this._heroesService
      .getSuggestion(value)
      .subscribe((heroes) => (this.heroes = heroes));
  }

  public onSelectedOptions(event: MatAutocompleteActivatedEvent): void {
    if (!event.option?.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }
}
