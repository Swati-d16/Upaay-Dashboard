import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Plus } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { moveTask, reorderTasks } from '@/store/tasksSlice';
import { TaskCard } from './TaskCard';
import { AddTaskDialog } from './AddTaskDialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Task } from '@/store/tasksSlice';

const columns = [
  { 
    id: 'todo', 
    title: 'To Do', 
    color: 'border-todo-primary',
    bgColor: 'bg-todo-secondary/50',
    textColor: 'text-todo-primary'
  },
  { 
    id: 'progress', 
    title: 'On Progress', 
    color: 'border-progress-primary',
    bgColor: 'bg-progress-secondary/50',
    textColor: 'text-progress-primary'
  },
  { 
    id: 'done', 
    title: 'Done', 
    color: 'border-done-primary',
    bgColor: 'bg-done-secondary/50',
    textColor: 'text-done-primary'
  },
] as const;

export const KanbanBoard = () => {
  const { tasks, filters } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<Task['status']>('todo');

  // Filter tasks based on current filters
  const filteredTasks = tasks.filter(task => {
    if (filters.category && task.category !== filters.category) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    // Add more filter logic as needed
    return true;
  });

  const getTasksByStatus = (status: Task['status']) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If moving to a different column
    if (destination.droppableId !== source.droppableId) {
      dispatch(moveTask({ 
        id: draggableId, 
        status: destination.droppableId as Task['status'] 
      }));
    } else {
      // Reordering within the same column
      dispatch(reorderTasks({
        sourceIndex: source.index,
        destinationIndex: destination.index,
        status: source.droppableId as Task['status']
      }));
    }
  };

  const handleAddTask = (columnId: Task['status']) => {
    setSelectedColumn(columnId);
    setAddTaskDialogOpen(true);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          {columns.map((column) => {
            const tasksInColumn = getTasksByStatus(column.id);
            
            return (
              <div key={column.id} className="flex flex-col h-full">
                {/* Column Header */}
                <div className="flex items-center justify-between mb-4 pb-2">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-3 h-3 rounded-full", column.bgColor, column.color, "border-2")} />
                    <h2 className={cn("font-medium", column.textColor)}>
                      {column.title}
                    </h2>
                    <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
                      {tasksInColumn.length}
                    </span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAddTask(column.id)}
                    className="h-6 w-6 p-0 hover:bg-muted"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Tasks Column */}
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={cn(
                        "flex-1 min-h-[200px] p-2 rounded-lg transition-colors",
                        snapshot.isDraggingOver && "bg-muted/50"
                      )}
                    >
                      {tasksInColumn.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <TaskCard
                              task={task}
                              provided={provided}
                              snapshot={snapshot}
                            />
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      
                      {tasksInColumn.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <div className="text-4xl mb-2">📝</div>
                          <p className="text-sm">No tasks yet</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAddTask(column.id)}
                            className="mt-2"
                          >
                            Add first task
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>

      <AddTaskDialog
        open={addTaskDialogOpen}
        onOpenChange={setAddTaskDialogOpen}
        defaultStatus={selectedColumn}
      />
    </>
  );
};