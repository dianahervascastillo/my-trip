export async function getAllQuotes(): Promise<unknown> {
  // API complains if dater is in the past and further than 2 days in the future
  // Get today's date
  const today = new Date();

  // Add 2 days
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const currentDate = today.toISOString();
  const futureDate = tomorrow.toISOString();

  console.log('currentDate', currentDate);
  console.log('futureDate', futureDate);

  // Just checking quotes from Aberdeen P&R to Edinburgh
  const data = await fetch(
    `https://api.ember.to/v1/quotes/?origin=171&destination=42&departure_date_from=${currentDate}&departure_date_to=${futureDate}`,
    {
      cache: 'no-store'
    }
  );

  // Failed to fetch
  if (!data.ok) {
    throw new Error('Failed to fetch quotes');
  }
  const { quotes } = await data.json();
  console.log('quotes', quotes);

  return quotes;
}
