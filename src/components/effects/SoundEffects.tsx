import { useEffect } from 'react'

type SfxName = 'hover' | 'click'

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true
}

function safeClosest(el: EventTarget | null, selector: string): HTMLElement | null {
  if (!el) return null
  const node = el as HTMLElement
  if (typeof node.closest !== 'function') return null
  return node.closest(selector)
}

export function SoundEffects() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioCtx) return

    const ctx = new AudioCtx()
    let enabled = true
    try {
      const raw = localStorage.getItem('tus_sfx_enabled_v1')
      if (raw === '0') enabled = false
    } catch {
      // ignore
    }

    const resume = async () => {
      if (ctx.state === 'suspended') {
        try {
          await ctx.resume()
        } catch {
          // ignore
        }
      }
    }

    const play = (name: SfxName) => {
      if (!enabled) return
      if (ctx.state !== 'running') return

      const now = ctx.currentTime
      const gain = ctx.createGain()
      gain.gain.value = 0.0001
      gain.connect(ctx.destination)

      const osc = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      osc.type = 'sine'
      osc2.type = 'triangle'

      const base = name === 'hover' ? 660 : 440
      osc.frequency.setValueAtTime(base, now)
      osc2.frequency.setValueAtTime(base * 1.5, now)

      // “Bugle-ish” glide for click; short sparkle for hover.
      if (name === 'click') {
        osc.frequency.exponentialRampToValueAtTime(base * 2.2, now + 0.12)
        osc2.frequency.exponentialRampToValueAtTime(base * 1.2, now + 0.12)
      } else {
        osc.frequency.exponentialRampToValueAtTime(base * 1.08, now + 0.06)
        osc2.frequency.exponentialRampToValueAtTime(base * 0.98, now + 0.06)
      }

      osc.connect(gain)
      osc2.connect(gain)

      const peak = name === 'hover' ? 0.015 : 0.03
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(peak, now + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + (name === 'hover' ? 0.07 : 0.2))

      osc.start(now)
      osc2.start(now)
      osc.stop(now + (name === 'hover' ? 0.08 : 0.22))
      osc2.stop(now + (name === 'hover' ? 0.08 : 0.22))
    }

    let lastHoverAt = 0
    const onPointerOver = (e: PointerEvent) => {
      const target = safeClosest(e.target, 'a,button,[role="button"]')
      if (!target) return
      if (target.hasAttribute('data-no-sfx')) return
      const now = performance.now()
      if (now - lastHoverAt < 80) return
      lastHoverAt = now
      play('hover')
    }

    const onPointerDown = () => {
      void resume()
    }

    const onClickCapture = (e: MouseEvent) => {
      const target = safeClosest(e.target, 'a,button,[role="button"]')
      if (!target) return
      if (target.hasAttribute('data-no-sfx')) return
      play('click')
    }

    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerover', onPointerOver, { passive: true })
    window.addEventListener('click', onClickCapture, true)

    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerover', onPointerOver)
      window.removeEventListener('click', onClickCapture, true)
      try {
        void ctx.close()
      } catch {
        // ignore
      }
    }
  }, [])

  return null
}

