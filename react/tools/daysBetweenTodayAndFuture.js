export function daysBetweenTodayAndFuture(releaseDate) {
  const today = new Date()
  const futureDate = new Date(releaseDate)
  futureDate.setDate(today.getDate() + 60)

  const timeDifference = futureDate - today
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

  return daysDifference
}
