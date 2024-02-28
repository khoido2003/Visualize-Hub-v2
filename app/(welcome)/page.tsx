import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";
import { Hero } from "./_components/hero";

export default function Home() {
  return (
    <div className="h-full ">
      <div>
        <Heading />
        <Hero />
      </div>
      <Footer />
    </div>
  );
}
