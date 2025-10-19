// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { appConfig } from './app/app.config';
//
// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
//

import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AppComponent } from './app/app.component';
import * as _moment from 'moment';
import 'moment/locale/fa';

_moment.locale('fa');


const JALALI_FORMATS = {
  parse: {
    dateInput: 'jYYYY/jMM/jDD',
  },
  display: {
    dateInput: 'jYYYY/jMM/jDD',
    monthYearLabel: 'jYYYY jMMMM',
    dateA11yLabel: 'jYYYY/jMM/jDD',
    monthYearA11yLabel: 'jYYYY jMMMM',
  },
};

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideMomentDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'fa-IR' },
    { provide: MAT_DATE_FORMATS, useValue: JALALI_FORMATS }
  ],
});


// import * as moment from 'jalali-moment';
// import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
// import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import {bootstrapApplication} from '@angular/platform-browser';
// import {AppComponent} from './app/app.component';
//
// moment.locale('fa');
//
// const JALALI_FORMATS = {
//   parse: {
//     dateInput: 'jYYYY/jMM/jDD',
//   },
//   display: {
//     dateInput: 'jYYYY/jMM/jDD',
//     monthYearLabel: 'jYYYY jMMMM',
//     dateA11yLabel: 'jYYYY/jMM/jDD',
//     monthYearA11yLabel: 'jYYYY jMMMM',
//   },
// };
//
// bootstrapApplication(AppComponent, {
//   providers: [
//     provideMomentDateAdapter(),
//     { provide: MAT_DATE_LOCALE, useValue: 'fa-IR' },
//     { provide: MAT_DATE_FORMATS, useValue: JALALI_FORMATS }
//   ]
