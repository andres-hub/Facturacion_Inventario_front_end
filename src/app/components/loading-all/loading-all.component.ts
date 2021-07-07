import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-loading-all',
  templateUrl: './loading-all.component.html',
  styleUrls: ['./loading-all.component.css']
})
export class LoadingAllComponent implements OnInit {

  constructor(
    public loadingService: LoadingService
  ) { }

  ngOnInit(): void {
  }

}
