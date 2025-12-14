import PromptLibrary from "@/components/PromptLibrary";
import { Navbar } from "@/components/layout/Navbar"; // Assuming you have this
import { Footer } from "@/components/layout/Footer"; // Assuming you have this

const PromptBible = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-12">
        <PromptLibrary />
      </main>
      <Footer />
    </div>
  );
};

export default PromptBible;
