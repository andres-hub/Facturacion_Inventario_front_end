import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styles: [
  ]
})
export class LoadingComponent implements OnInit {

  constructor(
    public loadingService:LoadingService
  ){}  

  ngOnInit(): void {
  }

}
