export function getTaipeiTime() {
  const now = new Date();
  now.setHours(now.getHours() + 8);
  now.setMinutes(now.getMinutes());
  return now.toISOString().slice(0, 19).replace('T', ' ');
}

// export function getTaipeiTimePlusOneMinute() {
//   const now = new Date();
//   now.setHours(now.getHours() + 8);
//   now.setMinutes(now.getMinutes() + 1);
//   return now.toISOString().slice(0, 19).replace('T', ' ');
// }
