import FeaturedEvents from "@/components/FeaturedEvents";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";
import TopOrganizers from "@/components/TopOrganizers";
import WhyChoose from "@/components/WhyChoose";

export default async function HomePage() {
  return (
    <div>
      <Hero />
      <FeaturedEvents />
      <TopOrganizers />
      <WhyChoose />
      {/* <Statistics /> */}
      <Testimonials />
    </div>
  );
}
