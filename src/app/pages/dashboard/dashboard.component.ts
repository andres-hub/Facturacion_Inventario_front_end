import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../components/services/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor(
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingService.ocultarLoading();
  }

}
