import { Component, inject } from '@angular/core';
import { MAX_FILE_SIZE, PDF_FILE_TYPE } from '@server';
import { FileUploadModule } from 'primeng/fileupload';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FileUploadModule],
  template: `
    <p-fileUpload
      (uploadHandler)="uploadHandler($event)"
      [multiple]="true"
      accept="application/pdf"
      [maxFileSize]="maxFileSize"
      [customUpload]="true"
    >
      <ng-template pTemplate="content">
        @if (uploadedFiles.length) {
        <ul>
          @for (file of uploadedFiles; track $index) {
          <li>{{ file.name }} - {{ file.size }} bytes</li>

          }
        </ul>
        }
      </ng-template>
    </p-fileUpload>
  `,
})
export class LandingPageComponent {
  private readonly _uploadService = inject(UploadService);
  public uploadedFiles: any[] = [];
  public maxFileSize = MAX_FILE_SIZE;

  public async uploadHandler(event: any) {
    const files = event.files;
    const response = await this._uploadService.uploadFiles(files);
    const file = new Blob([response], { type: PDF_FILE_TYPE });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }
}
