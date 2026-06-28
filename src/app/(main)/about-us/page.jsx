export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Hero */}
      <section className="text-center mb-20">
        <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
          About BiblioDrop
        </h1>

        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-8">
          BiblioDrop is a modern community-driven library platform that connects
          readers and librarians through an easy-to-use digital experience. We
          believe every book deserves a reader and every reader deserves access
          to great books.
        </p>
      </section>

      {/* Mission */}
      <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>

          <p className="text-slate-600 dark:text-slate-400 leading-8">
            Our mission is to simplify book discovery, borrowing, and library
            management while encouraging a culture of reading. Whether you&apos;re
            looking for your next favorite novel or managing thousands of books
            as a librarian, BiblioDrop provides an efficient and enjoyable
            experience.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-slate-800 rounded-3xl p-10">
          <h3 className="text-2xl font-bold mb-6">What We Offer</h3>

          <ul className="space-y-4 text-slate-600 dark:text-slate-300">
            <li>📚 Browse thousands of books</li>
            <li>❤️ Create your personal wishlist</li>
            <li>📦 Request book deliveries</li>
            <li>⭐ Share reviews and ratings</li>
            <li>📊 Personal reading dashboard</li>
            <li>🏛 Efficient librarian management tools</li>
          </ul>
        </div>
      </section>

      {/* Why Choose */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose BiblioDrop?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="border rounded-2xl p-8">
            <div className="text-5xl mb-4">📖</div>

            <h3 className="text-xl font-semibold mb-3">Easy Book Discovery</h3>

            <p className="text-slate-600 dark:text-slate-400">
              Search, filter, and explore books across multiple categories with
              an intuitive interface.
            </p>
          </div>

          <div className="border rounded-2xl p-8">
            <div className="text-5xl mb-4">🚚</div>

            <h3 className="text-xl font-semibold mb-3">Convenient Delivery</h3>

            <p className="text-slate-600 dark:text-slate-400">
              Request books online and track delivery status directly from your
              dashboard.
            </p>
          </div>

          <div className="border rounded-2xl p-8">
            <div className="text-5xl mb-4">👥</div>

            <h3 className="text-xl font-semibold mb-3">Community Focused</h3>

            <p className="text-slate-600 dark:text-slate-400">
              Connect with fellow readers through ratings, reviews, and
              recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Roles */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Built for Everyone
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="rounded-2xl border p-8">
            <h3 className="text-2xl font-bold mb-4">Readers</h3>

            <p className="text-slate-600 dark:text-slate-400">
              Browse books, manage wishlists, borrow books, write reviews, and
              keep track of your reading journey.
            </p>
          </div>

          <div className="rounded-2xl border p-8">
            <h3 className="text-2xl font-bold mb-4">Librarians</h3>

            <p className="text-slate-600 dark:text-slate-400">
              Add books, manage inventory, process deliveries, and maintain a
              rich library collection.
            </p>
          </div>

          <div className="rounded-2xl border p-8">
            <h3 className="text-2xl font-bold mb-4">Administrators</h3>

            <p className="text-slate-600 dark:text-slate-400">
              Review book submissions, manage users, oversee transactions, and
              keep the platform secure and reliable.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-blue-600 text-white rounded-3xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Read More. Learn More. Share More.
        </h2>

        <p className="max-w-3xl mx-auto text-blue-100 leading-8">
          At BiblioDrop, we&apos;re committed to making books more accessible and
          building a vibrant community of readers, librarians, and lifelong
          learners.
        </p>
      </section>
    </div>
  );
}
