downloadCSV (result, name) {
  if (typeof result === 'string') result = JSON.parse(result)

  const csv = this.toCSV(result)

  download (csv, name, 'csv')
}

downloadTXT (result, name) {
  if (typeof result !== 'string') result = JSON.stringify(result)

  download (result, name, 'txt')
}

// receive a json, a name to the file, and the type of the file as arguments
download (result, name, type) {
  const blob = new Blob([result], { type: 'text/plain; encoding=utf8' })

  const a = document.createElement('a')
  document.lastChild.appendChild(a)
  a.style = 'display: none'

  const url = window.URL.createObjectURL(blob)
  a.href = url
  a.download = `${name}.${type}`
  a.click()
  window.URL.revokeObjectURL(url)
}

toCSV (json) {
  const replacer = (key, value) => value == null ? '' : value
  const header = Object.keys(json[0])
  let csv = json.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  csv.unshift(header.join(','))
  csv = csv.join('\r\n')

  return csv
}
