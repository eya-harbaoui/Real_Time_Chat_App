export function extractTime(dateString) {
  //convert the date string to date object (date string will be in this format : 2025-01-10T12:00:35.651+00:00)
  const date = new Date(dateString);
  //extract the hours and minutes : hours : 12 , minutes : 00
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  //the result will be : 12:00
  return `${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero : hours and minutues must be composed of 2 digits (add zero : 8:50 => 08:50)
function padZero(number) {
  return number.toString().padStart(2, "0");
}
