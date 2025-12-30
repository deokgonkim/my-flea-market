import { Item, ItemStatus } from '@repo/models';
import { apiUrl } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const sampleItems: Item[] = [
  {
    id: '1',
    slug: 'vintage-camera',
    name: 'Vintage Camera',
    price: 140,
    status: ItemStatus.Listed,
    tags: ['Analog', 'Collector'],
    createdAt: '2 days ago',
  },
  {
    id: '2',
    slug: 'mid-century-lamp',
    name: 'Mid-Century Lamp',
    price: 85,
    status: ItemStatus.Reserved,
    tags: ['Lighting', 'Walnut'],
    createdAt: '5 days ago',
  },
  {
    id: '3',
    slug: 'ceramic-planter-set',
    name: 'Ceramic Planter Set',
    price: 48,
    status: ItemStatus.Listed,
    tags: ['Home', 'Terracotta'],
    createdAt: '1 day ago',
  },
  {
    id: '4',
    slug: 'leather-weekend-bag',
    name: 'Leather Weekend Bag',
    price: 190,
    status: ItemStatus.Reserved,
    tags: ['Travel', 'Leather'],
    createdAt: '6 hours ago',
  },
  {
    id: '5',
    slug: 'retro-record-player',
    name: 'Retro Record Player',
    price: 260,
    status: ItemStatus.Listed,
    tags: ['Audio', 'Restored'],
    createdAt: '3 days ago',
  },
  {
    id: '6',
    slug: 'desk-organizer-set',
    name: 'Desk Organizer Set',
    price: 32,
    status: ItemStatus.Listed,
    tags: ['Office', 'Wood'],
    createdAt: '4 days ago',
  },
]

const statuses: Record<string, string> = {
  'listed': 'bg-emerald-100 text-emerald-900',
  'reserved': 'bg-amber-100 text-amber-900',
  'sold': 'bg-slate-200 text-slate-900',
}

const coverClasses = [
  'from-amber-100 via-amber-50 to-white',
  'from-orange-100 via-rose-50 to-white',
  'from-emerald-100 via-lime-50 to-white',
  'from-slate-200 via-slate-100 to-white',
  'from-indigo-100 via-sky-50 to-white',
  'from-stone-200 via-stone-100 to-white',
]

interface GalleryPageProps {
  searchParams: {
    [key: string]: string | string[];
  };
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {

  // get query params from url
  const debug = searchParams['debug'];

  let items: Item[];

  if (!debug) {
    const response = await fetch(`${apiUrl}/items`, { cache: 'no-store' });
  
    items = await response.json();
  } else {
    items = sampleItems;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <header className="flex flex-col gap-3 pb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Inventory Gallery
        </p>
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Notion-style gallery view
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          A visual inventory for your flea market listings. Each card shows a
          cover preview, status, tags, and last edited time.
        </p>
      </header>

      <section className="flex flex-col gap-3 pb-8 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full flex-1 items-center gap-3 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground shadow-sm">
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs uppercase tracking-wide text-muted-foreground">
            Search
          </span>
          <span>Try &quot;camera&quot; or &quot;lamp&quot;...</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <span className="rounded-full border border-border bg-card px-3 py-1 text-foreground">
            Gallery
          </span>
          <span className="rounded-full border border-border bg-card px-3 py-1">
            Board
          </span>
          <span className="rounded-full border border-border bg-card px-3 py-1">
            List
          </span>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link key={item.id} href={`/item/${item.slug}`} className="block">
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div
                className={cn(
                  'relative flex aspect-[4/3] items-end bg-gradient-to-br p-4',
                  coverClasses[parseInt(item.id) % coverClasses.length]
                )}
              >
                {item.imageUrl && (
                  <img 
                    src={item.imageUrl}
                    alt={item.name}
                    className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:scale-105 group-hover:opacity-100"
                  />
                )}
                <span
                  className={cn(
                    'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase',
                    statuses[item?.status ?? "listed"] ?? 'bg-muted text-muted-foreground'
                  )}
                >
                  {item.status}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                  </div>
                  <div className="text-right text-sm font-semibold">
                    {item.price}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                  <span>{item.createdAt}</span>
                  <span className="rounded-full border border-border px-2 py-0.5 text-[11px] uppercase">
                    For sale
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </div>
  )
}
