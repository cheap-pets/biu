let sequenceID = new Date()

export function generateSequenceID () {
  return sequenceID++
}

export function generateUUID () {
  return crypto.randomUUID()
}
