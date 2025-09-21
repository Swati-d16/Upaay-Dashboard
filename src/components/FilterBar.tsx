import { Search, Filter, Calendar, Share, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { setFilters } from '@/store/tasksSlice';

const avatars = [
  { id: 1, color: 'bg-blue-500' },
  { id: 2, color: 'bg-green-500' },
  { id: 3, color: 'bg-purple-500' },
  { id: 4, color: 'bg-pink-500' },
  { id: 5, color: 'bg-yellow-500' },
];

export const FilterBar = () => {
  const { filters } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const handleFilterChange = (key: string, value: string) => {
    dispatch(setFilters({ [key]: value === 'all' ? '' : value }));
  };

  return (
    <div className="bg-card border-b border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-foreground">Mobile App</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              📎 
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              😊
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Team Members */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
              Invite
            </Button>
            <div className="flex -space-x-2">
              {avatars.map((avatar) => (
                <div
                  key={avatar.id}
                  className={`w-8 h-8 rounded-full border-2 border-background ${avatar.color} flex items-center justify-center text-xs text-white font-medium`}
                >
                  {avatar.id}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-background bg-primary flex items-center justify-center text-xs text-primary-foreground font-medium">
                +2
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-3 md:px-6 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for anything..."
                className="pl-10 w-full md:w-64 bg-background"
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Filter Dropdown */}
              <Select value={filters.category || 'all'} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger className="w-32">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Filter" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Development">Development</SelectItem>
                  <SelectItem value="Research">Research</SelectItem>
                  <SelectItem value="Testing">Testing</SelectItem>
                </SelectContent>
              </Select>

              {/* Today Filter */}
              <Select defaultValue="today">
                <SelectTrigger className="w-28">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Share className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button variant="default" size="sm" className="gap-2">
              ⚡
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {(filters.category || filters.priority) && (
          <div className="flex items-center gap-2 mt-3">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {filters.category && (
              <Badge variant="secondary" className="gap-1">
                Category: {filters.category}
                <button
                  onClick={() => handleFilterChange('category', '')}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full w-3 h-3 flex items-center justify-center"
                >
                  ×
                </button>
              </Badge>
            )}
            {filters.priority && (
              <Badge variant="secondary" className="gap-1">
                Priority: {filters.priority}
                <button
                  onClick={() => handleFilterChange('priority', '')}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full w-3 h-3 flex items-center justify-center"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};