export type SearchProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Search({ onChange }: SearchProps) {
  return (
    <div>
      <label>
        Search:
        <input type="text" onChange={onChange} />
      </label>
    </div>
  );
}
