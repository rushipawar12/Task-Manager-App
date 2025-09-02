import TaskCard from './TaskCard'

export default function TaskBoard({ tasks, onEdit, onDelete, onMove }) {
  const columns = [
    { key: 'todo', title: 'To Do' },
    { key: 'inprogress', title: 'In Progress' },
    { key: 'done', title: 'Completed' },
  ]

  function handleMoveLeft(task) {
    if (task.status === 'inprogress') onMove(task.id, 'todo')
    else if (task.status === 'done') onMove(task.id, 'inprogress')
  }

  function handleMoveRight(task) {
    if (task.status === 'todo') onMove(task.id, 'inprogress')
    else if (task.status === 'inprogress') onMove(task.id, 'done')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {columns.map((col) => (
        <div key={col.key} className="bg-gray-50 rounded border border-gray-200 p-3">
          <h3 className="font-semibold text-gray-800 mb-2">{col.title}</h3>
          <div className="space-y-3 min-h-16">
            {tasks
              .filter((t) => t.status === col.key)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onMoveLeft={handleMoveLeft}
                  onMoveRight={handleMoveRight}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}


