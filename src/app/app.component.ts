import {
  Component,
  Directive,
  ElementRef,
  Input,
  OnInit,
  VERSION
} from '@angular/core';

@Component({
  selector: 'ng-dropdown',
  template: `
    hey
  `,
  styles: [
    `
      :host {
        display: block;
        background: red;
      }
    `
  ]
})
export class DropdownComponent {
  constructor() {}
}
export type AlignmentX = 'left' | 'right';
export type AlignmentY = 'top' | 'bottom';
export type AlignmentOrigin = `${AlignmentY}-${AlignmentX}`;

@Directive({
  selector: '[floatingDropdown]'
})
export class DropdownDirective implements OnInit {
  @Input('align-x') readonly alignX: AlignmentX;
  @Input('align-y') readonly alignY: AlignmentX;
  @Input('origin') readonly origin: AlignmentOrigin;
  @Input('relative-to') readonly relativeTo: HTMLElement;
  @Input('trigger') readonly _trigger: HTMLElement;
  private get trigger() {
    return this._trigger ?? this.relativeTo;
  }
  constructor(private readonly host: ElementRef<DropdownComponent>) {}
  ngOnInit() {
    console.log(this.trigger);
    console.log(this.host);
  }
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
}
