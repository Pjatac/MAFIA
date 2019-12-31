import { Component, OnInit } from '@angular/core';
import TrService from '../../services/tr.service';
import { TimeResponse } from '../../models/tr';
import { Helper } from 'src/app/middleware/helper';

@Component({
  selector: 'app-times-responses',
  templateUrl: './times-responses.component.html',
  styleUrls: ['./times-responses.component.css']
})
export class TimesResponsesComponent implements OnInit {
  timeData = [];
  respData = [];

  constructor(private trService: TrService) { }

  ngOnInit() {
    // this.trService.requestResponses();
    // this.trService.getResponses().subscribe((responses: TimeResponse[]) => {
    //   this.trService.wsData = responses;
    //   this.respData = this.trService.getCodesData();
    //   this.timeData =  this.trService.getTimesData();
    // });
    
    this.trService.wsData = Helper.getWSData();
    this.respData = this.trService.getCodesData();
    this.timeData = this.trService.getTimesData();
  }
}