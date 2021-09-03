import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'drp-menu',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./dropdown-menu.scss']
})
export class DrpCmp {
  constructor(public readonly ref: ElementRef) {}
}
