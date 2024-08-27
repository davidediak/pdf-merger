import { Component, inject } from '@angular/core';
import { MAX_FILE_SIZE, MIN_NUMBER_OF_FILES, PDF_FILE_TYPE } from '@server';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FileUploadModule, ButtonModule],
  template: `
    <div class="p-12 flex justify-center flex-col items-center gap-3 font-sans">
      <h1
        class="text-slate-900 capitalize font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white"
        [style.color]="'#b19df7'"
      >
        This thingy just merges PDF
      </h1>
      <div class="text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
        <p>Just drag&drop 2 or more PDF and then hit the button.</p>
      </div>
      <div class="w-full">
        <p-fileUpload
          [multiple]="true"
          [accept]="fileType"
          [maxFileSize]="maxFileSize"
          [customUpload]="true"
        >
          <ng-template pTemplate="header" let-files>
            <div class="flex items-center justify-center flex-col gap-6 font-bold">
              <p-button
                icon="fa-solid fa-upload"
                label="Merge!"
                [raised]="true"
                size="large"
                [styleClass]="'w-64'"
                [disabled]="files.length < minNumberOfFiles"
                (onClick)="uploadHandler(files)"
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
      </div>
    </div>
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
export class LandingPageComponent {
  private readonly _uploadService = inject(UploadService);
  public maxFileSize = MAX_FILE_SIZE;
  public fileType = PDF_FILE_TYPE;
  public minNumberOfFiles = MIN_NUMBER_OF_FILES;

  public async uploadHandler(files: File[]) {
    this._uploadService.uploadFiles(files).then((response) => {
      const file = new Blob([response], { type: PDF_FILE_TYPE });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }
}
