import { Item } from '@repo/models';
import { apiUrl } from '../../../lib/constants';
import './page.css';

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

  const item: Item = await response.json();
  console.log("Fetched item:", item);
  if (!item || response.status !== 200) {
    // show alert message and nagivate back to items list
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Item Not Found</h1>
        <p className="text-xl">The item with slug &quot;{params.slug}&quot; does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Item Details</h1>
      <p className="text-xl">You are viewing item: {item.name}</p>
      {item.imageUrl && (
        <img src={item.imageUrl} alt={item.name} />
      )}
      {item.price && (
        <p className="text-lg">Price: {new Intl.NumberFormat('ko-KR', {
          style: 'currency',
          currency: 'KRW',
        }).format(item.price)}</p>
      )}
    </div>
  );
}
