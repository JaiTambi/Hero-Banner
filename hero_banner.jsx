import React, { useState, useEffect, useMemo } from 'react';

const EVENTS = [
  {
    id: 'summer-bootcamp',
    title: 'Summer Bootcamp Internship Program',
    category: 'Career Growth',
    description: 'Hands-on training in AI, Web Dev, Cloud & Data Science for 2nd/3rd year students.',
    highlights: ['Industry Mentorship', 'Live Projects', 'Internships'],
    image: 'https://picsum.photos/seed/poornima-bootcamp/1600/900',
    ctaText: 'Register Now',
    timeSlots: ['morning'],
  },
  {
    id: 'placement-prep',
    title: 'Placement Preparation Program',
    category: 'Career Growth',
    description: 'Interview prep, aptitude training, resume building and corporate readiness.',
    highlights: ['Interview Prep', 'Aptitude Training', 'Resume Building'],
    image: 'https://picsum.photos/seed/poornima-placement/1600/900',
    ctaText: 'Start Preparing',
    timeSlots: ['morning'],
  },
  {
    id: 'aadhar-community',
    title: 'Aadhar — Community of Poornima Techies',
    category: 'Learning & Innovation',
    description: 'Coding, open-source contribution, and innovation-driven projects.',
    highlights: ['Coding', 'Open Source', 'Community'],
    image: 'https://picsum.photos/seed/poornima-aadhar/1600/900',
    ctaText: 'Join Community',
    timeSlots: ['afternoon'],
  },
  {
    id: 'ai-workshop',
    title: 'AI & Emerging Technologies Workshop',
    category: 'Learning & Innovation',
    description: 'Artificial Intelligence, Machine Learning, Generative AI, Robotics & Cloud.',
    highlights: ['AI', 'Machine Learning', 'Generative AI'],
    image: 'https://picsum.photos/seed/poornima-ai-workshop/1600/900',
    ctaText: 'Learn More',
    timeSlots: ['afternoon'],
  },
  {
    id: 'aarohan-fest',
    title: 'Aarohan — Annual Cultural & Technical Fest',
    category: 'Community & Engagement',
    description: 'Music, dance, robotics competitions, hackathons and celebrations.',
    highlights: ['Music & Dance', 'Robotics', 'Hackathons'],
    image: 'https://picsum.photos/seed/poornima-aarohan/1600/900',
    ctaText: 'Explore Events',
    timeSlots: ['evening'],
  },
  {
    id: 'smart-india-hackathon',
    title: 'Smart India Hackathon',
    category: 'Community & Engagement',
    description: 'A national-level competition for problem solving and startup ideas.',
    highlights: ['Problem Solving', 'Team Collaboration', 'National'],
    image: 'https://picsum.photos/seed/poornima-sih/1600/900',
    ctaText: 'Participate',
    timeSlots: ['evening'],
  },
];

const DEFAULT_THEME = {
  overlay: 'from-[#0B1120]/95 via-[#1E293B]/60 to-[#0B1120]/20',
  eyebrowClass: 'text-amber-300 border-amber-400/40 bg-amber-400/10',
  ctaGradient: 'from-blue-600 to-amber-500',
  glowColors: ['#2563EB', '#F59E0B'],
  accentHex: '#F59E0B',
};

