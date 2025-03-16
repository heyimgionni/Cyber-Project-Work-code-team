const handleTime = (seconds) => {
  //.toFixed(quanti decimali)
  if (seconds < 1) return "< 1 secondo";
  if (seconds < 60) return `${seconds.toFixed(2)} secondi`;
  let minutes = seconds / 60;
  if (minutes < 60) return `${minutes.toFixed(2)} minuti`;
  let hours = minutes / 60;
  if (hours < 24) return `${hours.toFixed(2)} ore`;
  let days = hours / 24;
  if (days < 365) return `${days.toFixed(2)} giorni`;
  let years = days / 365;
  if (years < 100) return `${years.toFixed(2)} anni`;
  return `${(years / 1000).toFixed(2)} millenni`;
};

export default handleTime;
