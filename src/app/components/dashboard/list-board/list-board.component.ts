import { Component, OnInit, TemplateRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListService } from '@app/Service/list.service';
import { CardIn } from '@app/models/Interface/cardIn';
import { ListIn } from '@app/models/Interface/listIn';
import { ProjectListIn } from '@app/models/Interface/projectListIn';
import { ProjectUserIn } from '@app/models/Interface/projectUserIn';
import { Approver } from '@app/models/approver';
import { Card } from '@app/models/card';
import { Tasks } from '@app/models/tasks';
import { Constants } from '@app/util/constants';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-board',
  templateUrl: './list-board.component.html',
  styleUrls: ['./list-board.component.scss']
})
export class ListBoardComponent implements OnInit {

  title = 'List';
  showBody: boolean[] = [];
  cards: any = [];

  Constants = Constants;

  public lists = {} as ListIn[];
  public usersList = {} as ProjectUserIn[]

  public activeCard!: Card;
  public cardForm!: UntypedFormGroup;
  public newItemForm!: UntypedFormGroup;
  public modalRef!: BsModalRef;
  
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private listService: ListService,
    private fb: UntypedFormBuilder,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.getListByProjectId();
  }

  getListByProjectId() {
    const projectIdParam = this.router.url.split('/')[2];

    if (projectIdParam !== null) {
      this.spinner.show();
      this.listService.getListByProjectId(+projectIdParam).subscribe(
        (lists: ListIn[]) => {
          this.lists = lists.sort((a, b) => a.order - b.order);
          this.showBody = lists.map(() => false);
        },
        (error: any) => {
          console.log(error);
          this.toastr.error('Project not found', "Error");
        }
      ).add(() => this.spinner.hide());
    }
  }

  toggleBody(index: number) {
    this.showBody[index] = !this.showBody[index];
  }

  openModal(cardDetails: TemplateRef<any>, card: CardIn) {
    const modalConfig = {
      class: "gray card-modal",
    };
    this.activeCard = card;
    this.modalRef = this.modalService.show(cardDetails, modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }

  carregarCard() {
    this.cardForm.patchValue(this.activeCard);
    this.cardForm.value.userCardName = `${this.activeCard.user?.firstName} ${this.activeCard.user?.lastName}`;
  }

  criateForm () {
    this.cardForm = this.fb.group({
      id: [0],
      cardName: [''],
      listId: [0],
      userCardName: [''],
      priority: [0],
      date: [''],
      description: [''],
      tasksProject: new Tasks(),
      approvers: new Approver(),
      comments: ['']
    });

    this.newItemForm = this.fb.group({
      newItem: ['', Validators.required],
    });
  }
}
