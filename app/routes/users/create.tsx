import { useEffect, useRef } from "react";
import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, Link } from "remix";
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
export let loader: LoaderFunction = async () => {
  const data = await client.query({
    query: gql`
    query {
      userCount
    }    
    `,
    fetchPolicy: "network-only"
  });
console.log(data.data.userCount); 
  return json({count: data.data.userCount });
}
export default function Page() {
  let data: any = useLoaderData<any>();
  const count = data.count;
console.log(count);
  useEffect(() => {
    if(count > 0){
      alert("Error, user max  1");
      location.href = "/login";
    }
  },[])
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
    try{
      console.log("#onClick");
      const name = document.querySelector<HTMLInputElement>('#name');
      const mail = document.querySelector<HTMLInputElement>('#mail');
      const password = document.querySelector<HTMLInputElement>('#password');
      // addUser(
      const result = await client.mutate({
        mutation:gql`
        mutation {
          addUser(name: "${name.value}", email: "${mail.value}", password: "${password.value}"){
            id
          }
        }                   
      `
      });
  console.log(result);
      if(typeof result.data.addUser.id === 'undefined'){
        throw new Error('Error , onClick');
      }
      alert("OK, Save");
      location.href = "/login";
    } catch (e) {
      console.error(e);
      alert("error, save");
    }    
  }
  
  return (
    <div className="remix__page">
      <main>
        <h2>User - Create</h2>
        <hr />
        <label>
          <div>Mail:</div>
          <input type="text" name="mail" id="mail" />
        </label>
        <label>
          <div>name:</div>
          <input type="text" name="name" id="name" />
        </label>
        <label>
          <div>password:</div>
          <input type="password" name="password" id="password" />
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