const EVENT_THEMES = {
  'summer-bootcamp': {
    overlay: 'from-[#0B1120]/95 via-[#1E3A8A]/55 to-[#7C3AED]/20',
    eyebrowClass: 'text-cyan-300 border-cyan-400/40 bg-cyan-400/10',
    ctaGradient: 'from-blue-600 via-cyan-500 to-purple-600',
    glowColors: ['#2563EB', '#06B6D4', '#7C3AED'],
    accentHex: '#06B6D4',
  },
  'aarohan-fest': {
    overlay: 'from-[#1E0B33]/95 via-[#7C3AED]/45 to-[#F97316]/20',
    eyebrowClass: 'text-pink-300 border-pink-400/40 bg-pink-400/10',
    ctaGradient: 'from-purple-600 via-pink-500 to-orange-500',
    glowColors: ['#A21CAF', '#EC4899', '#F97316'],
    accentHex: '#EC4899',
  },
  'aadhar-community': {
    overlay: 'from-[#04110D]/95 via-[#064E3B]/55 to-[#06B6D4]/20',
    eyebrowClass: 'text-emerald-300 border-emerald-400/40 bg-emerald-400/10',
    ctaGradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    glowColors: ['#10B981', '#22D3EE'],
    accentHex: '#10B981',
  },
  'ai-workshop': {
    overlay: 'from-black/95 via-[#3B0764]/55 to-[#1D4ED8]/25',
    eyebrowClass: 'text-violet-300 border-violet-400/40 bg-violet-400/10',
    ctaGradient: 'from-violet-600 via-indigo-600 to-blue-600',
    glowColors: ['#7C3AED', '#3B82F6'],
    accentHex: '#7C3AED',
  },
  'smart-india-hackathon': {
    overlay: 'from-[#0B1120]/95 via-[#312E81]/55 to-[#059669]/20',
    eyebrowClass: 'text-sky-300 border-sky-400/40 bg-sky-400/10',
    ctaGradient: 'from-indigo-600 via-sky-500 to-emerald-500',
    glowColors: ['#4F46E5', '#10B981'],
    accentHex: '#4F46E5',
  },
  'placement-prep': {
    overlay: 'from-[#0B1120]/95 via-[#1E293B]/55 to-[#F59E0B]/20',
    eyebrowClass: 'text-amber-300 border-amber-400/40 bg-amber-400/10',
    ctaGradient: 'from-amber-500 via-yellow-400 to-amber-300',
    glowColors: ['#F59E0B', '#FCD34D'],
    accentHex: '#F59E0B',
  },
};

function getTheme(id) {
  return EVENT_THEMES[id] || DEFAULT_THEME;
}

