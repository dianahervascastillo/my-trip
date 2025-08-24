export async function getTripById(tripId: string): Promise<unknown> {
  const data = await fetch(`https://api.ember.to/v1/trips/${tripId}`, {
    // setting it to not cache so I can get fresh info but not ideal for the data that doesn't change.
    cache: 'no-store'
  });

  // Failed to fetch
  if (!data.ok) {
    throw new Error('Failed to fetch trip information');
  }
  const trip = await data.json();

  console.log('tripInfo', trip);

  return trip;
}
