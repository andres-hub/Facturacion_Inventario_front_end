import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {

    const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme.setAttribute('href', url);

   }

   cambiarColor(theme:string, links: NodeListOf<Element>){

    const url = `./assets/css/colors/${theme}.css`;

    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme(links);

  }

  checkCurrentTheme(links: NodeListOf<Element>){

    links.forEach(elem =>{
      
      elem.classList.remove('working');

      const btnTheme = elem.getAttribute('data-theme');
      const btnthemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if(btnthemeUrl === currentTheme){
        elem.classList.add('working')
      }

    });

  }



}
