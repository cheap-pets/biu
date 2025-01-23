import lang from '@/langs'

const { ACCEPT, OK, YES, NO, CANCEL } = lang.Button

export const ButtonPresets = {
  '#YES': { name: 'YES', caption: YES, primary: true },
  '#YES!': { name: 'YES', caption: YES, danger: true },
  '#NO': { name: 'NO', caption: NO, action: 'close', buttonStyle: 'text' },
  '#OK': { name: 'OK', caption: OK, primary: true },
  '#OK!': { name: 'OK', caption: OK, danger: true },
  '#ACCEPT': { name: 'ACCEPT', caption: ACCEPT, primary: true },
  '#CANCEL': { name: 'CANCEL', caption: CANCEL, action: 'close', buttonStyle: 'text' },
  ' ': { is: 'div', class: 'mu-space' },
  '-': { is: 'div', class: 'mu-divider' }
}
