import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordsMatch(
  group: AbstractControl
): ValidationErrors | null {
  const password = group.get('password')?.value.trim();
  const repeatPassword = group.get('repeatPassword')?.value.trim();
  if (!password || !repeatPassword) return null;
  return password === repeatPassword ? null : { passwordsDoNotMatch: true };
}

export function passwordRequirements(control: AbstractControl) {
  const string = control.value.trim();
  if (!string) return null;
  const containsUpperCase = /[A-Z]/.test(string);
  const containsNumber = /[0-9]/.test(string);
  const containsSpecial = /[^a-zA-Z0-9]/.test(string);
  const containsLowerCase = /[a-z]/.test(string);
  const trueCount = [containsNumber, containsSpecial, containsUpperCase].filter(
    Boolean
  ).length;
  return trueCount >= 2 && containsLowerCase ? null : { notSecure: true };
}
