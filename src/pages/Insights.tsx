import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Insights = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
          <main className="container mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Green Insights</h1>
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Insights;