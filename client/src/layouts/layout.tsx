import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

type Props = { children: React.ReactNode; showHero?: boolean };
const Layout = ({ children, showHero = false }: Props) => {
  return (
    <div className=" flex flex-col min-h-screen">
      <Header />
      {showHero && <Hero />}

      <div className="container mx-auto flex-1 py-10"> {children}</div>
      <Footer />
      {/* SX6ZP5KZFYG2SG8GMCDK7X52 */}
    </div>
  );
};

export default Layout;
