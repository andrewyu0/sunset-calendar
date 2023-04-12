document.getElementById('addEvents').addEventListener('click', addSunsetEvents);

function addSunsetEvents() {
  // Replace with your own Google API key
  const API_KEY = 'YOUR_API_KEY';
  const latitude = 37.7749;
  const longitude = -122.4194;

  // Set the date range for sunset events
  const start_date = new Date('2023-04-12');
  const end_date = new Date('2023-04-30');

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const statusElement = document.getElementById('status');
  statusElement.textContent = 'Adding events...';

  for (let d = start_date; d <= end_date; d.setDate(d.getDate() + 1)) {
    const dateString = d.toISOString().split('T')[0];
    const url = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${dateString}&formatted=0`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          const sunset = new Date(data.results.sunset);
          sunset.setMinutes(sunset.getMinutes() - 10);
          const event = {
            summary: 'Sunset',
            start: {
              dateTime: sunset.toISOString(),
              timeZone: timezone
            },
            end: {
              dateTime: new Date(sunset.getTime() + 10 * 60 * 1000).toISOString(),
              timeZone: timezone
           
