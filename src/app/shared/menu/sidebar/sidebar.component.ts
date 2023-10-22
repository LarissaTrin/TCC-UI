import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../Service/service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public styleObject = {
    'width': '25vh'
  };

  public styleVar = this.styleObject;
  public isExpand: boolean = true;

  constructor(
    private data: DataService,
  ) { }

  ngOnInit(): void {
    this.data.currentMenu.subscribe(menuExpand => this.isExpand = menuExpand);
  }

  changeSize() {
    if (this.isExpand) {
      this.styleVar['width'] = '7vh';
    } else {
      this.styleVar['width'] = '25vh';
    }
    this.data.changeMenuExpand(!this.isExpand);
  }

}
