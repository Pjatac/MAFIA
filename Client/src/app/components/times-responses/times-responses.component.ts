import { Component, OnInit, Input } from '@angular/core';
import TrService from '../../services/tr.service';
import { TimeResponse } from '../../models/tr';
import { Helper } from 'src/app/middleware/helper';
import AuthService from 'src/app/services/auth.service';


@Component({
  selector: 'app-times-responses',
  templateUrl: './times-responses.component.html',
  styleUrls: ['./times-responses.component.css']
})
export class TimesResponsesComponent implements OnInit {
  @Input() showCodesPie:boolean;
  @Input() showTimesPie:boolean;
  @Input() disable: boolean = false;

  timeData = [];
  respData = [];

  constructor(private trService: TrService, private auth: AuthService) { }

  ngOnInit() {
    this.auth.CheckTokenValidation();
    this.trService.requestResponses();
    this.trService.getResponses().subscribe((responses: TimeResponse[]) => {
      this.trService.wsData = responses;
      this.respData = this.trService.getCodesData();
      this.timeData =  this.trService.getTimesData();
    });
  }
}