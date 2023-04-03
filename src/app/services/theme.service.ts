import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkMode: boolean = false;

  constructor() {}

  setDarkMode(value: boolean) {
    this.darkMode = value;
    const body = document.getElementsByTagName('body')[0];
    if (value) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }

  isDarkMode() {
    return this.darkMode;
  }
}