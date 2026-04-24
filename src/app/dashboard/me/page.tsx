"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const sanity = createClient({ projectId: "1pu795c0", dataset: "production", apiVersion: "2024-03-12", useCdn: false });
const builder = imageUrlBuilder(sanity);
function urlFor(source: any) { return builder.image(source); }

const card = (border: string, shadow: string, bg = 'white'): React.CSSProperties => ({
  backgroundColor: bg, border: `4px solid ${border}`, borderRadius: '24px',
  padding: '2rem', boxShadow: `8px 8px 0px ${shadow}`, marginBottom: '2rem'
});
const badge = (bg: string): React.CSSProperties => ({
  backgroundColor: bg, padding: '4px 14px', borderRadius: '50px',
  fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid #111', display: 'inline-block'
});

function ProgressBar({ value, color = '#D4006A' }: { value: number; color?: string }) {
  return (
    <div style={{ backgroundColor: '#eee', borderRadius: '50px', height: '12px', overflow: 'hidden', border: '2px solid #111' }}>
      <div style={{ width: `${value}%`, backgroundColor: color, height: '100%', borderRadius: '50px', transition: 'width 0.6s ease' }} />
    </div>
  );
}

function StatBox({ label, value, sub, color = '#FAF7F0' }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div style={{ backgroundColor: color, borderRadius: '16px', padding: '1.25rem 1.5rem', border: '2px solid #eee', textAlign: 'center', flex: 1 }}>
      <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#D4006A', lineHeight: 1 }}>{value}</p>
      <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#888', marginTop: '4px', fontWeight: 'bold' }}>{label}</p>
      {sub && <p style={{ fontSize: '0.75rem', color: '#555', marginTop: '4px' }}>{sub}</p>}
    </div>
  );
}

