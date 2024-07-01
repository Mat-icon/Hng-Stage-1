const output = document.querySelector("pre");
const image = document.querySelector("img");

image.addEventListener("load", (event) => {
  const { naturalWidth, naturalHeight, width, height } = image;
  output.textContent = `
Natural size: ${naturalWidth} x ${naturalHeight} pixels
Displayed size: ${width} x ${height} pixels
`;
});

document.addEventListener('DOMContentLoaded', () => {
    const currentTimeUTC = document.getElementById('currentTimeUTC');
    const currentDay = document.getElementById('currentDay');

    function updateTime() {
        const now = new Date();
        currentTimeUTC.textContent = now.toUTCString().split(' ')[4]; // Extract time from UTC string
        currentDay.textContent = now.toLocaleString('en-US', { weekday: 'long' });
    }

    updateTime();
    setInterval(updateTime, 1000); // Update time every second
});
