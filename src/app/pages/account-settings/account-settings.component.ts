import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { LoadingService } from '../../components/services/loading.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  
  public links: NodeListOf<Element>;

  constructor(
    private settingsService: SettingsService,
    private loadingService: LoadingService
    ) { }

  ngOnInit(): void {
    this.links =  document.querySelectorAll('.selector');
    this.settingsService.checkCurrentTheme(this.links);
    this.loadingService.ocultarLoading();  
  }

  cambiarColor(theme:string){

    this.settingsService.cambiarColor(theme, this.links);

  }


}
