import { MessageSquare, Paperclip, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Task } from '@/store/tasksSlice';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAppDispatch } from '@/hooks/useRedux';
import { moveTask, deleteTask } from '@/store/tasksSlice';

interface TaskCardProps {
  task: Task;
  provided?: any;
  snapshot?: any;
}

const priorityColors = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-green-100 text-green-700 border-green-200',
  completed: 'bg-blue-100 text-blue-700 border-blue-200',
};

const avatarColors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-yellow-500',
  'bg-indigo-500',
];

export const TaskCard = ({ task, provided, snapshot }: TaskCardProps) => {
  const dispatch = useAppDispatch();

  const handleStatusChange = (newStatus: Task['status']) => {
    dispatch(moveTask({ id: task.id, status: newStatus }));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      className={cn(
        "bg-card border border-border rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow",
        snapshot?.isDragging && "rotate-2 shadow-lg"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <Badge 
          variant="outline" 
          className={cn(
            "text-xs px-2 py-1",
            priorityColors[task.priority as keyof typeof priorityColors] || priorityColors.low
          )}
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </Badge>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-muted">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => handleStatusChange('todo')}>
              Move to To Do
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange('progress')}>
              Move to In Progress
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange('done')}>
              Move to Done
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleDelete}
              className="text-destructive focus:text-destructive"
            >
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="font-medium text-foreground mb-2">{task.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {task.description}
        </p>
      </div>

      {/* Assignees */}
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {task.assignees.slice(0, 3).map((assignee, index) => (
            <div
              key={assignee}
              className={cn(
                "w-6 h-6 rounded-full border-2 border-background flex items-center justify-center text-xs text-white font-medium",
                avatarColors[index % avatarColors.length]
              )}
            >
              {assignee.charAt(assignee.length - 1).toUpperCase()}
            </div>
          ))}
          {task.assignees.length > 3 && (
            <div className="w-6 h-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs text-muted-foreground font-medium">
              +{task.assignees.length - 3}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 text-muted-foreground">
          {task.comments > 0 && (
            <div className="flex items-center gap-1 text-xs">
              <MessageSquare className="w-3 h-3" />
              {task.comments}
            </div>
          )}
          {task.files > 0 && (
            <div className="flex items-center gap-1 text-xs">
              <Paperclip className="w-3 h-3" />
              {task.files}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};