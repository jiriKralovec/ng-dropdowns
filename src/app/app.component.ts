import {
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  VERSION
} from '@angular/core';

export type AlignmentX = 'left' | 'right';
export type AlignmentY = 'top' | 'bottom';
export type AlignmentOrigin = `${AlignmentY}-${AlignmentX}`;
export type ReactOn = 'click' | 'hover';
export type DropdownSize = 'small' | 'regular' | 'large';

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
  @Input('size') readonly size: DropdownSize = 'regular';
  @HostBinding('class.sm') get isSmall() { return this.size === 'small'; }
  @HostBinding('class.base') get isRegular() { return this.size === 'regular'; }
  @HostBinding('class.lg') get isLarge() { return this.size === 'large'; }
  constructor() {}
}

@Directive({
  selector: '[floatingDropdown]'
})
export class DropdownDirective implements OnInit {
  
  /**
   * Defines which horizontal side of relativeTo component should dropdown be aligned to
   */
  @Input('align-x') readonly alignX: AlignmentX;
  /**
   * Defines which vertical side of relativeTo component should dropdown be aligned to
   */
  @Input('align-y') readonly alignY: AlignmentX;
  /**
   * Defines origin of alignment
   */
  @Input('origin') readonly origin: AlignmentOrigin;
  /**
   * Element the dropdown is relative to
   */
  @Input('relative-to') readonly relativeTo: HTMLElement;
  /**
   * Element the dropdown reacts to. By default, it is the relativeTo element
   */
  @Input('trigger') readonly _trigger: HTMLElement;
  /**
   * Whether the dropdown should react on hover or click
   * */
  @Input('react-on') readonly reactOn: ReactOn = 'click';

  private get trigger() {
    return this._trigger ?? this.relativeTo;
  }

  constructor(private readonly host: ElementRef<DropdownComponent>) {

  }

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
