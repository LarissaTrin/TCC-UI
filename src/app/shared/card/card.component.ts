import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { CardService } from '@app/Service/card.service';
import { ApproverIn } from '@app/models/Interface/approverIn';
import { CardIn } from '@app/models/Interface/cardIn';
import { ListIn } from '@app/models/Interface/listIn';
import { ProjectUserIn } from '@app/models/Interface/projectUserIn';
import { TaskProjectIn } from '@app/models/Interface/taskProjectIn';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() completList: ListIn[] = [];
  @Input() usersList: ProjectUserIn[] = [];
  @Input() activeCard!: CardIn;
  @Input() modalRef!: BsModalRef;
  @Input() userRolePermission: boolean = false;
  @Output() formSubmitted = new EventEmitter<any>();

  public cardForm!: UntypedFormGroup;

  public tasksList!: UntypedFormArray;
  public approverList!: UntypedFormArray;
  deleteModalRef!: BsModalRef;

  get bsConfig() {
    return {
      adaptivePosition: true,
      showWeekNumbers: false,
    };
  }

  constructor(
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private cardService: CardService
  ) {
    this.criateForm();
  }

  ngOnInit(): void {
    this.getCard();
  }

  closeModal() {
    this.modalRef.hide();
  }

  closeModalDelete() {
    this.deleteModalRef.hide();
  }

  saveCard() {
    let error = false;
    if (this.usersList !== undefined) {
      if (this.cardForm.value.userCardName !== ""){
        let selectedUser = this.usersList.find((user) => user.user?.email?.includes(this.cardForm.value.userCardName));
        this.cardForm.value.userId = selectedUser?.userId;
      }

      if (this.cardForm.value.tasksProject.length > 0) {
        this.cardForm.value.tasksProject.forEach((x) => {
          if (x.userName) {
            let selectedUser = this.usersList.find((user) =>
              user.user?.email?.includes(x.userName)
            );
            if (selectedUser) {
              x.userId = selectedUser.userId;
            }
          }
          if (x.taskName === '') {
            error = true;
          }
        });
      }

      if (this.cardForm.value.approvers.length > 0) {
        this.cardForm.value.approvers.forEach((x) => {
          if (x.userName) {
            let selectedUser = this.usersList.find((user) =>
              user.user?.email?.includes(x.userName)
            );
            if (selectedUser) {
              x.userId = selectedUser.userId;
            }
          }
          if (x.environment === '') {
            error = true;
          }
        });
      }
    }
    if (error) this.toastr.error('Environment or Task Title is null', 'Error');
    else this.formSubmitted.emit(this.cardForm.value);
  }

  saveAndCloseCard() {
    this.formSubmitted.emit(this.cardForm.value);
    this.closeModal();
  }

  deleteCardModal(template: TemplateRef<any>) {
    this.deleteModalRef = this.modalService.show(template);
  }

  deleteCardConfirm() {
    if (this.activeCard.id) {
      this.spinner.show();
      this.cardService
        .delete(this.activeCard.listId, this.activeCard.id)
        .subscribe(
          () => {
            this.toastr.success('Card deleted successfully.', 'Success');
          },
          (error: any) => {
            console.log(error);
            this.toastr.error('Error while trying to delete card.', 'Error');
          },
          () => this.spinner.hide()
        )
        .add(() => this.spinner.hide());
      window.location.reload();
    }
  }

  getCard() {
    this.spinner.show();
    this.cardService
      .getCardById(this.activeCard.listId, this.activeCard.id)
      .subscribe(
        (card: CardIn) => {
          this.cardForm.patchValue(card);
          this.activeCard = card;
          this.setApproverData();
          this.setTasksData();
        },
        (error: any) => {
          console.log(error);
          this.toastr.error('Card not save. ERROR!', 'Error');
        }
      )
      .add(() => {
        this.spinner.hide();
        this.cardForm.get('userCardName')?.setValue(this.activeCard.user?.email);
      });
  }

  criateForm() {
    this.cardForm = this.fb.group({
      id: [0],
      cardName: [''],
      listId: [0],
      userCardName: [''],
      priority: [null],
      date: [''],
      description: [''],
      tasksProject: this.fb.array([]),
      approvers: this.fb.array([]),
      comments: [''],
    });
  }

  onPriorityChange(event: any) {
    const selectedValue = event.target.value;
    const priorityControl = this.cardForm.get('priority');

    if (priorityControl) {
      if (selectedValue === 'null') {
        this.cardForm.get('priority')?.setValue(null);
      } else {
        this.cardForm.get('priority')?.setValue(+selectedValue);
      }
    }
  }

  onStateChange(event: any) {
    const selectedValue = event.target.value;
    const stateControl = this.cardForm.get('listId');

    if (stateControl) {
      if (selectedValue === 'null') {
        this.cardForm.get('listId')?.setValue(null);
      } else {
        this.cardForm.get('listId')?.setValue(+selectedValue);
      }
    }
  }

  addItemApprover() {
    this.approverList = this.cardForm.get('approvers') as UntypedFormArray;
    this.approverList.push(this.genApprover());
  }

  removeApprover(index: any) {
    this.approverList = this.cardForm.get('approvers') as UntypedFormArray;
    this.approverList.removeAt(index);
  }

  genApprover(): UntypedFormGroup {
    return this.fb.group({
      id: [0],
      cardId: [this.activeCard.id],
      environment: [''],
      userName: [''],
      userId: [null],
    });
  }

  createApprover(approverData: ApproverIn): UntypedFormGroup {
    return this.fb.group({
      id: [approverData.id],
      cardId: [approverData.cardId],
      environment: [approverData.environment],
      userName: [
        approverData.user?.firstName + ' ' + approverData.user?.lastName,
      ],
      userId: [approverData.userId],
    });
  }

  setApproverData() {
    if (this.activeCard.approvers)
      if (this.activeCard.approvers.length > 0) {
        this.approverList = this.cardForm.get('approvers') as UntypedFormArray;

        this.activeCard.approvers.forEach((approverData) => {
          const newApprover = this.createApprover(approverData);
          this.approverList.push(newApprover);
        });
      }
  }

  addItemTask() {
    this.tasksList = this.cardForm.get('tasksProject') as UntypedFormArray;
    this.tasksList.push(this.genTasks());
  }

  removeTask(index: any) {
    this.tasksList = this.cardForm.get('tasksProject') as UntypedFormArray;
    this.tasksList.removeAt(index);
  }

  genTasks(): UntypedFormGroup {
    return this.fb.group({
      id: [0],
      cardId: [this.activeCard.id],
      taskName: [''],
      userName: [''],
      userId: [null],
      date: [null],
      completed: [false],
    });
  }

  createTasks(taskData: TaskProjectIn): UntypedFormGroup {
    return this.fb.group({
      id: [taskData.id],
      cardId: [taskData.cardId],
      taskName: [taskData.taskName],
      userName: [taskData.user?.firstName + ' ' + taskData.user?.lastName],
      userId: [taskData.userId],
      date: [taskData.date],
      completed: [taskData.completed],
    });
  }

  setTasksData() {
    if (this.activeCard.tasksProject)
      if (this.activeCard.tasksProject.length > 0) {
        this.tasksList = this.cardForm.get('tasksProject') as UntypedFormArray;

        this.activeCard.tasksProject.forEach((taskData) => {
          const newTask = this.createTasks(taskData);
          this.tasksList.push(newTask);
        });
      }
  }

  get approvers() {
    return this.cardForm.get('approvers') as UntypedFormArray;
  }

  get tasks() {
    return this.cardForm.get('tasksProject') as UntypedFormArray;
  }
}
