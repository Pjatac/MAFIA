import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import FilterService from 'src/app/services/filter.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';


@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.css']
})
export class PrintLayoutComponent implements OnInit {
  exportAsConfig: ExportAsConfig = {
    type: 'png', // the type you want to download
    elementId: 'printFrame', // the id of html/table element
    options: { // html-docx-js document options
      orientation: 'portrait',
      height: 1500
    }
  }

  constructor(private filter: FilterService, private exportAsService: ExportAsService, private elem:ElementRef) { }

  ngOnInit() {

  }

  save() {
    let elements = this.elem.nativeElement.querySelectorAll('svg .c3-chart path.c3-shape.c3-shape.c3-line');
    elements.forEach(function(element){
      element.style.fill = "none";
    })
    this.exportAsService.get(this.exportAsConfig).subscribe((content) => {
      this.filter.sendMail({adresses: "pjataka@gmail.com",name: "image.png", data: content});
    });
  }

}
