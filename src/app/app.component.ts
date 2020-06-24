import { Component } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material';
import {DialogContentComponent} from '../app/dialog-content/dialog-content.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Universal Travel Company';
    isAuthenticated: boolean;

    constructor(public dialog: MatDialog) {}
    
}
