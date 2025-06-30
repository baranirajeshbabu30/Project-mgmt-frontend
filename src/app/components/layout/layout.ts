import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

@Component({
  selector: 'app-layout',
  imports: [  RouterModule,      
    Footer,      
    Header ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {

}
