import { useState } from "react";
import "./App.css";
import { List, Search } from "./components";
import { ListItemProps } from "./components/ListItem";
import { Story } from "./types";

const ENDPOINT = new URL(`https://hn.algolia.com/api/v1/search?query=`);

const initialStories = [
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
] satisfies Story[];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stories, setStories] = useState(initialStories);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
  };

  const handleRemoveStory = (item: Story) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );

    setStories(newStories);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>My Hacker Stories</h1>

      <Search onChange={handleSearch} />

      <hr />

      <List list={searchedStories} onRemoveItem={handleRemoveStory}/>
    </>
  );
}

export default App;
