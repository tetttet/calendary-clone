import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Workflow } from "@/components/workflow";
import { Scheduling, FeatureSection } from "@/components/features";
import { Stories } from "@/components/stories";
import { Integrations } from "@/components/integrations";
import { Conversion } from "@/components/conversion";
import { Footer } from "@/components/footer";
import { Privacy } from "@/components/privacy";
import { MotionObserver } from "@/components/motion-observer";
export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Workflow />
        <Scheduling />
        <FeatureSection index={0} />
        <FeatureSection index={1} />
        <FeatureSection index={2} />
        <Stories />
        <Integrations />
        <Conversion />
      </main>
      <Footer />
      <Privacy />
      <MotionObserver />
    </>
  );
}
