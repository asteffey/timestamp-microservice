import express from 'express'
import parseDate from './parseDate'

const timestampApi = express()

function getResponse (value: number | string) {
  try {
    const date = parseDate(value)
    return toTimestamp(date)
  } catch (_) {
    return {
      error: 'Invalid Date'
    }
  }
}

function toTimestamp (date: Date) {
  return {
    unix: date.getTime(),
    utc: date.toUTCString()
  }
}

timestampApi.get('/api/timestamp/:value(\\d+)', ({ params: { value } }, res) => {
  res.json(getResponse(Number(value)))
})

timestampApi.get('/api/timestamp/:value', ({ params: { value } }, res) => {
  res.json(getResponse(value))
})

export default timestampApi
