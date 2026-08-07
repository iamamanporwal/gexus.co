'use client'

import { useEffect } from 'react'

/**
 * One IntersectionObserver for the whole page. It adds `.is-visible` to any
 * element carrying `data-reveal` or `data-reveal-group`, and the transition
 * itself is pure CSS, so no animation library reaches the client.
 *
 * Mounted once in the layout. Elements are unobserved as soon as they fire,
 * so this costs nothing after the first pass down the page.
 */
export function RevealObserver() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-group]')

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
    )

    targets.forEach((el) => observer.observe(el))

    // Anything already above the fold on load should not wait for a scroll.
    requestAnimationFrame(() => {
      targets.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      })
    })

    return () => observer.disconnect()
  }, [])

  return null
}
