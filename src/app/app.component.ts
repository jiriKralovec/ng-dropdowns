import {
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  VERSION,
} from '@angular/core';

export type AlignmentX = 'left' | 'right';
export type AlignmentY = 'top' | 'bottom';
export type Alignment = `${AlignmentY}-${AlignmentX}`;
export type ReactOn = 'click' | 'hover';
export type DropdownSize = 'small' | 'regular' | 'large';
export type Vector2 = { x: number; y: number };

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
      :host(.hidden) {
        display: none !important;
      }
    `,
  ],
})
export class DropdownComponent {
  @Input('size') readonly size: DropdownSize = 'regular';
  @HostBinding('class.sm') get isSmall() {
    return this.size === 'small';
  }
  @HostBinding('class.base') get isRegular() {
    return this.size === 'regular';
  }
  @HostBinding('class.lg') get isLarge() {
    return this.size === 'large';
  }

  @HostBinding('class.hidden') get isHidden() {
    return this._isHidden;
  }
  private _isHidden: boolean = true;

  constructor() {}
  show() {
    this._isHidden = false;
  }
  hide() {
    this._isHidden = true;
  }
  toggle() {
    this._isHidden = !this._isHidden;
  }
}

@Directive({
  selector: '[floatingDropdown]',
})
export class DropdownDirective implements OnInit {
  @Input('align-to') readonly alignTo: Alignment = 'bottom-left';
  @Input('origin') readonly origin: Alignment = 'top-left';
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

  private get triggerDimensions(): Vector2 {
    return {
      x: this.trigger.offsetWidth,
      y: this.trigger.offsetHeight,
    };
  }
  private get triggerOffset(): Vector2 {
    return {
      x: this.trigger.getBoundingClientRect().left,
      y: this.trigger.getBoundingClientRect().top,
    };
  }

  constructor(
    private readonly host: ElementRef<HTMLElement>,
    private readonly hostComponent: DropdownComponent
  ) {}

  ngOnInit() {
    this.setupDropdown();
    this.setupTrigger();
    this.setupWindowListener();
    this.setupTriggerListener();
    this.setDropdownPosition();
  }

  private setupWindowListener() {
    window.addEventListener('resize', () => {
      this.setDropdownPosition();
    });
  }

  private setupTriggerListener() {
    if (this.reactOn === 'click') {
      this.trigger.addEventListener(this.reactOn, () => {
        this.hostComponent.toggle();
      });
    } else {
    }
  }

  private setupDropdown() {
    this.host.nativeElement.style.position = 'absolute';
    this.host.nativeElement.style.left = '0';
    this.host.nativeElement.style.top = '0';
  }

  private setupTrigger() {
    if (this.reactOn === 'click') this.trigger.style.cursor = 'pointer';
  }

  private setDropdownPosition() {
    let x = this.triggerOffset.x;
    let y = this.triggerOffset.y + this.triggerDimensions.y;
    this.host.nativeElement.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
}
