import './page.css';

interface ItemPageProps {
  params: {
    slug: string;
  };
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ItemPage({ params }: ItemPageProps) {
  if (apiUrl === undefined) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Item Details</h1>
      <p className="text-xl">You are viewing item: {params.slug}</p>
      {/* More item details can be fetched and displayed here */}
      {apiUrl}
    </div>
  );
}
