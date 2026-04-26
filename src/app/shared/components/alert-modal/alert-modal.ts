import { Component, input } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  imports: [],
  templateUrl: './alert-modal.html',
  styleUrl: './alert-modal.css',
})
export class AlertModal {
  text = input<string>();
}
