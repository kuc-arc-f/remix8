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

export default function Page() {
//console.log(cfg.OK_CODE);
  /*
  const cfg = Config.getConfig();
  let data = useActionData();
  if(typeof data !== 'undefined'){
    console.log("result=", data.result);
    if(cfg.OK_CODE === data.result){
      alert("OK, save");
      location.href = "/tasks";
    }
  }
  */
  let onClick = async function(){
    console.log("#onClick");
    const title = document.querySelector<HTMLInputElement>('#title');
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
    alert("OK, Save");
    location.href = "/tasks";
  }
  
  return (
    <div className="remix__page">
      <main>
        <h2>Task - Create</h2>
        <hr />
        <label>
          <div>Title:</div>
          <input type="text" name="title" id="title" />
        </label>
        <hr />
        <button onClick={() => onClick()}>Save
        </button>
        {/*
        */}
      </main>
    </div>
  );
}
