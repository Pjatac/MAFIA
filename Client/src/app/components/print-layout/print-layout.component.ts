import { Component, OnInit, ElementRef } from '@angular/core';
import { ScreenshotService } from 'src/app/services/screenshot.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material';
import { OurDialogComponent } from '../shared/our-dialog/our-dialog.component';
import { NgxSpinnerService } from "ngx-spinner";


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
      height: 1500,
      jsPDF: {
        orientation: 'l',
        format: 'a3'
      }
    }
  }

  constructor(public dialog: MatDialog, public screenshot: ScreenshotService, private exportAsService: ExportAsService, private elem: ElementRef,
    private spinner: NgxSpinnerService) { }
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  emails: string[] = [];
  sendResSubscription;


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our email
    if ((value || '').trim()) {
      this.emails.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(email: string): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }
  ngOnInit() {
  }

  sendScreenshot(type) {
    this.spinner.show('fullscreen');
    if (type === 'jpg') {
      this.exportAsConfig.type = 'png';
    } else {
      this.exportAsConfig.type = type;
    }

    let emailAdresses = this.emails.join();

    //fixing artefacts
    let elements = this.elem.nativeElement.querySelectorAll('svg .c3-chart path.c3-shape.c3-shape.c3-line');
    elements.forEach(function (element) {
      element.style.fill = "none";
    })

    this.exportAsService.get(this.exportAsConfig).subscribe((content) => {
      this.sendResSubscription = this.screenshot.sendMail({ adresses: emailAdresses, name: "screenshot." + type, data: content }).subscribe((res) => {
        this.spinner.hide('fullscreen');
        if (res) {
          this.dialog.open(OurDialogComponent, { panelClass: 'custom-dialog-container', data: { body: "Success!", title: 'Sending result' } });
          this.emails = [];
        }
        else {
          this.dialog.open(OurDialogComponent, { panelClass: 'custom-dialog-container', data: { body: "Sorry, sending problem...!", title: 'Sending result' } });
        }
        this.sendResSubscription.unsubscribe();
      });
    });
  }
  ngOnDestroy() {
    this.sendResSubscription.unsubscribe();
  }
}
