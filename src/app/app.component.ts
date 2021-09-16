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
export type Alignment = `${AlignmentY}-${AlignmentX}`;
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

  constructor(private readonly host: ElementRef<HTMLElement>) {

  }

  ngOnInit() {
    this.setupDropdown();
    this.setupTrigger();
    window.addEventListener('resize', () => { this.onWindowResize(); })
    this.trigger.addEventListener(this.reactOn, () => {
      console.log('Hey');
    });
  }

  private setupDropdown() {
    this.host.nativeElement.style.position = 'absolute';
    this.host.nativeElement.style.left = '0';
    this.host.nativeElement.style.top = '0';
  }

  private setupTrigger() {
    if(this.reactOn === 'click')
      this.trigger.style.cursor = 'pointer';
  }

  private onWindowResize() {
    
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
