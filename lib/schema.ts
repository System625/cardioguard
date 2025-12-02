import { z } from 'zod';

export const cvdSchema = z.object({
  age: z.number().min(1, 'Age must be at least 1').max(120, 'Age too high'),
  gender: z.enum(['male', 'female'], { message: 'Gender is required' }),
  height: z.number().min(100, 'Height must be at least 100 cm').max(250, 'Height too high'),
  weight: z.number().min(30, 'Weight must be at least 30 kg').max(200, 'Weight too high'),
  ap_hi: z.number().min(60, 'Systolic BP too low').max(240, 'Systolic BP too high'),
  ap_lo: z.number().min(40, 'Diastolic BP too low').max(150, 'Diastolic BP too high'),
  cholesterol: z.enum(['normal', 'above', 'well_above'], { message: 'Cholesterol level is required' }),
  gluc: z.enum(['normal', 'above', 'well_above'], { message: 'Glucose level is required' }),
  smoke: z.boolean(),
  alco: z.boolean(),
  active: z.boolean(),
});

export type CvdInput = z.infer<typeof cvdSchema>;
