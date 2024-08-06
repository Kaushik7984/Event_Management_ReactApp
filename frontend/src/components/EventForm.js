import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import classes from "./EventForm.module.css";
import { url as url1 } from "./api";

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul className={classes.errors}>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <div className={classes.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          className={classes.inputBg}
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          className={classes.inputBg}
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          className={classes.inputBg}
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className={classes.inputBg}
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </div>
      <div className={classes.actions}>
        <button
          type="button"
          onClick={cancelHandler}
          disabled={isSubmitting}
          className={classes.cancelButton}
        >
          Cancel
        </button>
        <button disabled={isSubmitting} className={classes.submitButton}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;


export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  // console.log(request);

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = url1;

  if (method === "PATCH") {
    const eventId = params.eventId;
    url = `${url}/` + eventId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }
  return redirect("/events");
}
