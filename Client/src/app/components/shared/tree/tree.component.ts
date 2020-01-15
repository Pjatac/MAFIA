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
    maxHeight: 400
});
  buttonClass = 'btn-outline-primary';
  treeItems:TreeviewItem[] = this.getBooks();
  values: number[];
  constructor() { }

  ngOnInit() {
    this.treeItems= this.getBooks();
  }
  onSelectedChange(event) {

  }
  onFilterChange(event) {

  }
  getBooks(): TreeviewItem[] {
    const authMngCategory = new TreeviewItem({
        text: 'AuthMng', value: 1,collapsed: true, children: [
            { text: 'LogIn', value: 11 },
            { text: 'LogOut', value: 12 }
        ]
    });
    const clientMngCategory = new TreeviewItem({
        text: 'ClientMng', value: 2, collapsed: true,  children: [
          { text: 'Create', value: 21 },
          { text: 'Edit', value: 22 },
          { text: 'Del', value: 23 }
        ]
    });
    const mailMngCategory = new TreeviewItem({
      text: 'MailMng', value: 3, collapsed: true,children:[
        { text: 'Send', value: 31 },
        { text: 'Check', value: 32 }
      ]
    });
    const analiticCategory = new TreeviewItem({
      text: 'Analitic', value: 4, collapsed: true,children:[
        { text: 'GetAll', value: 41 },
        { text: 'GetErr', value: 42 },
        { text: 'GetServ', value: 43 },
        { text: 'GetResp', value: 44 },
      ]
    });
    return [authMngCategory, clientMngCategory, mailMngCategory, analiticCategory];
}
}
