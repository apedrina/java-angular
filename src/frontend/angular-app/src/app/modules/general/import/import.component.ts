import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BackendService} from 'src/app/_services/import.service';
import {AlertService} from '../../application/ui-core/alerts/alert.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  @ViewChild('fileUI') fileUI: ElementRef
  fileToUpload: File = null;
  filePath: string;
  constructor(private alertService: AlertService, private lrdbService: BackendService) { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.filePath = this.fileToUpload.name

  }

  upload() {
    this.lrdbService.uploadFile(this.fileToUpload).then(data => {
      this.alertService.success('File uploaded successfully.',
        { autoClose: true }
      );
      this.filePath = ''
      this.fileToUpload = null
      this.fileUI.nativeElement.value = ''

    }, err => {
      this.alertService.error('file upload error.',
        { autoClose: true }
      );

    })

  }

}
