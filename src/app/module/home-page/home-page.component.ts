import { Component } from '@angular/core';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [
    MatIcon,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
