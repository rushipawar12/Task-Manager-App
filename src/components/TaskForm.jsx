import { useEffect, useState } from 'react'

export default function TaskForm({ initialTask, onSave, onCancel }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Medium')

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || '')
      setDescription(initialTask.description || '')
      setPriority(initialTask.priority || 'Medium')
    }
  }, [initialTask])

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    onSave({
      ...initialTask,
      title: title.trim(),
      description: description.trim(),
      priority,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Task title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Task description"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <div className="flex items-center gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 rounded border border-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
        >
          {initialTask ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  )
}


