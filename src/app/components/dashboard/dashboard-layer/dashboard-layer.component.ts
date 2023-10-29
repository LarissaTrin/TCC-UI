import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from '@app/Service/list.service';
import { ListIn } from '@app/models/Interface/listIn';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-dashboard-layer',
  templateUrl: './dashboard-layer.component.html',
  styleUrls: ['./dashboard-layer.component.scss']
})
export class DashboardLayerComponent implements OnInit {

  title = 'Dashboard';
  public isExpand: boolean = true;

  public lists = {} as ListIn[];

  public cardsOverdue = 0;
  public cardsProgress = 0;
  public cardsDone = 0;
  public countCards = 0;
  
  constructor(
    private data: DataService,
    private listService: ListService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.data.currentMenu.subscribe(menuExpand => this.isExpand = menuExpand);
    this.getListByProjectId();
  }

  getListByProjectId() {
    const projectIdParam = this.router.url.split('/')[2];

    if (projectIdParam !== null) {
      this.spinner.show();
      this.listService.getListByProjectId(+projectIdParam).subscribe(
        (lists: ListIn[]) => {
          this.lists = lists.sort((a, b) => a.order - b.order);
          this.getDescriptions()
        },
        (error: any) => {
          console.log(error);
          this.toastr.error('Project not found', "Error");
        }
      ).add(() => this.spinner.hide());
    }
  }

  getDescriptions() {
    for (const list of this.lists) {
      if (list.cards) {
        this.countCards = this.countCards + list.cards.length;

        for (const card of list.cards) {
          if (card.date) {
            const dueDate = new Date(card.date);
            const today = new Date();
    
            if (dueDate < today) {
              this.cardsOverdue++;
            }
          }

          if (list !== this.lists[0] && list !== this.lists[this.lists.length - 1]) {
            this.cardsProgress++;
          } else if (list === this.lists[this.lists.length - 1]) {
            this.cardsDone++;
          }
        }
      }
    }
  }
}
