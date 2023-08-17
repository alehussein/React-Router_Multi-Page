import EventsList from '../components/EventsList';
import { Await, defer, json, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';


export default function EventsPage() {
  const {events} = useLoaderData()

  return (
  <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
  <Await resolve={events}>
    {(loadEvents) => <EventsList events={loadEvents} />}
  </Await>
  </Suspense>
  )
};

const loadEvents = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    return json(
      { message: 'cloud not fetch events' },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
  
    return resData.events;
  }
}


export const loader = () => {
  return defer({
    events: loadEvents(),
  })
};