import { useState } from "react";
import { Story } from "../types";

export type ListItemProps = Story & {
  handleRemoveItem: (item: Story) => void;
};

export default function ListItem({
  objectID,
  url,
  title,
  author,
  num_comments,
  points,
  handleRemoveItem,
}: ListItemProps) {
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
        <span>
          <button
            type="button"
            onClick={() => {
              handleRemoveItem({
                objectID,
                url,
                title,
                author,
                num_comments,
                points,
              });
            }}
          >
            Dismiss
          </button>
        </span>
      </li>
    </>
  );
}
