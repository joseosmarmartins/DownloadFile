
// receive a json, a name to the file, and the type of the file as arguments
const downloadJS = {
  download(filestr, name, type, cb) {
    const blob = new Blob([filestr], {
      type: 'text/plain; encoding=utf8'
    })

    const a = document.createElement('a')
    document.lastChild.appendChild(a)
    a.style = 'display: none'

    const url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = `${name}.${type}`
    a.click()
    window.URL.revokeObjectURL(url)
    cb(url);
  }

  convert: {
    toCSV(json) {
      const replacer = (key, value) => value == null ? '' : value
      const header = Object.keys(json[0])
      let csv = json.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
      csv.unshift(header.join(','))
      csv = csv.join('\r\n')
      return csv
    }
  }
}

export default downloadJS;