import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  skew: number;
}

const COLORS = [
  "rgba(232,181,192,0.85)",
  "rgba(244,167,179,0.8)",
  "rgba(255,183,77,0.75)",
  "rgba(201,149,108,0.7)",
  "rgba(255,220,180,0.8)",
  "rgba(248,187,208,0.85)",
];

function makePetal(id: number): Petal {
  return {
    id,
    left: Math.random() * 100,
    size: Math.random() * 10 + 8,
    duration: Math.random() * 9 + 8,
    delay: Math.random() * 15,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    skew: Math.random() * 60 - 30,
  };
}

export function FloatingPetals() {
  const [petals] = useState<Petal[]>(() =>
    Array.from({ length: 28 }, (_, i) => makePetal(i))
  );

  const petalPath = "M0,0 C12,-8 28,6 22,22 C16,38 -2,42 -8,28 C-14,14 -12,8 0,0Z";

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <style>{`
        @keyframes petal-drift {
          0%   { transform: translateY(-40px) rotate(0deg) translateX(0px); opacity: 0; }
          5%   { opacity: 1; }
          90%  { opacity: 0.7; }
          100% { transform: translateY(110vh) rotate(700deg) translateX(50px); opacity: 0; }
        }
        @keyframes petal-sway {
          0%, 100% { margin-left: 0px; }
          33%       { margin-left: 25px; }
          66%       { margin-left: -20px; }
        }
      `}</style>
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: 0,
            width: p.size * 1.5,
            height: p.size * 1.5,
            animation: `petal-drift ${p.duration}s ease-in ${p.delay}s infinite,
                        petal-sway ${p.duration * 0.6}s ease-in-out ${p.delay}s infinite`,
          }}
        >
          <svg
            viewBox="0 0 30 30"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              transform: `rotate(${p.skew}deg)`,
            }}
          >
            <path d={petalPath} fill={p.color} />
          </svg>
        </div>
      ))}
    </div>
  );
}
