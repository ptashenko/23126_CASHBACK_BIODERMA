/*

export function isNumber (str: string): boolean {
  const pattern = /^\d+\.?\d*$/
  return pattern.test(str)
}

export function isAlpha (str: string): boolean {
  const pattern = /^[a-zA-Z]+$/
  return pattern.test(str)
}

*/

export function hasAllowChars (str: string): boolean {
  // Accept all letters and apostrophe
  const pattern = /^[a-zA-ZàèìòùÀÈÌÒÙâäôéëêïîçûüÿæœÂÄÔÉËÊÏÎŸÇÛÜÆŒößÖáíñóúÁÍÑÓÚ']+$/
  return pattern.test(str)
}

export const toSentenceCase = (str: string): string =>
  str.split(/([ '])/).map(word => `${word.charAt(0).toUpperCase()}${word.substring(1)}`).join('')

export const handleInvalidSubmit = ({ errors }: Record<string, any>): void => {
  const errorField = document.getElementById(Object.keys(errors)[0])
  errorField?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  })
}

export const fieldIsRequired = (required = false, rules: Record<string, any> | string) => required ||
  (typeof rules === 'object' && rules.required) ||
  (typeof rules === 'string' && rules.includes('required'))
