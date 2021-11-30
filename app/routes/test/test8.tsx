/* hook test */
import { useEffect, useRef, useState } from "react";
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
  return json([]);
}

export default function Page() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  let data: any[] = useLoaderData<any>();
//  let items: any[] = [];
console.log(data);
  const onClick = function(value: number){
    console.log("count=", value);
    setCount(count + 1);
  }
  const loadItems = async function(){
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
    const items = data.data.tasks;
    setItems(items);
  console.log(data.data.tasks); 
  }
  loadItems();
  return (
    <div className="remix__page">
      <main>
        <h2>Welcome , Test8-11</h2>
        <hr />
        count: {count}
        <hr />
        <button onClick={() => onClick(count)}>Count</button>
        <hr />
        <ul>
        {items.map(item => (
          <li key={item.id} className="remix__page__resource">
            {item.title}
          </li>
        ))}
        </ul>
      </main>
    </div>
  );
}
