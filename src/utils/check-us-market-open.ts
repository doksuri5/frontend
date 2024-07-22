const isUSMarketOpen = () => {
  const now = new Date();
  const currentDay = now.getUTCDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
  const currentHour = now.getUTCHours();
  const currentMinute = now.getUTCMinutes();

  // 미국 동부 시간 (UTC-4)
  const marketOpenHour = 13; // 9:30 AM ET (13:30 UTC)
  const marketCloseHour = 20; // 4:00 PM ET (20:00 UTC)

  // Exclude weekends (Saturday and Sunday)
  if (currentDay === 0 || currentDay === 6) {
    return false;
  }

  // Check market hours
  if (
    (currentHour > marketOpenHour && currentHour < marketCloseHour) ||
    (currentHour === marketOpenHour && currentMinute >= 30) ||
    (currentHour === marketCloseHour && currentMinute === 0)
  ) {
    return true;
  } else {
    return false;
  }
};

export default isUSMarketOpen;
