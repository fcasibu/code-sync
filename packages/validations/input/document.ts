import { Language } from '@prisma/client';
import * as z from 'zod';

export const DocumentCreateInput = z.object({
  language: z.nativeEnum(Language),
  roomId: z.string(),
});
