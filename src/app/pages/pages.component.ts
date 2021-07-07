import { Component, OnInit } from '@angular/core';
import { SettingsService } from './services/settings.service';
import { SidebarService } from '../shared/services/sidebar.service';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  public linkTheme = document.querySelector('#theme');

  constructor( 
    private settingsService: SettingsService,
    private sidebarService: SidebarService
    ) { }

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.cargarMenu();
  }

}
