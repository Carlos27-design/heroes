import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/hero.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Hero } from '../../interfaces/hero.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [],
})
export class HeroPageComponent implements OnInit {
  public hero?: Hero;

  constructor(
    private readonly _heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this._heroesService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) return this.router.navigate(['heroes/list']);
        console.log({ hero });
        this.hero = hero;

        return;
      });
  }

  public toBack(): void {
    this.router.navigateByUrl('heroes/list');
  }
}
