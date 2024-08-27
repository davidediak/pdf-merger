import { Injectable } from '@angular/core';
import { AppType } from '@server';
import { hc } from 'hono/client';

@Injectable({ providedIn: 'root' })
export class UploadService {
  public client = hc<AppType>('https://just-merge-pdf.vercel.app/api');

  public async uploadFiles(files: File[]) {
    const res = await this.client.upload.$post({ form: { files } });
    return await res.arrayBuffer();
  }
}
