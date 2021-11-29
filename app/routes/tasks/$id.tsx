import { useCatch, Link, json, useLoaderData } from "remix";
import type { LoaderFunction, MetaFunction } from "remix";
import { gql } from "@apollo/client";
import client from '../../../apollo-client'

export let loader: LoaderFunction = async ({ params }) => {
  if (params.id === "this-record-does-not-exist") {
    throw new Response("Not Found", { status: 404 });
  }
  if (params.id === "shh-its-a-secret") {
    throw json({ webmasterEmail: "hello@remix.run" }, { status: 401 });
  }
  if (params.id === "kaboom") {
    lol();
  }
  //data
  const data = await client.query({
    query: gql`
    query {
      task(id: "${params.id}"){
        id
        title
        content
        created_at
      }            
    }    
    `,
    fetchPolicy: "network-only"
  });
//console.log(data.data.task);
  return { param: params.id, data: data.data.task};
};

export default function ParamDemo() {
  let data = useLoaderData();
  let item = data.data;
console.log(item);
  return (
    <div className="remix__page">
      <h3>Tasks - Show</h3>
      <hr />
      <p>title:{item.title}</p>
      <hr />
      <p>ID: {item.id}</p>
    </div>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  let message: React.ReactNode;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Looks like you tried to visit a page that you do not have access to.
          Maybe ask the webmaster ({caught.data.webmasterEmail}) for access.
        </p>
      );
    case 404:
      message = (
        <p>Looks like you tried to visit a page that does not exist.</p>
      );
    default:
      message = (
        <p>
          There was a problem with your request!
          <br />
          {caught.status} {caught.statusText}
        </p>
      );
  }

  return (
    <>
      <h2>Oops!</h2>
      <p>{message}</p>
      <p>
        (Isn't it cool that the user gets to stay in context and try a different
        link in the parts of the UI that didn't blow up?)
      </p>
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <>
      <h2>Error!</h2>
      <p>{error.message}</p>
      <p>
        (Isn't it cool that the user gets to stay in context and try a different
        link in the parts of the UI that didn't blow up?)
      </p>
    </>
  );
}

export let meta: MetaFunction = ({ data }) => {
  return {
    title: data ? `Param: ${data.param}` : "Oops...",
  };
};