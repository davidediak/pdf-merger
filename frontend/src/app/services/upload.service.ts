import { Injectable } from '@angular/core';
import { AppType } from '@server';
import { hc } from 'hono/client';

@Injectable({ providedIn: 'root' })
export class UploadService {
  public client = hc<AppType>('https://pdf-merger.davidediak.workers.dev/api');

  public async uploadFiles(files: File[]) {
    const res = await this.client.upload.$post({ form: { files } });
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    return await res.arrayBuffer();
  }
}