export default function HeroBannerPreview() {
  const [slot, setSlot] = useState('morning');
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [revealKey, setRevealKey] = useState(0);

  const slides = useMemo(() => {
    const matched = EVENTS.filter((e) => e.timeSlots.includes(slot));
    return matched.length > 0 ? matched : EVENTS;
  }, [slot]);

  useEffect(() => {
    setIndex(0);
    setRevealKey((k) => k + 1);
  }, [slides]);

  useEffect(() => {
    if (slides.length <= 1) return undefined;
    let timeoutRef = null;
    const id = setInterval(() => {
      setFading(true);
      timeoutRef = setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length);
        setRevealKey((k) => k + 1);
        setFading(false);
      }, 350);
    }, 3000);

    return () => {
      clearInterval(id);
      if (timeoutRef) clearTimeout(timeoutRef);
    };
  }, [slides]);

  const active = slides[index];
  const theme = getTheme(active.id);
  const titleWords = active.title.split(' ');

  const slotButtons = [
    { key: 'morning', label: 'Morning' },
    { key: 'afternoon', label: 'Afternoon' },
    { key: 'evening', label: 'Evening' },
    { key: 'night', label: 'Night' },
  ];

  return (
    <div className="w-full bg-slate-950 p-4 md:p-8 hero-banner">
      <style>{`
        @keyframes orbPulse {
          0%, 100% { opacity: 0.22; transform: scale(1); }
          50% { opacity: 0.42; transform: scale(1.12); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUpSmall {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Focus styles for keyboard users */
        .hero-banner :where(button):focus-visible {
          outline: 3px solid rgba(99,102,241,0.9);
          outline-offset: 3px;
          box-shadow: 0 6px 20px rgba(99,102,241,0.12);
        }

        /* Improve visibility of focused slide dot */
        .hero-banner button[aria-current="true"] {
          box-shadow: 0 0 10px 2px rgba(0,0,0,0.12);
        }
      `}</style>

      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-center text-xs text-slate-400">
          Demo controls — swap time slot to see both the event set AND the color theme change
        </p>
        <div className="mb-4 flex justify-center gap-2">
          {slotButtons.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setSlot(s.key)}
              aria-pressed={slot === s.key}
              aria-label={`Select ${s.label} slot`}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors md:text-sm ${
                slot === s.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <section
          className="relative h-[420px] w-full overflow-hidden rounded-2xl shadow-2xl md:h-[480px]"
          role="region"
          aria-roledescription="carousel"
          aria-label={`Event carousel with ${slides.length} slides`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (slides.length <= 1) return;
            if (e.key === 'ArrowLeft') {
              setIndex((prev) => (prev - 1 + slides.length) % slides.length);
              setRevealKey((k) => k + 1);
            } else if (e.key === 'ArrowRight') {
              setIndex((prev) => (prev + 1) % slides.length);
              setRevealKey((k) => k + 1);
            }
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${active.image})`,
              opacity: fading ? 0 : 1,
              transform: fading ? 'scale(1.02)' : 'scale(1)',
              transition: 'opacity 350ms ease, transform 700ms ease',
            }}
          />

          <div className={`absolute inset-0 bg-gradient-to-t ${theme.overlay}`} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent" />

          <div
            className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {theme.glowColors.slice(0, 2).map((color, i) => (
            <div
              key={color + i}
              className="pointer-events-none absolute rounded-full blur-3xl mix-blend-screen"
              style={{
                backgroundColor: color,
                width: i === 0 ? 320 : 240,
                height: i === 0 ? 320 : 240,
                top: i === 0 ? '-10%' : '60%',
                left: i === 0 ? '60%' : '-6%',
                animation: `orbPulse ${7 + i}s ease-in-out infinite`,
              }}
            />
          ))}

          <div
            key={revealKey}
            className="relative z-10 flex h-full max-w-lg flex-col justify-center px-6 md:px-10"
            style={{ opacity: fading ? 0 : 1, transition: 'opacity 300ms ease' }}
          >
            <span
              className={`mb-3 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${theme.eyebrowClass}`}
              style={{ opacity: 0, animation: 'fadeUpSmall 0.4s ease-out 0.1s forwards' }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: theme.accentHex, boxShadow: `0 0 8px 1px ${theme.accentHex}` }}
              />
              {active.category}
            </span>

            <h1
              className="mb-2 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl"
              style={{ textShadow: '0 6px 24px rgba(0,0,0,0.5)' }}
            >
              {titleWords.map((word, i) => (
                <span
                  key={i}
                  className="mr-2 inline-block"
                  style={{
                    opacity: 0,
                    animation: 'fadeUp 0.5s ease-out forwards',
                    animationDelay: `${0.15 + i * 0.05}s`,
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p
              className="mb-4 text-sm text-slate-200 md:text-base"
              style={{ opacity: 0, animation: 'fadeUpSmall 0.5s ease-out 0.45s forwards' }}
            >
              {active.description}
            </p>

            <div
              className="w-fit rounded-2xl p-[1.5px]"
              style={{
                opacity: 0,
                animation: 'fadeUpSmall 0.5s ease-out 0.6s forwards',
                backgroundImage: `linear-gradient(90deg, ${theme.glowColors.join(', ')}, ${theme.glowColors[0]})`,
                backgroundSize: '200% 200%',
              }}
            >
              <div
                className="rounded-[14px] border border-white/10 bg-white/[0.06] px-4 py-3.5 backdrop-blur-xl"
                style={{ animation: 'gradientShift 8s linear infinite' }}
              >
                <div className="mb-3 flex flex-wrap gap-2">
                  {active.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs text-white"
                    >
                      {h}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  aria-label={active.ctaText}
                  className={`w-fit rounded-lg bg-gradient-to-r ${theme.ctaGradient} px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.04]`}
                  style={{ boxShadow: `0 10px 28px -8px ${theme.accentHex}99` }}
                >
                  {active.ctaText}
                </button>
              </div>
            </div>
          </div>

          {/* Live region: announces slide changes for screen readers */}
          <div aria-live="polite" className="sr-only">
            {`Slide ${index + 1} of ${slides.length}: ${active.title}`}
          </div>

          {slides.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => {
                    setIndex(i);
                    setRevealKey((k) => k + 1);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'w-7' : 'w-2 bg-white/40'
                  }`}
                  style={
                    i === index
                      ? { backgroundColor: theme.accentHex, boxShadow: `0 0 10px 2px ${theme.accentHex}99` }
                      : undefined
                  }
                />
              ))}
            </div>
          )}
        </section>

        <p className="mt-3 text-center text-xs text-slate-500">
          Slot: {slot} · theme: {active.id} · {slides.length} event{slides.length !== 1 ? 's' : ''} in rotation · auto-advances every 3s
        </p>
      </div>
    </div>
  );
}
