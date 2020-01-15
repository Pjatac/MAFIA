import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit, OnChanges {
  @Input() apiList: string[];
  @Output() changeSelection = new EventEmitter();

  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
  });
  buttonClass = 'btn-outline-primary';
  treeItems: TreeviewItem[] = this.getBooks();
  values: string[];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.apiList) {
      this.treeItems = [];
      let wsList = [];
      this.apiList.sort();
      this.apiList.forEach(api => {
        if (wsList.indexOf(api.split("/")[0]) < 0) {
          wsList.push(api.split("/")[0]);
          this.treeItems.push(new TreeviewItem({
            text: api.split("/")[0], value: api.split("/")[0], collapsed: true, children:
              [
                { text: api.split("/")[1], value: api.split("/")[1] }
              ]
          }));
        }
        else {
          this.treeItems[this.treeItems.length - 1].children.push(new TreeviewItem({ text: api.split("/")[1], value: api.split("/")[1] }));
        }
      });
    }
  }
  onSelectedChange(event) {

  }
  onFilterChange(event) {

  }
  getBooks(): TreeviewItem[] {
    const authMngCategory = new TreeviewItem({
      text: 'AuthMng', value: 'AuthMng', collapsed: true, children: [
        { text: 'LogIn', value: 'LogIn' },
        { text: 'LogOut', value: 'LogOut' }
      ]
    });
    const clientMngCategory = new TreeviewItem({
      text: 'ClientMng', value: 2, collapsed: true, children: [
        { text: 'Create', value: 21 },
        { text: 'Edit', value: 22 },
        { text: 'Del', value: 23 }
      ]
    });
    const mailMngCategory = new TreeviewItem({
      text: 'MailMng', value: 3, collapsed: true, children: [
        { text: 'Send', value: 31 },
        { text: 'Check', value: 32 }
      ]
    });
    const analiticCategory = new TreeviewItem({
      text: 'Analitic', value: 4, collapsed: true, children: [
        { text: 'GetAll', value: 41 },
        { text: 'GetErr', value: 42 },
        { text: 'GetServ', value: 43 },
        { text: 'GetResp', value: 44 },
      ]
    });
    return [authMngCategory, clientMngCategory, mailMngCategory, analiticCategory];
  }
}
