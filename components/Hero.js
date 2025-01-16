export default function Hero({ searchTerm, setSearchTerm }) {
    return (
      <section
        className="relative bg-cover bg-center h-[400px]"
        style={{ backgroundImage: "url('/images/cat-colorful-background-digital-art-4k-wallpaper-uhdpaper.com-531@0@i.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white flex flex-col justify-center items-center h-full">
          <h2 className="text-4xl font-bold mb-4">Delicious Food Delivered to You</h2>
          <p className="text-lg mb-6">Fresh, fast, and tasty!</p>
          <input
            type="text"
            placeholder="Search for food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-md w-1/2 focus:outline-none text-black"
          />
        </div>
      </section>
    );
  }
  