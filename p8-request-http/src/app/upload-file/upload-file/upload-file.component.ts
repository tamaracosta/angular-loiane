
import { environment } from './../../../../../p8-request-http/src/environments/environment.prod';

import { UploadFileService } from './../upload-file.service';
import { Component, OnInit } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files?: Set<File>;
  progress = 0;
  constructor(private service: UploadFileService) { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    const selectedFiles = <FileList>event.srcElement.files;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);

    }

    (document.getElementById('customFileLabel') as HTMLElement).innerHTML = fileNames.join(', ');
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service.upload(this.files, environment.BASE_URL + '/upload')
        .pipe(
          uploadProgress((progress: any) => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe(response => console.log('Upload Concluído'));

      // .subscribe((event: HttpEvent<Object>) => {
      //   if (event.type === HttpEventType.Response) {
      //     console.log('Upload Concluído');
      //   } else if (event.type === HttpEventType.UploadProgress) {
      //     const percentDone = Math.round((event.loaded * 100) / (event.total || 1));
      //     this.progress = percentDone;
      //   }
    }
  }
}



