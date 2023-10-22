import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-deleteListModal',
  templateUrl: './deleteListModal.component.html',
  styleUrls: ['./deleteListModal.component.scss']
})
export class DeleteListModalComponent implements OnInit {
  @Input() listName!: string;
  @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>();

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  confirmDelete() {
    this.onConfirm.emit();
    this.bsModalRef.hide();
  }

  cancelDelete() {
    this.bsModalRef.hide();
  }

}
