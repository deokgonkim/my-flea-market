'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { apiUrl } from '@/lib/constants'

interface SubscribeButtonProps extends React.PropsWithChildren {
  slug: string
}

const telegramBotId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID || '';

export function SubscribeButton({ slug, children }: SubscribeButtonProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return
  }, [slug])

  const handleClick = async () => {
    const startString = btoa(`subscribe,${slug}`);
    window.open(`https://t.me/${telegramBotId}?start=${startString}`, '_blank');
  }

  return (
    <Button
      className="w-full"
      onClick={handleClick}
    >
      {children}
    </Button>
  )
}
