import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-brown-dark to-brown py-20 text-center text-white">
        <h1 className="text-3xl font-bold md:text-4xl">About Us</h1>
        <p className="mt-2 opacity-80">Rooted in Tradition, Made for Today</p>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-maroon">Our Story</h2>
          <p className="mt-4 leading-relaxed text-brown">
            Sree Durga Food Industries brings the traditional flavours of Chennai and Tamil Nadu to customers through a convenient online experience. Based in Sholinganallur, we are passionate about preserving and sharing the authentic taste of Tamil traditional cuisine.
          </p>
          <p className="mt-4 leading-relaxed text-brown">
            Every product we offer is prepared following time-honoured recipes and methods that have been cherished across Tamil households for generations. From crispy murukku to sweet adhirasam, from flavourful pickles to aromatic spice blends — we take pride in delivering food that tastes like home.
          </p>
          <p className="mt-4 leading-relaxed text-brown">
            Our commitment is simple: authentic taste, quality ingredients, hygienic preparation, and the convenience of doorstep delivery across Chennai.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {[
            { label: "சென்னை", sub: "Chennai Based" },
            { label: "♨", sub: "Fresh Preparation" },
            { label: "✦", sub: "Traditional Recipes" },
          ].map((item) => (
            <div key={item.sub} className="card p-5 text-center">
              <div className="text-2xl font-bold text-maroon">{item.label}</div>
              <div className="mt-1 text-xs text-brown-light">{item.sub}</div>
            </div>
          ))}
        </div>

        <div className="card mt-6 bg-cream-dark p-6">
          <h3 className="text-lg font-bold text-brown-dark">Business Information</h3>
          <div className="mt-3 space-y-1 text-sm text-brown">
            <p><strong>Legal Name:</strong> Suganya K</p>
            <p><strong>Trade Name:</strong> Sree Durga Food Industries</p>
            <p><strong>Business Type:</strong> Proprietorship</p>
            <p><strong>GST:</strong> 33FHSPS6377C1ZR</p>
            <p><strong>Address:</strong> No. 135, Village High Road, Sholinganallur, Chennai, Tamil Nadu 600119, India</p>
          </div>
        </div>
      </div>
    </>
  );
}
