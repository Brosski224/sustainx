export function SustainXLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1000 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Leaves */}
      <g transform="translate(400, -50) scale(0.8)">
        <path
          d="M100 200 C100 150, 150 100, 200 100 C250 100, 300 150, 300 200"
          fill="#4ade80"
          transform="rotate(30 200 200)"
        />
        <path
          d="M100 200 C100 150, 150 100, 200 100 C250 100, 300 150, 300 200"
          fill="#22c55e"
          transform="rotate(-30 200 200)"
        />
        <path
          d="M100 200 C100 150, 150 100, 200 100 C250 100, 300 150, 300 200"
          fill="#4ade80"
          transform="rotate(90 200 200)"
        />
      </g>

      {/* Text */}
      <text x="50" y="200" className="text-[120px] font-bold" fill="currentColor">
        SUSTAIN
        <tspan fill="#22c55e">X</tspan>
      </text>
    </svg>
  )
}

