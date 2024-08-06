import { json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { url } from "../components/api";

function EventsPage() {
  const data = useLoaderData();

  // if(data.isError){
  //   return <p>{data.message}</p>
  // }

  const events = data.events;

  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  const response = await fetch(url);

  if (!response.ok) {
    // return {isError: true , message: 'Could not fetch events.'};
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}
