import { Component, OnInit } from '@angular/core';
import { VmService } from 'src/app/services/vm.service';

@Component({
  selector: 'app-virtualmashines',
  templateUrl: './virtualmashines.component.html',
  styleUrls: ['./virtualmashines.component.css']
})
export class VirtualmashinesComponent implements OnInit {
  constructor(private vmService: VmService) { }

  ngOnInit() {
    this.vmService.getAllServers().subscribe(data => {
      console.log(data);
    });
  }
}