import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-dashboard-layer',
  templateUrl: './dashboard-layer.component.html',
  styleUrls: ['./dashboard-layer.component.scss']
})
export class DashboardLayerComponent implements OnInit {

  title = 'Dashboard';
  public isExpand: boolean = true;
  
  constructor(
    private data: DataService,
  ) { }

  ngOnInit(): void {
    this.data.currentMenu.subscribe(menuExpand => this.isExpand = menuExpand);
  }

}
