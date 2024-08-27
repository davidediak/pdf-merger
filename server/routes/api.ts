import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { PDFDocument } from 'pdf-lib';
import { z } from 'zod';
import { MAX_FILE_SIZE, MAX_NUMBER_OF_FILES, MIN_NUMBER_OF_FILES, PDF_FILE_TYPE } from '../utils';

export const apiRoutes = new Hono().post(
  '/upload',
  zValidator(
    'form',
    z.object({
      files: z
        .array(
          z
            .custom<File>((file) => file instanceof File)
            .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
            .refine((file) => file?.type === PDF_FILE_TYPE, 'Only .pdf are supported.')
        )
        .min(MIN_NUMBER_OF_FILES)
        .max(MAX_NUMBER_OF_FILES),
    })
  ),
  async (c) => {
    const { files } = c.req.valid('form');

    if (!files) {
      return c.json({ message: 'No files uploaded' });
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const fileAsArrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(fileAsArrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page: any) => mergedPdf.addPage(page));
    }

    const pdfBytes = (await mergedPdf.save()).buffer;
    return c.body(pdfBytes, { headers: { 'Content-Type': PDF_FILE_TYPE } });
  }
);

export type AppType = typeof apiRoutes;

