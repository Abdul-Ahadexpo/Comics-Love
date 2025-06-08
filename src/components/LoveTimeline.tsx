import React, { useState } from 'react';
import { Heart, Calendar, MessageCircle, BellRing as Ring, Baby, Star } from 'lucide-react';
import { CompatibilityResult } from '../types';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/storage';

interface LoveTimelineProps {
  person1Date: string;
  person2Date: string;
  result: CompatibilityResult;
}

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  emoji: string;
  description: string;
}

export const LoveTimeline: React.FC<LoveTimelineProps> = ({ person1Date, person2Date, result }) => {
  const [events, setEvents] = useState<TimelineEvent[]>(() => {
    const saved = getFromLocalStorage('loveTimeline');
    return saved || [];
  });
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    emoji: '💕',
    description: ''
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const predefinedEvents = [
    { title: "First Met", emoji: "👋", description: "The day our paths crossed!" },
    { title: "First Crush", emoji: "😍", description: "When the butterflies started!" },
    { title: "First Date", emoji: "🌹", description: "Our magical first date!" },
    { title: "First Kiss", emoji: "💋", description: "Sparks flew everywhere!" },
    { title: "First 'I Love You'", emoji: "💌", description: "Those three little words!" },
    { title: "Anniversary", emoji: "🎉", description: "Celebrating our love!" },
    { title: "Future Engagement", emoji: "💍", description: "When we'll get engaged!" },
    { title: "Future Wedding", emoji: "👰", description: "Our dream wedding day!" },
    { title: "Future Baby", emoji: "👶", description: "Our little miracle!" }
  ];

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) return;

    const event: TimelineEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: newEvent.date,
      emoji: newEvent.emoji,
      description: newEvent.description
    };

    const updatedEvents = [...events, event].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setEvents(updatedEvents);
    saveToLocalStorage('loveTimeline', updatedEvents);
    
    setNewEvent({ title: '', date: '', emoji: '💕', description: '' });
    setShowAddForm(false);
  };

  const removeEvent = (id: string) => {
    const updatedEvents = events.filter(e => e.id !== id);
    setEvents(updatedEvents);
    saveToLocalStorage('loveTimeline', updatedEvents);
  };

  const getFutureAgeMessage = () => {
    const person1Birth = new Date(person1Date);
    const person2Birth = new Date(person2Date);
    
    const marriageAge1 = 25;
    const marriageAge2 = 25;
    
    const marriageYear1 = person1Birth.getFullYear() + marriageAge1;
    const marriageYear2 = person2Birth.getFullYear() + marriageAge2;
    const marriageYear = Math.max(marriageYear1, marriageYear2);
    
    const babyYear = marriageYear + 2;
    
    return {
      marriage: `💍 Perfect marriage age: ${marriageYear} (you'll be ${marriageYear - person1Birth.getFullYear()} & ${marriageYear - person2Birth.getFullYear()})`,
      baby: `👶 First baby guess: ${babyYear} (you'll be ${babyYear - person1Birth.getFullYear()} & ${babyYear - person2Birth.getFullYear()}) 😂`
    };
  };

  const futureMessages = getFutureAgeMessage();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl shadow-purple-200/50 dark:shadow-purple-500/20">
      <div className="text-center mb-6">
        <Heart className="w-8 h-8 mx-auto mb-3 text-purple-500 animate-pulse" />
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          💘 Love Timeline Visualizer 💘
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Track your love story milestones! ✨
        </p>
      </div>

      {/* Future Predictions */}
      <div className="mb-6 space-y-3">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30">
          <p className="font-bold text-gray-800 dark:text-white text-center">
            {futureMessages.marriage}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
          <p className="font-bold text-gray-800 dark:text-white text-center">
            {futureMessages.baby}
          </p>
        </div>
      </div>

      {/* Add Event Button */}
      <div className="text-center mb-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold transition-all duration-300 transform hover:scale-105"
        >
          <Calendar className="inline w-4 h-4 mr-2" />
          Add Love Milestone
        </button>
      </div>

      {/* Add Event Form */}
      {showAddForm && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                Event Title
              </label>
              <select
                value={newEvent.title}
                onChange={(e) => {
                  const selected = predefinedEvents.find(event => event.title === e.target.value);
                  setNewEvent({
                    ...newEvent,
                    title: e.target.value,
                    emoji: selected?.emoji || newEvent.emoji,
                    description: selected?.description || newEvent.description
                  });
                }}
                className="w-full p-3 rounded-xl border-2 border-purple-300 dark:border-gray-600 bg-white dark:bg-gray-700 font-bold dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="">Choose an event...</option>
                {predefinedEvents.map(event => (
                  <option key={event.title} value={event.title}>
                    {event.emoji} {event.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="w-full p-3 rounded-xl border-2 border-purple-300 dark:border-gray-600 bg-white dark:bg-gray-700 font-bold dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Custom Description (Optional)
            </label>
            <input
              type="text"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              placeholder="Add your own cute description..."
              className="w-full p-3 rounded-xl border-2 border-purple-300 dark:border-gray-600 bg-white dark:bg-gray-700 font-bold dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="flex justify-center space-x-3 mt-4">
            <button
              onClick={addEvent}
              className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold transition-all duration-300"
            >
              Add Event
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl bg-gray-500 hover:bg-gray-600 text-white font-bold transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Timeline Events */}
      <div className="space-y-4">
        {events.length === 0 ? (
          <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
            <Star className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400 font-bold">
              No milestones yet! Add your first love memory above ✨
            </p>
          </div>
        ) : (
          events.map((event, index) => (
            <div
              key={event.id}
              className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-3xl">{event.emoji}</div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 dark:text-white">{event.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{event.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <button
                onClick={() => removeEvent(event.id)}
                className="text-red-500 hover:text-red-700 font-bold text-sm"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};