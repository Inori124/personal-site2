import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-avatar">
          {/* biome-ignore lint/performance/noImgElement: Static portrait for hero */}
          <img
            src="/images/me-livephoto.jpg"
            alt="Ying Cao"
            className="hero-avatar-image"
            loading="eager"
            decoding="async"
          />
        </div>

        <h1 className="hero-title">
          <span className="hero-name">Ying Cao</span>
        </h1>

        <p className="hero-tagline">
          Applied Statistics graduate student at{' '}
          <a href="https://english.bnu.edu.cn/" className="hero-highlight">
            Beijing Normal University
          </a>
          , focusing on data mining, educational research, and interpretable
          modeling.
          <br />
          Bridging theory and practice through code and storytelling.
        </p>

        <div className="hero-chips">
          <span className="hero-chip">R · Python · SQL</span>
          <span className="hero-chip">Educational Data Mining</span>
          <span className="hero-chip">Applied Statistics</span>
        </div>

        <div className="hero-cta">
          <Link href="/about" className="button button-primary">
            About Me
          </Link>
          <Link href="/projects" className="button button-secondary">
            View Projects
          </Link>
        </div>
      </div>

      <div className="hero-bg" aria-hidden="true">
        <div className="hero-gradient" />
      </div>
    </section>
  );
}
