import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 500
  });
  buttonClass = 'btn-outline-primary';
  treeItems = this.getBooks();
  constructor() { }

  ngOnInit() {
  }
  onSelectedChange(event) {

  }
  onFilterChange(event) {

  }
  getBooks(): TreeviewItem[] {
    const authMngCategiry = new TreeviewItem({
        text: 'AuthMng', value: 1, children: [
            { text: 'LogIn', value: 11 },
            { text: 'LogOut', value: 12 }
        ]
    });
    const clientMngCategory = new TreeviewItem({
        text: 'ClientMng', value: 2,   children: [
          { text: 'Create', value: 21 },
          { text: 'Edit', value: 22 },
          { text: 'Del', value: 23 }
        ]
    });
    const mailMngCategory = new TreeviewItem({
      text: 'MailMng', value: 3, children:[
        { text: 'Send', value: 31 },
        { text: 'Check', value: 32 }
      ]
    });
    const analiticCategory = new TreeviewItem({
      text: 'Analitic', value: 4, children:[
        { text: 'GetAll', value: 41 },
        { text: 'GetErr', value: 42 },
        { text: 'GetServ', value: 43 },
        { text: 'GetResp', value: 44 },
      ]
    });
    return [authMngCategiry, clientMngCategory, mailMngCategory, analiticCategory];
}
}
