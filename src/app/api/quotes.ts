export async function getAllQuotes(): Promise<unknown> {
  // API complains if dater is in the past and further than 2 days in the future
  // Get today's date
  const today = new Date();

  // Add 2 days
  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(today.getDate() + 2);

  const currentDate = today.toISOString();
  const futureDate = dayAfterTomorrow.toISOString();

  console.log('Today:', currentDate);
  console.log('2 days later:', futureDate);

  const data = await fetch(
    `https://api.ember.to/v1/quotes/?origin=13&destination=42&departure_date_from=${currentDate}&departure_date_to=${futureDate}`
  );

  // Failed to fetch
  if (!data.ok) {
    throw new Error('Failed to fetch quotes');
  }
  const { quotes } = await data.json();

  return quotes;
}
