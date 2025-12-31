'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { apiUrl } from '@/lib/constants'

interface LikeButtonProps {
  slug: string
  initialLikes?: number
}

const storageKey = (slug: string) => `liked:item:${slug}`

export function LikeButton({ slug, initialLikes = 0 }: LikeButtonProps) {
  const [isLiking, setIsLiking] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(initialLikes)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setLiked(window.localStorage.getItem(storageKey(slug)) === 'true')
  }, [slug])

  const handleClick = async () => {
    if (isLiking) return
    if (!apiUrl) {
      setError('API is not configured')
      return
    }

    setIsLiking(true)
    setError(null)

    try {
      const endpoint = liked ? 'unlike' : 'like'
      const response = await fetch(`${apiUrl}/items/${slug}/${endpoint}`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error(`Failed to ${endpoint} item`)
      }

      const nextLiked = !liked
      const nextCount = Math.max(0, likesCount + (nextLiked ? 1 : -1))
      setLiked(nextLiked)
      setLikesCount(nextCount)
      if (nextLiked) {
        window.localStorage.setItem(storageKey(slug), 'true')
      } else {
        window.localStorage.removeItem(storageKey(slug))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update like')
    } finally {
      setIsLiking(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <Button
        variant="outline"
        className="rounded-full px-6"
        onClick={handleClick}
        disabled={isLiking}
      >
        {isLiking ? (liked ? 'Unliking...' : 'Liking...') : liked ? 'Unlike' : 'Like'}
      </Button>
      <p className="text-xs text-slate-500">{likesCount} likes</p>
      {error ? <p className="text-xs text-rose-500">{error}</p> : null}
    </div>
  )
}
