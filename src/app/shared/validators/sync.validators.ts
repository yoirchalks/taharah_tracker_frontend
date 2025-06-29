import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordsMatch(
  group: AbstractControl
): ValidationErrors | null {
  const password = group.get('password')?.value.trim();
  const repeatPassword = group.get('repeatPassword')?.value.trim();
  if (!password || !repeatPassword) return null;
  return password === repeatPassword ? null : { passwordsDoNotMatch: true };
}
