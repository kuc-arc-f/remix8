// GQL, add sample
import { useEffect, useRef } from "react";
import type { MetaFunction, LoaderFunction } from "remix";
import { Form, json, useActionData, redirect } from "remix";
import { gql } from "@apollo/client";
import client from '../../../apollo-client'

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
  //db

  return json({ result: 'OK' })
}

export default function Page() {
  let data = useActionData();
  console.log(data);

  let onClick = async function(){
    console.log("#onClick");
    const title = document.querySelector<HTMLInputElement>('#answer');
console.log("title=", title.value);
    const result = await client.mutate({
      mutation:gql`
      mutation {
        addTask(title: "${title.value}"){
          id
        }
      }            
    `
    });
    console.log(result);
    if(result.data.addTask.id === 'undefined'){
      throw new Error('Error , addTask');
    }
  }
  
  return (
    <div className="remix__page">
      <main>
        <h2>Welcome , Test6 -22</h2>
        <hr />
        <Form method="post" name="form3" id="form3" className="remix__form">
        <h3>Post an Action</h3>        
        <label>
            <div>Answer:</div>
            <input  name="answer" type="text" id="answer" />
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
