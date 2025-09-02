export default function SearchFilterBar({ search, setSearch, priority, setPriority }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title..."
        className="flex-1 rounded border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full sm:w-48 rounded border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  )
}


