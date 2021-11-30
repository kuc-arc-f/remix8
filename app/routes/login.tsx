import { useEffect, useRef } from "react";
import type { MetaFunction, LoaderFunction } from "remix";
import { Form, json, useActionData, redirect } from "remix";
import { useLoaderData, Link } from "remix";
import { gql } from "@apollo/client";
import client from '../../apollo-client'
import Config from '../../config'
import LibCookie from '../lib/LibCookie'

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

export default function Page() {
  const cfg = Config.getConfig();
  const keyUid = cfg.COOKIE_KEY_USER_ID;
  
  /*
  useEffect(() => {
    const uid = LibCookie.get_cookie(keyUid);
    console.log("uid=", uid);
    if(uid === null){
      console.log("uid nothing");
      location.href = '/';
    }
  },[])
  */
  let onClick = async function(){
    console.log("#onClick");
    const mail = document.querySelector<HTMLInputElement>('#mail');
    const password = document.querySelector<HTMLInputElement>('#password');
    const result = await client.query({
      query: gql`
      query {
        userValid(email: "${mail.value}", password: "${password.value}") {
          id
        }
      }
      `,
      fetchPolicy: "network-only"
    });    
console.log(result);
    const key = cfg.COOKIE_KEY_USER_ID;
    if(result.data.userValid !== null){
      const uid = result.data.userValid.id;
      console.log("uid=", uid);
      LibCookie.set_cookie(key, uid);
      alert("Success, login");
      location.href = '/';
    }else{
      alert("Error, login");
    }
  }
  
  return (
    <div className="remix__page">
      <main>
        <h2>Login</h2>
        <hr />
        <label>
          <div>mail:</div>
          <input type="text" name="mail" id="mail" />
        </label>
        <label>
          <div>password:</div>
          <input type="password" name="password" id="password" />
        </label>
        <hr />
        <button onClick={() => onClick()}>Login
        </button>
        <hr />
        <Link to="/users/create">[Register]</Link>
        {/*
        */}
      </main>
    </div>
  );
}
