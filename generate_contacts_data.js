import fs from 'fs';

// Generate MongoDB ObjectId-like string
function generateObjectId() {
  const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
  const random = Array.from({ length: 16 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
  return timestamp + random;
}

// Read the template data
const template = {
  "_id": {
    "$oid": "69576cfd3f6c6ae911623be4"
  },
  "merchantId": "gid://shopify/Shop/97109770609",
  "text": {
    "fname": "Divyesh",
    "lname": "Bhakhar",
    "data": "hello"
  },
  "email": {
    "email": "divyeshbgeek435@gmail.com"
  },
  "number": {
    "phone": "9543221045",
    "telephone": "9638527409"
  },
  "textarea": {
    "note": "gsre"
  },
  "checkbox": {},
  "dropdown": {
    "color": "red"
  },
  "radio": {
    "you are fine?": "yes"
  },
  "ipAddress": "43.251.72.109",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
  "createdAt": {
    "$date": "2026-01-02T07:00:13.139Z"
  },
  "updatedAt": {
    "$date": "2026-01-02T07:00:13.139Z"
  },
  "__v": 0
};

// Define the pattern for records per day
// Day 1: 10, Day 2: 20, Day 3: 30, Day 4: 50, Day 5: 70
// Continue with increment of 20 for remaining days
function getRecordsForDay(day) {
  if (day === 1) return 10;
  if (day === 2) return 20;
  if (day === 3) return 30;
  if (day === 4) return 50;
  if (day === 5) return 70;
  
  // Continue pattern: 90, 110, 130, 150, etc. (increment of 20)
  return 70 + (day - 5) * 20;
}

// Generate data for 30 days
const allRecords = [];
const startDate = new Date('2026-01-01T00:00:00.000Z');
let recordCounter = 0;

for (let day = 1; day <= 30; day++) {
  const recordsForDay = getRecordsForDay(day);
  // Create base date for this day at midnight
  const dayStart = new Date(startDate);
  dayStart.setUTCDate(startDate.getUTCDate() + (day - 1));
  dayStart.setUTCHours(0, 0, 0, 0);
  
  for (let i = 0; i < recordsForDay; i++) {
    recordCounter++;
    
    // Generate unique ID
    const newId = generateObjectId();
    
    // Create record with unique ID and date
    const record = JSON.parse(JSON.stringify(template));
    record._id.$oid = newId;
    
    // Set dates for this day (spread throughout the day, but stay within the same day)
    const recordDate = new Date(dayStart);
    // Add random time but ensure it stays within the same day (0-23 hours, 0-59 minutes, etc.)
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    const seconds = Math.floor(Math.random() * 60);
    const milliseconds = Math.floor(Math.random() * 1000);
    recordDate.setUTCHours(hours, minutes, seconds, milliseconds);
    
    record.createdAt.$date = recordDate.toISOString();
    record.updatedAt.$date = recordDate.toISOString();
    
    // Add some variation to make records unique
    record.text.fname = `Divyesh${recordCounter}`;
    record.email.email = `divyeshbgeek${recordCounter}@gmail.com`;
    record.number.phone = String(9543221000 + recordCounter).padStart(10, '0');
    
    allRecords.push(record);
  }
  
  console.log(`Day ${day}: Generated ${recordsForDay} records`);
}

// Write to file
const output = JSON.stringify(allRecords, null, 2);
fs.writeFileSync('testdb.contacts.json', output, 'utf8');

console.log(`\nTotal records generated: ${allRecords.length}`);
console.log('File saved as: testdb.contacts.json');

