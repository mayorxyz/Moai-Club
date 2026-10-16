// Edit here: ProgressiveImage component
// Shows a tiny WebP thumbnail immediately, then loads the full-quality image
// on top and cross-fades to it once decoded. Used so the browser never
// downloads full-size art while the user is just browsing.
import { useState } from 'react';

interface ProgressiveImageProps {
  /** Full-quality image source (loaded lazily). */
  src: string;
  /** Low-res WebP thumbnail shown instantly while the full image loads. */
  thumb?: string;
  alt: string;
  /** Load the full image immediately instead of waiting for the viewport. */
  eager?: boolean;
  /** Blur the thumbnail until the full image is ready (for large detail views). */
  blurPlaceholder?: boolean;
}

export function ProgressiveImage({ src, thumb, alt, eager = false, blurPlaceholder = false }: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);
  const [fullFailed, setFullFailed] = useState(false);

  // Fallback: if BOTH the thumbnail and the full image fail to load (e.g. CDN
  // hiccup or missing file), render a colored placeholder instead of a broken
  // image icon.
  if ((thumbFailed || !thumb) && fullFailed) {
    return (
      <div style={{ ...({ position: 'relative' } as React.CSSProperties), width: '100%', height: '100%', background: '#5ee8d5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink, #111)', fontFamily: 'var(--font-head, monospace)', fontWeight: 700, fontSize: '12px' }} aria-label={alt}>
        Image unavailable
      </div>
    );
  }

  const layer: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  };

  return (
    <span style={{ position: 'relative', display: 'block', width: '100%', height: '100%', overflow: 'hidden' }}>
      {thumb && !thumbFailed && (
        <img
          src={thumb}
          alt=""
          aria-hidden="true"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setThumbFailed(true)}
          style={{
            ...layer,
            filter: loaded || !blurPlaceholder ? 'none' : 'blur(16px)',
            transform: loaded ? 'scale(1)' : blurPlaceholder ? 'scale(1.1)' : 'scale(1)',
            transition: 'filter .4s ease, transform .4s ease',
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          // If the full image fails, keep the thumbnail visible.
          setFullFailed(true);
          e.currentTarget.style.display = 'none';
        }}
        style={{
          ...layer,
          opacity: loaded ? 1 : 0,
          transition: 'opacity .4s ease',
        }}
      />
    </span>
  );
}
