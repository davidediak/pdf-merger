import { Component, output, viewChild } from '@angular/core';
import { MAX_FILE_SIZE, MIN_NUMBER_OF_FILES, PDF_FILE_TYPE } from '@server';
import { ButtonModule } from 'primeng/button';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [FileUploadModule, ButtonModule],
  template: `
    <p-fileUpload
      #primengComp
      [multiple]="true"
      [accept]="fileType"
      [maxFileSize]="maxFileSize"
      [customUpload]="true"
    >
      <ng-template pTemplate="header" let-files>
        <div class="flex items-center justify-center flex-col gap-6 font-bold">
          <p-button
            label="⚡Merge!⚡"
            [raised]="true"
            size="large"
            [styleClass]="'w-64'"
            [disabled]="files.length < minNumberOfFiles"
            (onClick)="onUpload(files)"
          />
        </div>
      </ng-template>

      <ng-template pTemplate="empty">
        <div
          class="flex items-center justify-center flex-col gap-6 font-bold"
          [style]="{ height: '50vh' }"
        >
          <span class="text-xl capitalize">Drop files here</span>
        </div>
      </ng-template>
    </p-fileUpload>
  `,
  styles: [
    `
      ::ng-deep .p-fileupload-highlight {
        background-image: linear-gradient(90deg, silver 50%, transparent 50%),
          linear-gradient(90deg, silver 50%, transparent 50%),
          linear-gradient(0deg, silver 50%, transparent 50%),
          linear-gradient(0deg, silver 50%, transparent 50%);
        background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
        background-size: 15px 2px, 15px 2px, 2px 15px, 2px 15px;
        background-position: left top, right bottom, left bottom, right top;
        animation: border-dance 1s infinite linear;
      }

      @keyframes border-dance {
        0% {
          background-position: left top, right bottom, left bottom, right top;
        }
        100% {
          background-position: left 15px top, right 15px bottom, left bottom 15px, right top 15px;
        }
      }
    `,
  ],
})
export class FileUploadComponent {
  public maxFileSize = MAX_FILE_SIZE;
  public fileType = PDF_FILE_TYPE;
  public minNumberOfFiles = MIN_NUMBER_OF_FILES;
  public uploadHandler = output<File[]>();
  public primengComp = viewChild<FileUpload>('primengComp');

  public onUpload(files: File[]) {
    this.uploadHandler.emit(files);
    this.primengComp()?.clear();
  }
}
