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
  let formData = await request.formData();
  let answer = formData.get("answer");
console.log(answer);
  return json({ result: 'OK' })
}

export default function Page() {
  let data = useActionData();
  console.log(data);

  let onClick = function(){
    console.log("#onClick");
//    const title = document.querySelector<HTMLFormElement>('#form3');
//    title.submit();
  }
  
  return (
    <div className="remix__page">
      <main>
        <h2>Welcome , Test2 -1111</h2>
        <hr />
        <Form method="post" name="form3" id="form3" className="remix__form">
        <h3>Post an Action</h3>        
        <label>
            <div>Answer:</div>
            <input  name="answer" type="text" />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </Form>
        <hr />
        <button onClick={() => onClick()}>Click
        </button>

      </main>
    </div>
  );
}
