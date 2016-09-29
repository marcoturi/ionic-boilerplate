import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

import { AppModuleNgFactory } from './app.module.ngfactory'; // tslint:disable-line

enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
