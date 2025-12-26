import ProductCard from "../components/ProductCard";

type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
};

export default async function HomePage() {
  const res = await fetch("/api/products", {
    cache: "no-store",
  });

  const data = await res.json();
  const products: Product[] = data.products;

  return (
    <main className="bg-linear-to-br from-gray-50 to-gray-100 min-h-screen">
     

      <section className="max-w-7xl mx-auto px-6 py-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products available</p>
          </div>
        )}
      </section>
    </main>
  );
}