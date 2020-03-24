import { Component, OnInit, Input } from '@angular/core';
import TrService from '../../services/tr.service';
import { TimeResponse } from '../../models/tr';
import AuthService from '../../services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-times-responses',
  templateUrl: './times-responses.component.html',
  styleUrls: ['./times-responses.component.css']
})
export class TimesResponsesComponent implements OnInit {
  @Input() showCodesPie: boolean;
  @Input() showTimesPie: boolean;
  @Input() disable: boolean = false;

  timeData = [];
  respData = [];

  constructor(private trService: TrService, private auth: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show('timespiner');
    this.auth.CheckTokenValidation();
    this.trService.requestResponses();
    this.trService.getResponses().subscribe((responses: TimeResponse[]) => {
      this.trService.wsData = responses;
      this.respData = this.trService.getCodesData();
      this.timeData = this.trService.getTimesData();
      this.spinner.hide('timespiner');
    });
  }
}