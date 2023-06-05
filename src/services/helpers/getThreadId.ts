import dayjs from 'dayjs'

export const getThreadId = () => {
  // set the time zone to UTC+7 (Asia/Bangkok)
  const timeZone = 'Asia/Bangkok'

  // get the current date in the UTC+7 time zone
  const date = dayjs().utc().tz(timeZone)

  // get the start of day in the UTC+7 time zone
  const startOfDay = date.startOf('day')

  const timestamp = Math.floor(startOfDay.unix())
  return timestamp
}
