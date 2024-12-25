function getRandomUUID () {
  const array = new Uint8Array(16)

  window.crypto.getRandomValues(array)

  array[6] = (array[6] & 0x0f) | 0x40 // 设置版本为 4
  array[8] = (array[8] & 0x3f) | 0x80 // 设置变体为 8-11

  let uuid = ''

  for (let i = 0; i < array.length; i++) {
    const hex = array[i].toString(16).padStart(2, '0')

    uuid += hex

    if (i === 3 || i === 5 || i === 7 || i === 9) {
      uuid += '-'
    }
  }

  return uuid
}

export function generateUUID () {
  return window.crypto.randomUUID?.() || getRandomUUID()
}

// FNV-a1 algorithm
export function generateHash (str, length = 8) {
  const OFFSET = BigInt('14695981039346656037')
  const MASK64 = BigInt('0xFFFFFFFFFFFFFFFF')
  const PRIME = BigInt('1099511628211')
  const CHARS = '0123456789abcdefghijklmnopqrstuvwxyz'

  let hash = OFFSET

  for (let i = 0; i < str.length; i++) {
    hash ^= BigInt(str.charCodeAt(i))
    hash = (hash * PRIME) & MASK64
  }

  let result = ''

  while (hash > 0 && result.length < length) {
    const r = hash % BigInt(36)

    result = CHARS[Number(r)] + result
    hash = hash / BigInt(36)
  }

  return result.padStart(length, '0').slice(0, length)
}
