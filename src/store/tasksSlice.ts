import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'progress' | 'done';
  priority: 'high' | 'medium' | 'low';
  category: string;
  dueDate?: string;
  assignees: string[];
  comments: number;
  files: number;
  createdAt: string;
}

interface TasksState {
  tasks: Task[];
  filters: {
    category: string;
    priority: string;
    dueDate: string;
  };
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Brainstorming',
    description: 'Brainstorming brings team members\' diverse experience into play.',
    status: 'todo',
    priority: 'low',
    category: 'Planning',
    assignees: ['user1', 'user2', 'user3'],
    comments: 12,
    files: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Research',
    description: 'User research helps you to create an optimal product for users.',
    status: 'todo',
    priority: 'high',
    category: 'Research',
    assignees: ['user1', 'user2'],
    comments: 10,
    files: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Wireframes',
    description: 'Low fidelity wireframes include the most basic content and visuals.',
    status: 'todo',
    priority: 'high',
    category: 'Design',
    assignees: ['user1', 'user2', 'user3'],
    comments: 8,
    files: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Brainstorming',
    description: 'Brainstorming brings team members\' diverse experience into play.',
    status: 'progress',
    priority: 'low',
    category: 'Planning',
    assignees: ['user1', 'user2', 'user3'],
    comments: 12,
    files: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Brainstorming',
    description: 'Brainstorming brings team members\' diverse experience into play.',
    status: 'progress',
    priority: 'low',
    category: 'Planning',
    assignees: ['user1', 'user2', 'user3'],
    comments: 12,
    files: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Brainstorming',
    description: 'Brainstorming brings team members\' diverse experience into play.',
    status: 'done',
    priority: 'low',
    category: 'Planning',
    assignees: ['user1', 'user2', 'user3'],
    comments: 12,
    files: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: '7',
    title: 'Design System',
    description: 'It just needs to adapt the UI from what you did before.',
    status: 'done',
    priority: 'low',
    category: 'Design',
    assignees: ['user1', 'user2', 'user3'],
    comments: 12,
    files: 15,
    createdAt: new Date().toISOString(),
  },
];

const initialState: TasksState = {
  tasks: initialTasks,
  filters: {
    category: '',
    priority: '',
    dueDate: '',
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'createdAt'>>) => {
      const newTask: Task = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
    },
    updateTask: (state, action: PayloadAction<{ id: string; updates: Partial<Task> }>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload.updates };
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    moveTask: (state, action: PayloadAction<{ id: string; status: Task['status'] }>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index].status = action.payload.status;
      }
    },
    setFilters: (state, action: PayloadAction<Partial<TasksState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    reorderTasks: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number; status: Task['status'] }>) => {
      const { sourceIndex, destinationIndex, status } = action.payload;
      const tasksInColumn = state.tasks.filter(task => task.status === status);
      const [removed] = tasksInColumn.splice(sourceIndex, 1);
      tasksInColumn.splice(destinationIndex, 0, removed);
      
      // Update the original tasks array
      const otherTasks = state.tasks.filter(task => task.status !== status);
      state.tasks = [...otherTasks, ...tasksInColumn];
    },
  },
});

export const { 
  addTask, 
  updateTask, 
  deleteTask, 
  moveTask, 
  setFilters, 
  reorderTasks 
} = tasksSlice.actions;

export default tasksSlice.reducer;