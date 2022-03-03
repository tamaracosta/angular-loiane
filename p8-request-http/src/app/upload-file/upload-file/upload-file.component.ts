import { UploadFileService } from './../upload-file.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files?: Set<File>;
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
      this.service.upload(this.files, 'http://localhost:8000/upload')
        //   .pipe(
        //     uploadProgress(progress => {
        //       console.log(progress);
        //       this.progress = progress;
        //     }),
        //     filterResponse()
        //   )
        .subscribe(response => console.log('Upload Concluído'));
    }
  }

}
