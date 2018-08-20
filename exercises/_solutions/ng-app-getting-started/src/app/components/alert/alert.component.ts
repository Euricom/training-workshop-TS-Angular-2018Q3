import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

interface IAlertTypes {
  [key: string]: string;
}

const alertTypes: IAlertTypes = {
  success: 'alert-success',
  info: 'alert-info',
  warn: 'alert-warning',
  error: 'alert-danger',
};

@Component({
  selector: 'alert',
  template: `
    <div *ngIf="visible" class="alert alert-dismissible" [ngClass]="[alertType]" role="alert">
        <button type="button" class="close" (click)="onClose()"><span aria-hidden="true">&times;</span></button>
        <ng-content></ng-content>
    </div>
  `,
})
export class AlertComponent implements OnInit {
  @Input() type: string = alertTypes.success;
  @Output() closed = new EventEmitter<string>();

  visible = true;
  alertType = 'alert-info';

  onClose() {
    this.closed.emit();
    this.visible = false;
  }

  ngOnInit() {
    console.log(this.type);
    this.alertType = alertTypes[this.type];
    if (!this.alertType) {
      this.alertType = alertTypes.info;
    }
  }
}
