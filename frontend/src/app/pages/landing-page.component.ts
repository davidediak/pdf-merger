import { Component, inject } from '@angular/core';
import { PDF_FILE_TYPE } from '@server';
import { FileUploadComponent } from '../components/file-upload.component';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-lading-page',
  standalone: true,
  imports: [FileUploadComponent],
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
        <app-file-upload (uploadHandler)="uploadHandler($event)" />
      </div>
    </div>
  `,
})
export class LandingPageComponent {
  private readonly _uploadService = inject(UploadService);

  public async uploadHandler(files: File[]) {
    this._uploadService.uploadFiles(files).then((response) => {
      const fileURL = URL.createObjectURL(new Blob([response], { type: PDF_FILE_TYPE }));
      const n = files.map((file) => file.name.split('.').slice(0, -1).join('.')).join('_') + '.pdf';

      this._downloadFile(fileURL, n);
    });
  }

  private _downloadFile(fileURL: string, fileName: string) {
    const a = document.createElement('a');
    a.href = fileURL;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
  }
}
