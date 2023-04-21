import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { List, Search } from "./components";
import { ListProps } from "./components/List";

const ENDPOINT = new URL(`https://hn.algolia.com/api/v1/search?query=`);

const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
] satisfies ListProps[];

function App() {
  return (
    <>
      <h1>My Hacker Stories</h1>

      <Search />

      <hr />

      {list.map((item) => {
        return <List {...item} />;
      })}
    </>
  );
}

export default App;
