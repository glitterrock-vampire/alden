export const CONTACT_EMAIL = 'aldenwebstudios@gmail.com';

export function createContactMailto(subject, fields) {
  const body = Object.entries(fields)
    .map(([label, value]) => `${label}: ${value || 'Not provided'}`)
    .join('\n');

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}