import { Component, OnInit } from '@angular/core';
import  FilterService  from 'src/app/services/filter.service';


@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.css']
})
export class PrintLayoutComponent implements OnInit {
  constructor(private filter: FilterService) {    
    console.log(filter.states);
   }

  ngOnInit() {
    
  }

}
