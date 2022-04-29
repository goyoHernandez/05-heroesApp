import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ComfirmComponent } from '../../components/comfirm/comfirm.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
    img{
      width: 100%;
      border-radius: 10px;
    }
    `
  ]
})
export class AddComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC-Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel-Comics'
    }
  ]

  heroe: Heroe = {
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    superhero: '',
    alt_img: ''
  }

  durationInSeconds = 3000;

  constructor(
    private heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (!this.router.url.includes('edit'))
      return;

    this.activatedRoute.params.
      pipe(
        switchMap(({ id }) => this.heroeService.getHeroeById(id))
      )
      .subscribe(h => this.heroe = h)
  }

  SaveHeroe = () => {
    if (this.heroe.superhero.trim().length === 0)
      return;

    if (this.heroe.id) {
      this.heroeService.editHeroe(this.heroe)
        .subscribe(heroe => {
          this.openSnackBar(`Heroe actualizado ${heroe.superhero}`);
        })
    }
    else {
      this.heroeService.saveHeroe(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroes/edit', heroe.id]);
          this.openSnackBar(`Heroe creado ${heroe.superhero}`);
        });
    }
  }

  DropHeroe = () => {
    const dialog = this.dialog.open(ComfirmComponent, {
      width: '350px',
      data: this.heroe
    });

    dialog.afterClosed()
      .subscribe(res => {
        if (res) {
          this.heroeService.dropHeroe(this.heroe.id!)
            .subscribe(res => {
              this.router.navigate(['/heroes']);
            })
        }
      });
  }

  openSnackBar(msj: string) {
    this.snackBar.open(msj, 'Ok', {
      duration: this.durationInSeconds
    });
  }

}
