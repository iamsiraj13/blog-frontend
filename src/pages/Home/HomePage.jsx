import MainLayout from "../../components/MainLayout";
import Articles from "./Contaner/Articles";
import CTA from "./Contaner/CTA";
import Hero from "./Contaner/Hero";

const HomePage = () => {
  return (
    <MainLayout>
      <Hero />
      <Articles />
      <CTA />
    </MainLayout>
  );
};

export default HomePage;
