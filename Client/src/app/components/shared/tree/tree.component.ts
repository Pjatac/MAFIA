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
  counter = 0;// need for init treeItems without sending event

  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
  });
  buttonClass = 'btn-outline-primary';
  treeItems: TreeviewItem[];
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
        if (wsList.indexOf(api.split("/")[0]) < 0) {//check for parrent node(web service) existing
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
    if (this.counter > 1)
      this.changeSelection.emit(event);
      this.counter++;
  }
  onFilterChange(event) {

  }

}
