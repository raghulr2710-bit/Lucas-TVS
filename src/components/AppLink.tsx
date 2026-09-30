import type { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

type Props = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & { href: string }

/**
 * One link element for every kind of destination, chosen from the href:
 *
 *   - "/about", "/technologies#automation" — an internal route, through
 *     react-router, so it navigates without reloading the page (and Lenis
 *     keeps running),
 *   - "https://…" — another site, in a new tab,
 *   - "#…" — a plain in-page anchor.
 *
 * The homepage sections were written with plain <a href="#"> placeholders;
 * swapping the tag for this and filling in the href is all it takes to
 * wire one up.
 */
export function AppLink({ href, children, ...rest }: Props) {
  if (href.startsWith('/')) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    )
  }
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    )
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  )
}
