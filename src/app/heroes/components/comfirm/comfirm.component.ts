import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-comfirm',
  templateUrl: './comfirm.component.html',
  styles: [
  ]
})
export class ComfirmComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ComfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Heroe,
  ) { }

  ngOnInit(): void {
  }

  DropHeroe = () => {
    this.dialogRef.close(true);
  }

  CloseDialog = () => {
    this.dialogRef.close();
  }
}
