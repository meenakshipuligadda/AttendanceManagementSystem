type SearchBarProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="🔍 Search Employee..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        width: "300px",
        padding: "14px",
        borderRadius: "12px",
        border: "1px solid #d1d5db",
        fontSize: "16px",
      }}
    />
  );
}

export default SearchBar;