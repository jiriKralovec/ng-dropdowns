import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  ElementRef,
  HostListener,
  OnInit
} from '@angular/core';
import { DrpCmp } from './dropdown-menu';

@Directive({
  selector: '[attachDropdown]'
})
export class DropdownDirective implements OnInit {
  @HostListener('mouseenter') onMouseEnter() {
    this.visible = true;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.visible = false;
  }
  @Input('attachDropdown') private readonly _dropdownRef: DrpCmp;

  private _visible: boolean = false;
  private get visible() {
    return this._visible;
  }
  private set visible(value: boolean) {
    this._visible = value;
    if (this._visible) {
      this.dropdownNativeEl.style.visibility = 'visible';
    } else {
      this.dropdownNativeEl.style.visibility = 'hidden';
    }
  }

  /** Gonna be useful for triggering show/hide animations */
  private get dropdownComp() {
    return this._dropdownRef;
  }
  private get dropdownNativeEl() {
    return this._dropdownRef.ref.nativeElement as HTMLDivElement;
  }
  private get hostNativeEl() {
    return this.el.nativeElement as HTMLDivElement;
  }

  private get masterBoundingBox() {
    return this.hostNativeEl.getBoundingClientRect();
  }
  private get dropdownBoundingBox() {
    return this.dropdownNativeEl.getBoundingClientRect();
  }
  private get dropdownCurrentXOffset() {
    return this.dropdownBoundingBox.left;
  }
  private get dropdownCurrentYOffset() {
    return this.dropdownBoundingBox.top;
  }
  private get dropdownCurrentWidth() {
    return this.dropdownNativeEl.clientWidth;
  }
  private get dropdownCurrentHeight() {
    return this.dropdownNativeEl.clientHeight;
  }
  private get windowCurrentWidth() {
    return window.innerWidth;
  }
  private get windowCurrentHeight() {
    return window.innerHeight;
  }

  private get fixedYOffset() {
    return 16;
  }
  private get fixedXOffset() {
    return 16;
  }

  constructor(private readonly el: ElementRef<HTMLDivElement>) {}
  ngOnInit() {
    this.visible = true;
    this.setCriticalParentStyles();
    this.setCriticalDropdownStyles();
    this.appendDropdownToParent();
    this.attachWindowListeners();
  }
  private appendDropdownToParent() {
    this.el.nativeElement.appendChild(this.dropdownNativeEl);
  }
  private setCriticalParentStyles() {
    this.hostNativeEl.style.position = 'relative';
  }
  private setCriticalDropdownStyles() {
    this.dropdownNativeEl.style.position = 'absolute';
    this.dropdownNativeEl.style.zIndex = '99';
    /** Replace with CSS variables??? */
    this.dropdownNativeEl.style.minWidth = '230px';
    this.dropdownNativeEl.style.minHeight = '135px';
  }
  private evaluateDropdownPosition() {
    this.dropdownNativeEl.style.left = '0';
    /**
     * Render position:
     * -1: before
     *  0: level
     *  1: after
     *
     */
    let x: -1 | 1 | 0 = 0;
    let y: -1 | 1 = 1;
    /** If dropdown is exceeding page, render it on top - place it on bottom by default */
    if (
      this.dropdownCurrentHeight +
        this.dropdownCurrentYOffset +
        this.fixedYOffset >
      this.windowCurrentHeight
    ) {
      y = -1;
    }
    /** Y */
    if (y === -1) {
      this.dropdownNativeEl.style.top = 'auto';
      this.dropdownNativeEl.style.bottom = '100%';
    } else {
      this.dropdownNativeEl.style.top = '100%';
      this.dropdownNativeEl.style.bottom = 'auto';
    }
  }
  private attachWindowListeners() {
    const cb = () => {
      this.evaluateDropdownPosition();
    };
    /** First run and attach callback */
    cb();
    window.onresize = () => {
      cb();
    };
  }
}
