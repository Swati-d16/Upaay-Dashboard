import { Sidebar } from './Sidebar';
import { FilterBar } from './FilterBar';
import { KanbanBoard } from './KanbanBoard';
import { MobileNav } from './MobileNav';

export const Dashboard = () => {
  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center p-4 border-b border-border">
          <MobileNav />
          <h1 className="ml-3 text-lg font-semibold">Project M.</h1>
        </div>
        
        {/* Header with filters */}
        <FilterBar />
        
        {/* Kanban Board */}
        <div className="flex-1 p-3 md:p-6 overflow-auto">
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
};