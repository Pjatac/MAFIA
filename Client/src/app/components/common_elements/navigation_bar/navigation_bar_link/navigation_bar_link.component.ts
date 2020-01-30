import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation-bar-link',
  templateUrl: './navigation_bar_link.component.html',
  styleUrls: ['./navigation_bar_link.component.css']
})
export class NavigationBarLinkComponent {
  @Input() active: boolean;
  @Input() disable: boolean;
  @Input() href: string;
  @Output() linkClick = new EventEmitter();

  onClick() {
    this.linkClick.emit();
  }
}
