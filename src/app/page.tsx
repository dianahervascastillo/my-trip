import { getAllQuotes } from './api/quotes';
import { getTripById } from './api/trips';

export default async function Home() {
  const quotes = await getAllQuotes();
  const tripId = quotes[0].legs[0].trip_uid;

  console.log('tripId', tripId);

  try {
    const tripInfo = await getTripById(tripId);
  } catch (error) {
    console.log('error', error);
  }

  return (
    <>
      <main>HELLO!</main>
      <footer>footer!! hello!</footer>
    </>
  );
}
