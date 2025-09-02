import { useEffect, useMemo, useState } from 'react'
import './App.css'
import TaskBoard from './components/TaskBoard'
import TaskForm from './components/TaskForm'
import SearchFilterBar from './components/SearchFilterBar'

function App() {
  const [tasks, setTasks] = useState(() => {
    const raw = localStorage.getItem('tasks')
    try { return raw ? JSON.parse(raw) : [] } catch { return [] }
  })
  const [editingTask, setEditingTask] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function handleAddClick() {
    setEditingTask(null)
    setShowForm(true)
  }

  function handleSaveTask(task) {
    if (task.id) {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, ...task } : t)))
    } else {
      const newTask = {
        id: crypto.randomUUID(),
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: 'todo',
        createdAt: Date.now(),
      }
      setTasks((prev) => [newTask, ...prev])
    }
    setShowForm(false)
    setEditingTask(null)
  }

  function handleDeleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  function handleEditTask(task) {
    setEditingTask(task)
    setShowForm(true)
  }

  function handleMoveTask(id, newStatus) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)))
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase())
      const matchesPriority = priorityFilter ? t.priority === priorityFilter : true
      return matchesSearch && matchesPriority
    })
  }, [tasks, search, priorityFilter])

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Task Manager</h1>
          <div className="flex gap-2">
            <button
              onClick={handleAddClick}
              className="px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Add Task
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <SearchFilterBar
          search={search}
          setSearch={setSearch}
          priority={priorityFilter}
          setPriority={setPriorityFilter}
        />

        {showForm && (
          <div className="bg-white rounded border border-gray-200 p-4">
            <TaskForm
              initialTask={editingTask}
              onSave={handleSaveTask}
              onCancel={() => { setShowForm(false); setEditingTask(null) }}
            />
          </div>
        )}

        <TaskBoard
          tasks={filteredTasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onMove={handleMoveTask}
        />
      </main>
    </div>
  )
}

export default App
