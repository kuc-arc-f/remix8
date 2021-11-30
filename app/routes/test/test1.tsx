import { useEffect, useRef } from "react";
import type { MetaFunction, LoaderFunction } from "remix";
//import { useLoaderData, json, Link } from "remix";
import { Form, json, useActionData, redirect } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};
export async function action({ request }) {
//  const body = await request.formData();
  let formData = await request.formData();
  let answer = formData.get("answer");
console.log(answer);
  return json({ result: 'OK' })
}
export default function Page() {
  let actionMessage = useActionData<string>();
  let answerRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (actionMessage && answerRef.current) {
      answerRef.current.select();
    }
  }, [actionMessage]);

  return (
    <div className="remix__page">
      <main>
        <h2>Welcome , Test1-444</h2>
        <hr />
        <Form method="post" className="remix__form">
        <h3>Post an Action</h3>        
        <label>
            <div>Answer:</div>
            <input ref={answerRef} name="answer" type="text" />
          </label>
          <div>
            <button>Answer!</button>
          </div>
          {actionMessage ? (
            <p>
              <b>{actionMessage}</b>
            </p>
          ) : null}
        </Form>
      </main>
    </div>
  );
}
