export default function (input: string) {
  const cleanedInput = input.toLowerCase();
  let [local, domain] = cleanedInput.split('@');
  if (domain.includes('gmail.com')) {
    local = local.replace(/\./g, '');
    return `${local}@${domain}`;
  }
  return cleanedInput;
}
