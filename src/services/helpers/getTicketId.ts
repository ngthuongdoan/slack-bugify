export const getTicketId = (link = '') => {
  const regex = /([A-Z]+-[0-9]+)/
  const match = link?.match(regex)
  return match?.[1] || ''
}