export default function MyProfile() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [data, setData] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [goals, setGoals] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) fetchProfile();
  }, [isLoaded, isSignedIn, user]);

  const fetchProfile = async () => {
    const res = await sanity.fetch(
      `*[_type == "client" && clerkUserId == $userId][0]{
        ...,
        assignedProfessor->{ name, specialty, bio, image },
        "lessonCount": count(*[_type == "lesson" && client._ref == ^._id]),
        "completedCount": count(*[_type == "lesson" && client._ref == ^._id && status == "completed"]),
        "upcomingCount": count(*[_type == "lesson" && client._ref == ^._id && status == "upcoming"]),
        "upcomingLessons": *[_type == "lesson" && client._ref == ^._id && status == "upcoming"] | order(date asc)[0..2]{
          title, date, professor->{ name }
        },
        "recentCompleted": *[_type == "lesson" && client._ref == ^._id && status == "completed"] | order(date desc)[0..4]{
          title, date, notes, professor->{ name }
        }
      }`,
      { userId: user?.id }
    );
    setData(res);
    setGoals(res?.learningGoals || "");
  };

  const saveGoals = async () => {
    setSaving(true);
    await fetch("/api/update-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goals }),
    });
    setSaving(false);
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
    fetchProfile();
  };

  if (!isLoaded || !isSignedIn) return null;

  const displayName = data?.name || user.fullName;
  const completed = data?.completedCount || 0;
  const total = data?.lessonCount || 0;
  const upcoming = data?.upcomingCount || 0;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Seviye hesapla (her 5 completed session = 1 level)
  const levelNum = Math.floor(completed / 5) + 1;
  const levelProgress = ((completed % 5) / 5) * 100;
  const sessionsToNextLevel = 5 - (completed % 5);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F0', color: '#111', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '4px solid #D4006A' }}>
          <h1 style={{ fontFamily: "'Pacifico', cursive", fontSize: '2rem', color: '#D4006A' }}>My Profile</h1>
          <Link href="/dashboard" style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.8rem', backgroundColor: '#111', color: 'white', padding: '8px 16px', borderRadius: '50px', textDecoration: 'none' }}>
            ← Dashboard
          </Link>
        </div>

        {/* Hero card */}
        <div style={card('#98FFD9', '#111')}>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {data?.image
              ? <img src={urlFor(data.image).width(160).height(160).url()} style={{ width: '100px', height: '100px', borderRadius: '50%', border: '4px solid #111', objectFit: 'cover' }} alt="Profile" />
              : <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#FFD1DC', border: '4px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>✦</div>
            }
            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: '2rem', marginBottom: '0.5rem' }}>{displayName}</h2>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                <span style={badge(data?.clientType === 'corporate' ? '#FFD1DC' : '#CCFF00')}>{data?.clientType || 'individual'}</span>
                <span style={badge('#eee')}>{data?.level || 'Pending Evaluation'}</span>
                <span style={badge(data?.status === 'active' ? '#98FFD9' : '#eee')}>{data?.status || 'active'}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#555' }}>{user.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>
        </div>

        {/* Progress tracking */}
        <div style={card('#CCFF00', '#111')}>
          <h3 style={{ fontFamily: "'Pacifico', cursive", fontSize: '1.5rem', marginBottom: '1.5rem' }}>My Progress</h3>

          {/* Stat boxes */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <StatBox label="Completed" value={completed} sub="sessions" color="#f0fff8" />
            <StatBox label="Upcoming" value={upcoming} sub="sessions" color="#fff0f6" />
            <StatBox label="Total" value={total} sub="sessions" color="#f9f9f9" />
            <StatBox label="Level" value={`L${levelNum}`} sub={`${sessionsToNextLevel} to next`} color="#fffbe6" />
          </div>

          {/* Overall progress bar */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#555' }}>Overall Journey</p>
              <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#D4006A' }}>{progress}%</p>
            </div>
            <ProgressBar value={progress} color="#D4006A" />
          </div>

          {/* Level progress bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#555' }}>Level {levelNum} Progress</p>
              <p style={{ fontSize: '0.75rem', color: '#888' }}>{completed % 5} / 5 sessions</p>
            </div>
            <ProgressBar value={levelProgress} color="#111" />
            {completed > 0 && sessionsToNextLevel < 5 && (
              <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '8px', fontStyle: 'italic' }}>
                {sessionsToNextLevel} more session{sessionsToNextLevel > 1 ? 's' : ''} to reach Level {levelNum + 1} 🎯
              </p>
            )}
          </div>
        </div>

        {/* Learning goals */}
        <div style={card('#FFD1DC', '#111')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontFamily: "'Pacifico', cursive", fontSize: '1.5rem' }}>My Learning Goals</h3>
            {!editing
              ? <button onClick={() => setEditing(true)} style={{ backgroundColor: '#111', color: 'white', padding: '8px 18px', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}>Edit</button>
              : <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => setEditing(false)} style={{ backgroundColor: '#eee', color: '#111', padding: '8px 16px', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}>Cancel</button>
                  <button onClick={saveGoals} disabled={saving} style={{ backgroundColor: '#D4006A', color: 'white', padding: '8px 18px', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}>
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
            }
          </div>
          {editing
            ? <textarea value={goals} onChange={e => setGoals(e.target.value)} rows={4} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid #111', fontFamily: 'inherit', fontSize: '0.95rem', resize: 'vertical', backgroundColor: '#FAF7F0', boxSizing: 'border-box' }} placeholder="What do you want to achieve?" />
            : <p style={{ fontSize: '0.95rem', fontStyle: 'italic', color: '#333', lineHeight: 1.7 }}>{goals || "No goals set yet. Click Edit to add yours."}</p>
          }
          {saved && <p style={{ color: '#0a6640', fontSize: '0.8rem', marginTop: '8px' }}>✓ Saved successfully</p>}
        </div>

        {/* Professor message */}
        {data?.teacherMessage && (
          <div style={card('#D4006A', '#D4006A', '#111')}>
            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#98FFD9', marginBottom: '0.75rem', fontWeight: 'bold' }}>
              Message from {data?.assignedProfessor?.name || 'Your Professor'}
            </p>
            <p style={{ fontSize: '1rem', fontStyle: 'italic', lineHeight: 1.8, color: 'white' }}>"{data.teacherMessage}"</p>
          </div>
        )}

        {/* Resources */}
        {data?.resources?.length > 0 && (
          <div style={card('#111', '#98FFD9')}>
            <h3 style={{ fontFamily: "'Pacifico', cursive", fontSize: '1.5rem', marginBottom: '1.5rem' }}>Resources & Materials</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {data.resources.map((r: any, i: number) => (
                <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', backgroundColor: '#FAF7F0', borderRadius: '12px', border: '2px solid #eee', textDecoration: 'none', color: '#111' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{r.title}</p>
                    {r.description && <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '2px' }}>{r.description}</p>}
                  </div>
                  <span style={{ fontSize: '1.2rem' }}>→</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming sessions */}
        {data?.upcomingLessons?.length > 0 && (
          <div style={card('#98FFD9', '#111')}>
            <h3 style={{ fontFamily: "'Pacifico', cursive", fontSize: '1.5rem', marginBottom: '1.5rem' }}>Upcoming Sessions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {data.upcomingLessons.map((l: any, i: number) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'white', borderRadius: '12px', border: '2px solid #eee' }}>
                  <div>
                    <p style={{ fontWeight: 'bold' }}>{l.title}</p>
                    <p style={{ fontSize: '0.8rem', color: '#666' }}>{l.professor?.name || 'Staff'}</p>
                  </div>
                  <p style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                    {new Date(l.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent completed */}
        {data?.recentCompleted?.length > 0 && (
          <div style={card('#111', '#111')}>
            <h3 style={{ fontFamily: "'Pacifico', cursive", fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recent Sessions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {data.recentCompleted.map((l: any, i: number) => (
                <div key={i} style={{ backgroundColor: '#FAF7F0', borderRadius: '12px', padding: '1rem 1.25rem', border: '2px solid #eee' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{l.title}</p>
                      <p style={{ fontSize: '0.8rem', color: '#666' }}>{l.professor?.name || 'Staff'}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={badge('#98FFD9')}>completed</span>
                      <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '4px' }}>
                        {new Date(l.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  {l.notes && (
                    <p style={{ fontSize: '0.8rem', fontStyle: 'italic', color: '#555', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #eee' }}>
                      "{l.notes}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2rem', paddingBottom: '4rem' }}>
          <Link href="/dashboard" style={{ display: 'inline-block', backgroundColor: '#D4006A', color: 'white', padding: '14px 40px', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none', boxShadow: '4px 4px 0px #111' }}>
            Back to Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}