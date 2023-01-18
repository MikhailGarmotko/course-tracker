addEventListener("fetch", (event) => {
	event.respondWith(handleRequest(event.request));
  });

const FORM_URL = "https://course-tracker-bs6.pages.dev/";

const submitHandler = async (request) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
    });
  }

  const body = await request.formData();
  const { name, link, tag } = Object.fromEntries(body);

  const reqBody = {
    fields: {
      Name: name,
      Link: link,
      Tag: tag,
    },
  };

  await createAirtableRecord(reqBody);
  return Response.redirect(FORM_URL);
};

const createAirtableRecord = body => {
	return fetch(`https://api.airtable.com/v0/appa7EGL6KN6MxYGj/Course%20table`, {
	  method: 'POST',
	  body: JSON.stringify(body),
	  headers: {
		Authorization: `Bearer keyI8AYaeJARJyrhZ`,
		'Content-type': `application/json`
	  }
	})
  }

async function handleRequest(request) {
  const url = new URL(request.url);

  if (url.pathname === "/submit") {
    return submitHandler(request);
  }

  return Response.redirect(FORM_URL);
}
