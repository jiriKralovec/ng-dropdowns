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
export class DropdownComponent {}

@Directive({
  selector: '[floatingDropdown]'
})
export class DropdownDirective implements OnInit {
  @Input('relative-to') readonly relativeTo: HTMLElement;
  @Input('trigger') readonly _trigger: HTMLElement;
  private get trigger() {
    return this._trigger ?? this.relativeTo;
  }
  constructor(private readonly host: ElementRef) {}
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
