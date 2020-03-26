import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ScreenshotService } from './services/screenshot.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'app';
  dropdownList = [];
  selectedItems;
  dropdownSettings = {};

  constructor(private auth: AuthService, private filter: ScreenshotService, private router: Router) { }

  ngOnInit(): void {
    this.dropdownList = this.filter.filterList;
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      text: "Current State Print",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: 'flex-grow-1 border border-dark rounded'
    };
  }

  checkLogedIn() {
    return this.auth.getToken();
  }

  logout() {
    this.auth.removeToken();
  }

  // for multi select component
  onItemSelect(item: any) { }
  OnItemDeSelect(item: any) {}
  onSelectAll(items: any) {}
  onDeSelectAll(items: any) {}

  print() {
    this.filter.setSelected(this.selectedItems);
    this.selectedItems = [];
    this.router.navigateByUrl('/print');
  }

  
  closeMenu() {
    document.querySelector('.navbar-collapse').classList.remove('show');
  }
}

