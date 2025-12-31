import { Item } from '@repo/models';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { apiUrl } from '../../../lib/constants';
import { Fraunces, Manrope } from 'next/font/google';
import Link from 'next/link';
import { LikeButton } from './like-button';

const titleFont = Fraunces({ subsets: ['latin'], weight: ['400', '600'] });
const bodyFont = Manrope({ subsets: ['latin'], weight: ['400', '500', '600'] });

interface ItemPageProps {
  params: {
    slug: string;
  };
}

export default async function ItemPage({ params }: ItemPageProps) {
  if (apiUrl === undefined) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const response = await fetch(`${apiUrl}/items/${params.slug}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    // show alert message and nagivate back to items list
    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="rounded-full">
              ← Back to inventory
            </Button>
          </Link>
        </div>
        <Card className="border-slate-200/70 bg-white/80 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.4)]">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tracking-tight">Item not found</CardTitle>
            <CardDescription>
              The item with slug &quot;{params.slug}&quot; does not exist.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline">Back to marketplace</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const item: Item = await response.json();
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
  const formattedPrice = formatCurrency(item.price);
  const formattedPurchasedPrice = item.purchasedPrice ? formatCurrency(item.purchasedPrice) : '—';
  const formatLabel = (value?: string) =>
    value
      ? value.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
      : '—';
  const formatDate = (value?: string) =>
    value
      ? new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium' }).format(new Date(value))
      : '—';
  const statusVariant =
    item.status === 'sold' ? 'destructive' : item.status === 'reserved' ? 'secondary' : 'default';

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-6">
        <Link href="/">
          <Button variant="outline" className="rounded-full">
            ← Back to inventory
          </Button>
        </Link>
      </div>
      <div className="mb-10">
        <div className="relative h-56 w-full overflow-hidden rounded-[32px] border border-slate-200/70 bg-[radial-gradient(circle_at_top,#f1efe8,transparent_70%),linear-gradient(120deg,#fafaf9,#e7e4dc)] shadow-[0_30px_80px_-60px_rgba(15,23,42,0.7)]">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm uppercase tracking-[0.2em] text-slate-500">
              No Image
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.6fr_0.9fr]">
        <section className="space-y-8">
          <div>
            <Badge variant={statusVariant} className="mb-4 uppercase tracking-[0.2em]">
              {formatLabel(item.status)}
            </Badge>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1
                className={`${titleFont.className} text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl`}
              >
                {item.name}
              </h1>
              <LikeButton slug={item.slug} initialLikes={item.likes ?? 0} />
            </div>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {item.description ?? 'This listing is waiting for a full description.'}
            </p>
          </div>

          <Card className="border-slate-200/70 bg-white/90">
            <CardHeader>
              <CardTitle className="text-xl">Properties</CardTitle>
              <CardDescription>Notion-style glanceable details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-sm text-slate-600">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Category</p>
                  <p className="mt-2 text-base text-slate-900">{formatLabel(item.category)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Condition</p>
                  <p className="mt-2 text-base text-slate-900">{formatLabel(item.condition)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Listed</p>
                  <p className="mt-2 text-base text-slate-900">{formatDate(item.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Slug</p>
                  <p className="mt-2 text-base text-slate-900">{item.slug}</p>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Tags</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(item.tags && item.tags.length > 0 ? item.tags : ['No tags']).map((tag) => (
                    <Badge key={tag} variant="secondary" className="rounded-full px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card className="border-slate-200/70 bg-white/90">
            <CardHeader>
              <CardTitle className="text-xl">Price</CardTitle>
              <CardDescription>Centered like a Notion preview pane.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-slate-900">{formattedPrice}</p>
              <p className="mt-2 text-sm text-slate-500">
                Purchased price {formattedPurchasedPrice}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button className="w-full">Message seller</Button>
              <Button variant="outline" className="w-full">Save for later</Button>
            </CardFooter>
          </Card>

          <Card className="border-slate-200/70 bg-white/90">
            <CardHeader>
              <CardTitle className="text-xl">Source</CardTitle>
              <CardDescription>Original listing link.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                {item.productUrl ? (
                  <a
                    className="text-slate-900 underline underline-offset-4"
                    href={item.productUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open product page
                  </a>
                ) : (
                  'No external link provided.'
                )}
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
