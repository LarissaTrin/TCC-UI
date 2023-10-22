import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListService } from '@app/Service/list.service';
import { ListIn } from '@app/models/Interface/listIn';
import { Lista } from '@app/models/lista';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DeleteListModalComponent } from './deleteListModal/deleteListModal.component';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.scss']
})
export class EditBoardComponent implements OnInit {
  @Input() lists = {} as ListIn[];
  @Input() projectId = 0 as number;

  public validateSection = false;
  public newSectionForm!: UntypedFormGroup;

  public addList = false;
  public cloneList = {} as ListIn[];

  deleteModalRef!: BsModalRef;

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private modalService: BsModalService,
    private fb: UntypedFormBuilder,
    private listService: ListService,
  ) {
    this.criateForm();
  }

  ngOnInit() {
    this.cloneList = this.copyList(this.lists);
  }

  criateForm () {
    this.newSectionForm = this.fb.group({
      newList: ['', Validators.required],
    });
  }

  copyList(lists: ListIn[]): ListIn[] {
    const clonedList: ListIn[] = [];
  
    for (const list of lists) {
      const clonedListObject: ListIn = { ...list };
      clonedList.push(clonedListObject);
    }
    return clonedList;
  }
  addListClick() {
    this.addList = !this.addList;
    this.validateSection = false;
    this.newSectionForm.reset();
  }

  addNewList() {
    if (this.newSectionForm.valid && !this.cloneList.some(item => item.listName === this.newSectionForm.value.newList)) {
      var newList = new Lista(this.newSectionForm.value.newList, this.cloneList.length, this.projectId, false);
      this.cloneList.push(newList);
      this.addListClick();
    } else {
      this.validateSection = true;
    }
  }

  startEditing(item: ListIn) {
    item.editMode = true;
    item.editName = item.listName;
  }

  saveEditing(item: ListIn) {
    item.editMode = false;
    item.listName = item.editName;
  }

  closeEditing(item: ListIn) {
    item.editMode = false;
  }

  removeList(item: ListIn) {
    const initialState = {
      listName: item.listName
    };
  
    this.deleteModalRef = this.modalService.show(DeleteListModalComponent, {
      initialState,
      class: 'modal-md',
    });
  
    this.deleteModalRef.content.onConfirm.subscribe(() => {
      if (item.id === undefined) {
        this.cloneList = this.cloneList.filter(list => list !== item);
      } else {
        item.order = -1;
      }
    });
  }

  saveOrder() {
    this.spinner.show();
    const itemsWithOrderMinusOne = this.cloneList.filter(item => item.order === -1);
    const itemsWithValidOrder = this.cloneList.filter(item => item.order !== -1);
    for (let index = 0; index < itemsWithValidOrder.length; index++) {
      itemsWithValidOrder[index].order = index;
    }
    this.lists = itemsWithOrderMinusOne.concat(itemsWithValidOrder);

    this.listService.saveList(this.projectId, this.lists).subscribe(
      () => {
        this.toastr.success("Lists in project is modified.", "Success");
      },
      (error: any) => {
        console.log(error);
        this.toastr.error("Error while trying to modify the lists.", "Error");
      },
      () => this.spinner.hide(),
    ).add(() => {
      this.spinner.hide();
      window.location.reload();
    });
  }

  onListModified(modifiedList: ListIn[]) {
    this.lists = modifiedList;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cloneList, event.previousIndex, event.currentIndex);
  }

}
