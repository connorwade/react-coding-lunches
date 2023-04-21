import { useState } from "react";

export type ListProps = {
  objectID: number;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};

export default function List({
  objectID,
  url,
  title,
  author,
  num_comments,
  points,
}: ListProps) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <>
      <li key={objectID}>
        {checked && <span>✓</span>}
        <span>
          <a href={url}>{title}</a>
        </span>
        <span>{author}</span>
        <span>{num_comments}</span>
        <span>{points}</span>
        <label>
          Read? <input type="checkbox" onChange={handleChange} />
        </label>
      </li>
    </>
  );
}
