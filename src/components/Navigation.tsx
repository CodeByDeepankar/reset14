import React from 'react';
import {
  Calendar,
  Compass,
  BookOpen,
  Dumbbell,
  Brain,
  TrendingUp,
  User,
  ShieldAlert,
  Flame,
  Sparkles,
  Zap
} from 'lucide-react';

export type ActiveTab =
  | 'today'
  | 'challenge'
  | 'study'
  | 'body'
  | 'mind'
  | 'growth'
  | 'progress'
  | 'profile';

interface NavigationProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  onOpenStruggling: () => void;
  currentDay: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onChangeTab,
  onOpenStruggling,
  currentDay,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'today', label: 'Today', icon: Compass },
    { id: 'challenge', label: 'Challenge', icon: Calendar },
    { id: 'study', label: 'Study', icon: BookOpen },
    { id: 'body', label: 'Body', icon: Dumbbell },
    { id: 'mind', label: 'Mind', icon: Brain },
    { id: 'growth', label: 'Growth', icon: Sparkles },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Desktop Sidebar (visible on md and up) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-[#1F242E] bg-[#0B0D12] p-5 shrink-0 select-none">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center text-white font-black shadow-lg shadow-[#8B5CF6]/30">
            14
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-base text-white">RESET 14</span>
            </div>
            <span className="text-[11px] text-[#8B93A1] tracking-tight block">
              Day {currentDay} / 14 · Active
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#181B22] text-white border border-[#8B5CF6]/40 shadow-sm'
                    : 'text-[#8B93A1] hover:text-white hover:bg-[#12141A]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#8B5CF6]' : 'text-[#8B93A1]'}`} />
                <span>{item.label}</span>
                {item.id === 'challenge' && (
                  <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#181B22] text-[#8B5CF6] border border-[#8B5CF6]/30">
                    Day {currentDay}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Emergency SOS Button in Desktop Sidebar */}
        <div className="pt-4 border-t border-[#1F242E] space-y-3">
          <button
            onClick={onOpenStruggling}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#EF4444]/20 via-[#F59E0B]/20 to-[#EF4444]/20 border border-[#F87171]/40 hover:border-[#F87171] text-[#FCA5A5] hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition group shadow-lg"
          >
            <ShieldAlert className="w-4 h-4 text-[#F87171] animate-pulse" />
            <span>I'm Struggling</span>
          </button>
          <div className="text-[11px] text-[#6B7280] text-center">
            14 Days. Less Noise. More Control.
          </div>
        </div>
      </aside>

      {/* Mobile Fixed Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0D12]/95 backdrop-blur-xl border-t border-[#1F242E] px-2 py-2 flex items-center justify-around pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {[
          { id: 'today' as ActiveTab, label: 'Today', icon: Compass },
          { id: 'challenge' as ActiveTab, label: 'Challenge', icon: Calendar },
          { id: 'study' as ActiveTab, label: 'Study', icon: BookOpen },
          { id: 'mind' as ActiveTab, label: 'Mind', icon: Brain },
          { id: 'progress' as ActiveTab, label: 'Progress', icon: TrendingUp },
          { id: 'profile' as ActiveTab, label: 'Profile', icon: User },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                isActive ? 'text-[#8B5CF6]' : 'text-[#8B93A1] hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#8B5CF6]' : ''}`} />
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'font-bold text-white' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
