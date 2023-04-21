import { FormEvent, useRef } from "react";

export type SearchProps = {
  searchTerm: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Search({
  onChange,
  searchTerm,
  onSubmit,
}: SearchProps) {
  const inputRef = useRef(null);

  return (
    <form onSubmit={onSubmit}>
      <label>
        Search:
        <input type="text" ref={inputRef} onChange={onChange} />
      </label>

      <button type="submit" disabled={!searchTerm}>
        Submit
      </button>
    </form>
  );
}
