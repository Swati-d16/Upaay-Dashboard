import { Home, MessageSquare, CheckSquare, Users, Settings, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { icon: Home, label: 'Home', active: false },
  { icon: MessageSquare, label: 'Messages', active: false },
  { icon: CheckSquare, label: 'Tasks', active: true },
  { icon: Users, label: 'Members', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

const projects = [
  { name: 'Mobile App', active: true },
  { name: 'Website Redesign', active: false },
  { name: 'Design System', active: false },
  { name: 'Wireframes', active: false },
];

export const Sidebar = () => {
  return (
    <div className="w-64 bg-card border-r border-border h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">P</span>
          </div>
          <span className="font-semibold text-foreground">Project M.</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6">
        <nav className="space-y-1 px-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                  item.active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Projects Section */}
        <div className="px-4 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              My Projects
            </h3>
            <button className="w-4 h-4 flex items-center justify-center text-muted-foreground hover:text-foreground">
              <FolderOpen className="w-3 h-3" />
            </button>
          </div>
          
          <div className="space-y-1">
            {projects.map((project) => (
              <button
                key={project.name}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left",
                  project.active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <div className="w-2 h-2 rounded-full bg-current" />
                {project.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-border">
        <div className="bg-yellow-50 p-3 rounded-lg">
          <div className="w-8 h-8 bg-yellow-400 rounded-full mb-2" />
          <h4 className="font-medium text-sm text-gray-900 mb-1">Thoughts Time</h4>
          <p className="text-xs text-gray-600 mb-2">
            We show the status of the project you're working on right here
          </p>
          <button className="text-xs text-blue-600 hover:text-blue-700">
            Write a message
          </button>
        </div>
      </div>
    </div>
  );
};