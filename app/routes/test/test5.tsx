/* load test*/
import { useEffect, useRef } from "react";
import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, Link } from "remix";
import { Form, json, useActionData, redirect } from "remix";
import { gql } from "@apollo/client";
import client from '../../../apollo-client'


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
      tasks {
        id
        title
        created_at
      }
    }
    `,
    fetchPolicy: "network-only"
  });
console.log(data.data.tasks); 
  return json(data.data.tasks);
}

export default function Page() {
  let data: any[] = useLoaderData<any>();
//console.log(data);
  return (
    <div className="remix__page">
      <main>
        <h2>Welcome , Test5-88</h2>
        <hr />
        <ul>
        {data.map(item => (
          <li key={item.id} className="remix__page__resource">
            {item.title}
          </li>
        ))}
        </ul>
      </main>
    </div>
  );
}
