import { useEffect, useRef } from "react";
import type { MetaFunction, LoaderFunction } from "remix";
import { Form, json, useActionData, redirect } from "remix";
import { gql } from "@apollo/client";
import client from '../../../apollo-client'
import Config from '../../../config'

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
//  const title = document.querySelector<HTMLInputElement>('#answer');
//console.log("title=", title.value);
  const result = await client.mutate({
    mutation:gql`
    mutation {
      addTask(title: "${answer}"){
        id
      }
    }            
  `
  });
  console.log(result);
  if(result.data.addTask.id === 'undefined'){
    throw new Error('Error , addTask');
  }
  return json({ result: 'OK' })
}

export default function Page() {
  const cfg = Config.getConfig();
//console.log(cfg.OK_CODE);
  let data = useActionData();
  if(typeof data !== 'undefined'){
    console.log("result=", data.result);
    if(cfg.OK_CODE === data.result){
      alert("OK, save");
      location.href = "/tasks";
    }
  }

  let onClick = async function(){
    console.log("#onClick");
  }
  
  return (
    <div className="remix__page">
      <main>
        <h2>Task - Create</h2>
        <hr />
        <Form method="post" name="form3" id="form3" className="remix__form">
        <label>
            <div>Title:</div>
            <input  name="answer" type="text" id="answer" />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </Form>
        <hr />
        {/*
        <button onClick={() => onClick()}>Click
        </button>
        */}
      </main>
    </div>
  );
}
