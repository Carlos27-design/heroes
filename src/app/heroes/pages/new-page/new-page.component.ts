import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/hero.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [],
})
export class NewPageComponent implements OnInit {
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  constructor(
    private _heroesService: HeroesService,
    private _activedRoute: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) {}

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    if (!this._router.url.includes('edit')) return;

    this._activedRoute.params
      .pipe(switchMap(({ id }) => this._heroesService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) return this._router.navigateByUrl('/');

        this.heroForm.reset(hero);
        return;
      });
  }

  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC-Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel-Comics',
    },
  ];

  public onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this._heroesService.updateHero(this.currentHero).subscribe((hero) => {
        //TODO: Mostrar SnackBar
        this.showSnackBar(`${hero.superhero} actualizado con exito`);
      });
      return;
    }

    this._heroesService.addHero(this.currentHero).subscribe((hero) => {
      //TODO:  mostrar SnackBar y navegar a /hero/edit/ heroId
      this._router.navigate(['heroes/edit', hero.id]);
      this.showSnackBar(`${hero.superhero} creado con exito`);
    });
  }

  public onDeleteHero(): void {
    if (!this.currentHero.id) throw Error('Hero id is required');

    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this._heroesService.deleteHero(this.currentHero.id)),
        filter((wasDelete: boolean) => wasDelete)
      )
      .subscribe(() => {
        this._router.navigate(['/heroes/list']);
      });

    /*dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this._heroesService
        .deleteHero(this.currentHero.id)
        .subscribe((wasDeleted) => {
          if (wasDeleted) {

          }
        });
    });*/
  }

  private showSnackBar(message: string): void {
    this._snackBar.open(message, 'Cerrar', { duration: 2500 });
  }
}
