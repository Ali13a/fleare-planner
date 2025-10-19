import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ApiServiceService} from './core/services/api-service.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    ApiServiceService,],
})
export class AppComponent {
  title = 'FlearePlannerFrontend';
}
