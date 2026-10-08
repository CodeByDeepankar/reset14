import React, { useState, useEffect } from 'react';
import { db } from './lib/db/store';
import { supabase, isSupabaseConfigured } from './lib/db/supabaseClient';
import { Profile, ChallengeDay } from './lib/db/types';
import { Navigation, ActiveTab } from './components/Navigation';
import { TodayView } from './components/views/TodayView';
import { ChallengeView } from './components/views/ChallengeView';
import { StudyView } from './components/views/StudyView';
import { BodyView } from './components/views/BodyView';
import { MindView } from './components/views/MindView';
import { GrowthView } from './components/views/GrowthView';
import { ProgressView } from './components/views/ProgressView';
import { ProfileView } from './components/views/ProfileView';
import { WeeklyReviewView } from './components/views/WeeklyReviewView';

import { StrugglingModal } from './components/modals/StrugglingModal';
import { EmergencyResetModal } from './components/modals/EmergencyResetModal';
import { DayDetailModal } from './components/modals/DayDetailModal';
import { OnboardingModal } from './components/modals/OnboardingModal';
import { NotificationsModal } from './components/modals/NotificationsModal';
import { DistractionModal } from './components/modals/DistractionModal';
import { AppLockScreen } from './components/AppLockScreen';
import { InAppNotificationToast } from './components/InAppNotificationToast';
import { Auth } from './components/Auth';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(isSupabaseConfigured);
  const [profile, setProfile] = useState<Profile>(() => db.getProfile());
  const [activeTab, setActiveTab] = useState<ActiveTab>('today');
  const [currentDay, setCurrentDay] = useState<number>(4); // Day 4 as featured in reference screenshot
  const [, setRerender] = useState<number>(0);


  // Modals state
  const [isStrugglingOpen, setIsStrugglingOpen] = useState(false);
  const [isEmergencyResetOpen, setIsEmergencyResetOpen] = useState(false);
  const [cravingData, setCravingData] = useState<any>(null);
  const [selectedDayDetail, setSelectedDayDetail] = useState<ChallengeDay | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(!profile.onboarding_completed);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDistractionOpen, setIsDistractionOpen] = useState(false);
  const [showWeeklyReview, setShowWeeklyReview] = useState(false);

  // App Lock State
  const [isAppLocked, setIsAppLocked] = useState<boolean>(Boolean(profile.app_lock_pin));

  // Store subscription for realtime updates
  useEffect(() => {
    const unsubscribe = db.subscribe(() => {
      setProfile(db.getProfile());
      const days = db.getChallengeDays();
      const curr = days.find((d) => d.status === 'current');
      if (curr) setCurrentDay(curr.day_number);
      setRerender((prev) => prev + 1);
    });
    return () => unsubscribe();
  }, []);

  // Supabase Auth Effect
  useEffect(() => {
    if (!supabase) return;
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        import('./lib/db/syncEngine').then(({ syncEngine }) => {
          syncEngine.loadUser(session.user).then(() => {
            setIsAuthLoading(false);
          });
        });
      } else {
        setIsAuthLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        import('./lib/db/syncEngine').then(({ syncEngine }) => {
          syncEngine.loadUser(session.user);
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleStart10MinReset = (data: any) => {
    setCravingData(data);
    setIsStrugglingOpen(false);
    setIsEmergencyResetOpen(true);
  };

  const handleSelectDay = (day: ChallengeDay) => {
    setSelectedDayDetail(day);
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#08090C] text-[#F3F4F6] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-[#8B5CF6] text-white font-black text-xl flex items-center justify-center mb-4">
            14
          </div>
          <p className="text-[#8B93A1]">Loading Reset 14...</p>
        </div>
      </div>
    );
  }

  if (!session && isSupabaseConfigured) {
    return <Auth onAuthComplete={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-[#08090C] text-[#F3F4F6] flex flex-col md:flex-row antialiased selection:bg-[#8B5CF6]/30 selection:text-[#DDD6FE]">
      {/* App Lock Screen if active */}
      {isAppLocked && profile.app_lock_pin && (
        <AppLockScreen
          correctPin={profile.app_lock_pin}
          onUnlock={() => setIsAppLocked(false)}
        />
      )}

      {/* Realtime Notification Toast */}
      <InAppNotificationToast />

      {/* Navigation: Desktop Sidebar & Mobile Bottom Bar */}
      <Navigation
        activeTab={activeTab}
        onChangeTab={(tab) => {
          setShowWeeklyReview(false);
          setActiveTab(tab);
        }}
        onOpenStruggling={() => setIsStrugglingOpen(true)}
        currentDay={currentDay}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header Bar on Mobile */}
        <header className="md:hidden sticky top-0 z-30 bg-[#08090C]/90 backdrop-blur-md border-b border-[#1F242E] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#8B5CF6] text-white font-black text-xs flex items-center justify-center">
              14
            </div>
            <span className="font-extrabold tracking-wider text-sm text-white">RESET 14</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDistractionOpen(true)}
              className="text-[11px] font-semibold text-[#8B93A1] hover:text-white px-2.5 py-1 rounded-lg bg-[#181B22] border border-[#1F242E]"
            >
              + Distraction
            </button>
            <button
              onClick={() => setIsStrugglingOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-[#EF4444]/20 border border-[#F87171]/40 text-[#FCA5A5] text-xs font-bold animate-pulse"
            >
              SOS
            </button>
          </div>
        </header>

        {/* Dynamic View Container */}
        <div className="flex-1 px-4 sm:px-8 py-6 w-full">
          {showWeeklyReview ? (
            <WeeklyReviewView onBack={() => setShowWeeklyReview(false)} />
          ) : (
            <>
              {activeTab === 'today' && (
                <TodayView
                  profile={profile}
                  currentDay={currentDay}
                  onOpenStruggling={() => setIsStrugglingOpen(true)}
                  onOpenStudyTimer={() => setActiveTab('study')}
                  onOpenWorkout={() => setActiveTab('body')}
                  onOpenMindJournal={() => setActiveTab('mind')}
                  onOpenGrowth={() => setActiveTab('growth')}
                />
              )}

              {activeTab === 'challenge' && (
                <ChallengeView
                  currentDay={currentDay}
                  onSelectDay={handleSelectDay}
                />
              )}

              {activeTab === 'study' && <StudyView />}

              {activeTab === 'body' && <BodyView />}

              {activeTab === 'mind' && <MindView />}

              {activeTab === 'growth' && <GrowthView />}

              {activeTab === 'progress' && (
                <ProgressView
                  currentDay={currentDay}
                  onOpenWeeklyReview={() => setShowWeeklyReview(true)}
                />
              )}

              {activeTab === 'profile' && (
                <ProfileView
                  profile={profile}
                  currentDay={currentDay}
                  onOpenGoals={() => setIsOnboardingOpen(true)}
                  onOpenNotifications={() => setIsNotificationsOpen(true)}
                  onRestartChallenge={() => {
                    setCurrentDay(1);
                    setActiveTab('today');
                  }}
                />
              )}
            </>
          )}
        </div>
      </main>

      {/* --- Modals & Overlays --- */}
      {/* 1. I'm Struggling Craving Selector Modal (Screen 5) */}
      <StrugglingModal
        isOpen={isStrugglingOpen}
        onClose={() => setIsStrugglingOpen(false)}
        onStart10MinReset={handleStart10MinReset}
      />

      {/* 2. Emergency 10-Minute Reset Intervention (Screen 6) */}
      <EmergencyResetModal
        isOpen={isEmergencyResetOpen}
        onClose={() => setIsEmergencyResetOpen(false)}
        initialCravingData={cravingData}
      />

      {/* 3. Day Detail Targets & Reflection Modal (Screen 8) */}
      <DayDetailModal
        isOpen={Boolean(selectedDayDetail)}
        onClose={() => setSelectedDayDetail(null)}
        day={selectedDayDetail}
        onOpenMindJournal={() => {
          setSelectedDayDetail(null);
          setActiveTab('mind');
        }}
      />

      {/* 4. Onboarding & Goals Modal (Screens 1 & 2) */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onComplete={() => setIsOnboardingOpen(false)}
      />

      {/* 5. Notifications Modal (Requirement #17) */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* 6. Distraction Tracker Modal (Requirement #12) */}
      <DistractionModal
        isOpen={isDistractionOpen}
        onClose={() => setIsDistractionOpen(false)}
      />
    </div>
  );
}
