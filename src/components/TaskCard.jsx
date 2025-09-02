export default function TaskCard({ task, onEdit, onDelete, onMoveLeft, onMoveRight }) {
  const priorityColor = {
    Low: 'bg-green-100 text-green-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    High: 'bg-red-100 text-red-700',
  }[task.priority] || 'bg-gray-100 text-gray-700'

  return (
    <div className="rounded border border-gray-200 bg-white shadow-sm p-3 space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-900">{task.title}</h4>
        <span className={`text-xs px-2 py-1 rounded ${priorityColor}`}>{task.priority}</span>
      </div>
      {task.description && (
        <p className="text-sm text-gray-600 whitespace-pre-wrap">{task.description}</p>
      )}
      <div className="flex items-center gap-2 justify-between pt-1">
        <div className="flex gap-2">
          <button onClick={() => onMoveLeft(task)} className="px-2 py-1 text-xs rounded border border-gray-300 hover:bg-gray-50">◀</button>
          <button onClick={() => onMoveRight(task)} className="px-2 py-1 text-xs rounded border border-gray-300 hover:bg-gray-50">▶</button>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(task)} className="px-2 py-1 text-xs rounded bg-indigo-600 text-white hover:bg-indigo-700">Edit</button>
          <button onClick={() => onDelete(task.id)} className="px-2 py-1 text-xs rounded bg-rose-600 text-white hover:bg-rose-700">Delete</button>
        </div>
      </div>
    </div>
  )
}


