import { writable } from 'svelte/store';

// Read the value from localStorage or use an empty array if it doesn't exist or is not valid JSON
let storedWeeks = [];
try {
  const storedData = localStorage.getItem('weeks');
  if (storedData) {
    storedWeeks = JSON.parse(storedData);
    if (!Array.isArray(storedWeeks)) {
      storedWeeks = [];
    }
  }
} catch (error) {
  console.error('Error parsing stored data:', error);
}

// Create the writable store with the initial value
const weeks = writable(storedWeeks);

// Subscribe to the store and update localStorage whenever the value changes
weeks.subscribe(value => {
  localStorage.setItem('weeks', JSON.stringify(value));
});

export { weeks };
