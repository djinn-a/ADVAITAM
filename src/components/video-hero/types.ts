export interface VideoHeroProps {
  /** Video source (mp4, webm, or HLS m3u8) */
  src: string;
  /** Poster / thumbnail image */
  poster: string;
  /** Small label above title (e.g. "DESTINATION") */
  label?: string;
  /** Main title line 1 */
  title?: string;
  /** Main title line 2 (usually italic) */
  subtitle?: string;
  /** Short description */
  description?: string;
  /** CTA button text */
  ctaText?: string;
  /** CTA link (optional) */
  ctaHref?: string;
  /** Extra Tailwind classes for the section */
  className?: string;
  /** Called when video ends (optional) */
  onEnded?: () => void;
}
