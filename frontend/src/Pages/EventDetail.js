import React from "react";
import {
  Link,
  json,
  redirect,
  useLoaderData,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import { url } from "../components/api";

function EventDetailPage() {
  const data = useRouteLoaderData("event-detail");

  return (
    <>
      <EventItem event={data.event} />
    </>
  );
}

export default EventDetailPage;

export async function loader({ request, params }) {
  const id = params.eventId ;
  const response = await fetch(`${url}/` + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch detailes for selected events." },
      { status: 500 }
    );
  } else {
    return response;
  }
}

export async function action({ params, request }) {

  const response = await fetch(`${url}/` + params.eventId, {
    // method: request.method,
    method: 'DELETE'
  });

  if (!response.ok) {
    throw json({ message: "Could not delete event." }, { status: 500 });
  }

  return redirect("/events");
}
