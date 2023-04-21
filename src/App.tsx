import { FormEvent, useCallback, useEffect, useReducer, useState } from "react";
import "./App.css";
import { List, Search } from "./components";
import { ListItemProps } from "./components/ListItem";
import { Story } from "./types";

const ENDPOINT = new URL(`https://hn.algolia.com/api/v1/search?query=`);

const useSemiPersistentState = (
  key: string,
  initialState: string
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const storiesReducer = (state, action) => {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

// const initialStories = [
//   {
//     title: "React",
//     url: "https://reactjs.org/",
//     author: "Jordan Walke",
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
//   },
//   {
//     title: "Redux",
//     url: "https://redux.js.org/",
//     author: "Dan Abramov, Andrew Clark",
//     num_comments: 2,
//     points: 5,
//     objectID: 1,
//   },
// ] satisfies Story[];

function App() {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const [url, setUrl] = useState(`${ENDPOINT.toString()}${searchTerm}`);

  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });

    try {
      const response = await fetch(url);
      const result = await response.json();

      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: result.hits,
      });
    } catch (e) {
      dispatchStories({ type: "STORIES_FETCH_FAILURE" });
      console.log("error:", e);
    }
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item: Story) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  };

  const handleSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    setUrl(`${ENDPOINT.toString()}${searchTerm}`);
    event.preventDefault();
  };

  return (
    <>
      <h1>My Hacker Stories</h1>

      <Search
        searchTerm={searchTerm}
        onSubmit={handleSearchSubmit}
        onChange={handleSearchInput}
      />

      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </>
  );
}

export default App;
