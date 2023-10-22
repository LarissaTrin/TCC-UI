import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  title="Reports";
  public isExpand: boolean = true;

  constructor(
    private data: DataService,
  ) { }

  ngOnInit(): void {
    this.data.currentMenu.subscribe(menuExpand => this.isExpand = menuExpand);
  }

}
