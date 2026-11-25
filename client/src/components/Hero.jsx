import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PatternBackground from './PatternBackground';

// Each slide changes the tagline and the angle of the background pattern.
const slides = [
  { tag: 'NEW DROP', line: 'Fresh tees every week. Pick your size and go.', cta: 'Shop now', to: '/shop', angle: -8 },
  { tag: 'LIMITED RUN', line: 'Small batches. Once they are gone, they are gone.', cta: 'See the shirts', to: '/shop', angle: 6 },
  { tag: 'MEMBERS', line: 'Make an account to save your cart and track orders.', cta: 'Sign up', to: '/register', angle: -14 },
];

export default function Hero() {
  const [i, setI] = useState(0);
  const slide = slides[i];
  const go = (n) => setI((n + slides.length) % slides.length);

  // auto-advance; restarts whenever the slide changes
  useEffect(() => {
    const t = setTimeout(() => go(i + 1), 6000);
    return () => clearTimeout(t);
  }, [i]);

  return (
    <section className="landing-hero">
      <PatternBackground word="JERUS" angle={slide.angle} className="hero-pattern" />
      <div className="hero-glow" />

      <button className="hero-arrow prev" onClick={() => go(i - 1)} aria-label="Previous slide">‹</button>

      <div className="hero-content" key={i}>
        <h1 className="wordmark">JERUS</h1>
        <p className="hero-tag">{slide.tag}</p>
        <p className="hero-line">{slide.line}</p>
        <Link to={slide.to} className="hero-cta">{slide.cta}</Link>
      </div>

      <button className="hero-arrow next" onClick={() => go(i + 1)} aria-label="Next slide">›</button>

      <div className="hero-dots">
        {slides.map((_, n) => (
          <button
            key={n}
            className={`dot ${n === i ? 'on' : ''}`}
            onClick={() => setI(n)}
            aria-label={`Go to slide ${n + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
