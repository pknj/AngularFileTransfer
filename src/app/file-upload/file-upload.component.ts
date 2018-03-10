import {Component} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {AuthConfigConsts} from 'angular2-jwt';

const URL = 'http://localhost:8091/admin/file/upload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  uploader: FileUploader = new FileUploader({url: URL, method: 'POST', authToken: this.authTokenHeader});

  hasDropAreaOver = false;

  fileOver($event): void {
    setTimeout(() => this.hasDropAreaOver = $event, 0);
  }

  get authTokenHeader() {
    const token = localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME);
    return AuthConfigConsts.HEADER_PREFIX_BEARER + token;
  }
}


