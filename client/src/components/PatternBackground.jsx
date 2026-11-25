export default function PatternBackground({ word, angle = 0, className }) {
  const patternId = `pattern-${word.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <defs>
        <pattern
          id={patternId}
          width="470"
          height="260"
          patternUnits="userSpaceOnUse"
          patternTransform={`rotate(${angle})`}
        >
          <text x="12" y="100" className="pat-text">{word}</text>
          <text x="260" y="215" className="pat-text small">{word}</text>
          <circle cx="410" cy="70" r="42" className="pat-shape" />
          <circle cx="60" cy="200" r="26" className="pat-shape" />
          <polygon points="150,150 160,176 188,178 166,196 174,222 150,207 126,222 134,196 112,178 140,176" className="pat-shape" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
