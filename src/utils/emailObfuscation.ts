/**
 * Obfuscate email address to protect against spam bots
 * Splits email into parts and encodes them
 */
export function obfuscateEmail(email: string): string {
  const [localPart, domain] = email.split("@");
  // Encode using simple character code shifting (reversible)
  const encodedLocal = btoa(localPart).split("").reverse().join("");
  const encodedDomain = btoa(domain).split("").reverse().join("");
  return `${encodedLocal}@${encodedDomain}`;
}

/**
 * Deobfuscate email address
 */
export function deobfuscateEmail(obfuscated: string): string {
  const [encodedLocal, encodedDomain] = obfuscated.split("@");
  const localPart = atob(encodedLocal.split("").reverse().join(""));
  const domain = atob(encodedDomain.split("").reverse().join(""));
  return `${localPart}@${domain}`;
}

/**
 * Get email address dynamically to protect against spam bots
 * This function builds the email from character codes at runtime, making it harder
 * for bots to scrape from the HTML source. The email is still visible in the
 * compiled JavaScript, but this adds a layer of obfuscation.
 */
export function getEmail(): string {
  // Build email using character codes - harder for simple bots to scrape
  const parts = [
    String.fromCharCode(109, 97, 114, 105, 110, 97), // name
    String.fromCharCode(46), // '.'
    String.fromCharCode(111, 108, 105, 118, 101, 108, 108, 97), // surname
    String.fromCharCode(64), // '@'
    String.fromCharCode(103, 109, 97, 105, 108), // domain
    String.fromCharCode(46), // '.'
    String.fromCharCode(99, 111, 109), // 'com'
  ];
  return parts.join("");
}
