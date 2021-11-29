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
        <h3>Tasks - Index</h3>
        <hr />
        <Link to="/tasks/create">[Create]</Link>
        <hr />
        <ul>
        {data.map(item => (
          <li key={item.id} className="remix__page__resource">
            {item.title}
            <Link to={item.id}>[ Show ]</Link>
            <Link to={`edit/${item.id}`}>[ edit ]</Link>
          </li>
        ))}
        </ul>
      </main>
    </div>
  );
}
