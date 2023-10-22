import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/Service/service.service';

@Component({
  selector: 'app-timeline-board',
  templateUrl: './timeline-board.component.html',
  styleUrls: ['./timeline-board.component.scss']
})
export class TimelineBoardComponent implements OnInit {

  title = 'Timeline';
  public isExpand: boolean = true;

  constructor(
    private data: DataService,
  ) { }

  ngOnInit(): void {
    this.data.currentMenu.subscribe(menuExpand => this.isExpand = menuExpand);
  }

}
