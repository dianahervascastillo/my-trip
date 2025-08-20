export async function getTripById(tripId: string): Promise<unknown> {
  const data = await fetch(`https://api.ember.to/v1/trips/${tripId}`);

  // Failed to fetch
  if (!data.ok) {
    throw new Error('Failed to fetch trip information');
  }
  const info = await data.json();

  return info;
}
