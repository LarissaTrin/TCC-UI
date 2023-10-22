import { FormArray, UntypedFormBuilder, FormControl, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Card } from 'src/app/models/card';
import { Approver } from 'src/app/models/approver';
import { Tasks } from 'src/app/models/tasks';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CardIn } from '@app/models/Interface/cardIn';
import { ListIn } from '@app/models/Interface/listIn';
import { CardService } from '@app/Service/card.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constants } from '@app/util/constants';
import { ProjectUserIn } from '@app/models/Interface/projectUserIn';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() items: CardIn[] = [];
  @Input() listOrder: number = 0;
  @Input() completList: ListIn[] = [];
  @Input() usersList: ProjectUserIn[] = [];
  @Input() listName: string = '';
  @Input() userRolePermission: boolean = false;
  @Output() listModified = new EventEmitter<ListIn[]>();

  Constants = Constants;

  public newNameItem: string = '';
  public addItem = false;
  public validateItem = false;
  public activeCard!: Card;
  public cardForm!: UntypedFormGroup;
  public newItemForm!: UntypedFormGroup;
  public modalRef!: BsModalRef;
  bsConfig?: Partial<BsDatepickerConfig>;

  get form(): any {
    return this.newItemForm.controls;
  }

  getUserInfo(userId: number): string {
    const user = this.usersList.find(x => x.userId === userId);
  
    if (user) {
      return `${user.user?.firstName} ${user.user?.lastName}`;
    }
  
    return '';
  }

  constructor(
    private modalService: BsModalService,
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private cardService: CardService,
  ) {
    this.criateForm();
   }

  ngOnInit(): void {
  }

  openModal(cardDetails: TemplateRef<any>, card: CardIn) {
    const modalConfig = {
      class: "gray card-modal",
    };
    this.activeCard = card;
    this.carregarCard();
    this.modalRef = this.modalService.show(cardDetails, modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }

  carregarCard() {
    this.cardForm.patchValue(this.activeCard);
  }

  criateForm () {
    this.cardForm = this.fb.group({
      id: [0],
      cardName: [''],
      listId: [0],
      userId: [null],
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

  handleFormSubmit(formData: any) {
    this.cardForm.patchValue(formData);
    const index = this.items.findIndex(x => x.id === this.cardForm.value.id);
    if (index !== -1) {
      this.items[index] = this.cardForm.value;
    }

    const checkIdList = this.completList.findIndex(x => x.id === this.cardForm.value.listId);
    const checkExistCard = this.completList[checkIdList].cards?.some(x => x.id === this.cardForm.value.id);
    if (!checkExistCard) {
      this.changeCardList(this.cardForm.value);
    }
    this.saveChanges(this.cardForm.value);
  }

  changeCardList(cardModify: CardIn) {
    let indexCardList = this.completList[this.listOrder].cards?.findIndex(x => x.id === cardModify.id);
    if (indexCardList !== -1 && indexCardList !== undefined) {
      this.completList[this.listOrder].cards?.splice(indexCardList, 1);
    }
    let indexList = this.completList.findIndex(x => x.id === cardModify.listId);
    this.completList[indexList].cards?.push(cardModify);
  }

  drop(event: CdkDragDrop<CardIn[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      let stringId = event.container.id.split("cdk-drop-list-").pop();
      let id = stringId === undefined ? 0 : parseInt(stringId);
      event.previousContainer.data[event.previousIndex].listId = this.completList[id].id ?? 0;
      this.saveChanges(event.previousContainer.data[event.previousIndex]);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addNewItem() {
    if (this.newItemForm.valid) {
      const item = new Card(0, this.form.newItem.value, null, this.completList[0].id, null, null, null, null, null, null, [], [], [], []);
      this.createCard(item);
      this.newItemForm.reset();
      this.addItem = !this.addItem;
      this.validateItem = false;
    } else {
      this.validateItem = true;
    }
  }

  addItemClick() {
    this.addItem = !this.addItem;
    this.validateItem = false;
    this.newItemForm.reset();
  }

  saveChanges(cardModify: CardIn) {
    console.log("cardModify: ", cardModify)
    this.spinner.show();
    this.cardService.putCard(cardModify.id ?? 0, cardModify).subscribe(
      (card: CardIn) => {
        this.toastr.success('Save card', "Success");
      },
      (error: any) => {
        console.log(error);
        this.toastr.error('Card not save. ERROR!', "Error");
      }
    ).add(() => this.spinner.hide());
  }

  createCard(cardModify: CardIn) {
    this.spinner.show();
    this.cardService.postCard(cardModify.listId, cardModify).subscribe(
      (card: CardIn) => {
        this.items.push(card);
        this.toastr.success('Save card', "Success");
      },
      (error: any) => {
        console.log(error);
        this.toastr.error('Card not save. ERROR!', "Error");
      }
    ).add(() => this.spinner.hide());
  }
}
