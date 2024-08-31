import { Component, inject, signal } from '@angular/core';
import { PDF_FILE_TYPE } from '@server';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { FileUploadComponent } from '../components/file-upload.component';
import { UploadService } from '../services/upload.service';
@Component({
  selector: 'app-lading-page',
  standalone: true,
  imports: [FileUploadComponent, ProgressSpinnerModule, ToastModule],
  providers: [MessageService],
  template: `
    <p-toast />
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
        @if(!isLoading()){
        <app-file-upload (uploadHandler)="uploadHandler($event)" />
        } @else {
        <div class="w-full flex items-center justify-center">
          <p-progressSpinner ariaLabel="loading" />
        </div>
        }
      </div>
    </div>
  `,
})
export class LandingPageComponent {
  private readonly _uploadService = inject(UploadService);
  private readonly _messageService = inject(MessageService);
  public isLoading = signal(false);

  public async uploadHandler(files: File[]) {
    this.isLoading.set(true);
    this._uploadService
      .uploadFiles(files)
      .then((response) => {
        this.isLoading.set(false);
        const fileURL = URL.createObjectURL(new Blob([response], { type: PDF_FILE_TYPE }));
        const n =
          files.map((file) => file.name.split('.').slice(0, -1).join('.')).join('_') + '.pdf';

        this._downloadFile(fileURL, n);
      })
      .catch((error) => {
        this.isLoading.set(false);
        console.error(error);
        this._messageService.add({
          severity: 'error',
          summary: 'An error has occurred on the server!',
        });
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
