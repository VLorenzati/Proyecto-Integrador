export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Buscar productos..."
      className="w-full p-2 mb-4 border rounded"
      value={value}
      onChange={onChange}
    />
  );
}