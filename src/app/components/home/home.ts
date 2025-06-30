import { Component } from '@angular/core';
import {  MatButtonModule } from '@angular/material/button';
import {  MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatCardModule,MatButtonModule,RouterModule, RouterLink , MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
