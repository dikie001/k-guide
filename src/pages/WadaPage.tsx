import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, ClipboardList, Megaphone, Pill } from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- MOCK DATA ---
const updates = [
  {
    id: 1,
    title: "Prohibited List 2026",
    icon: <Pill className="h-6 w-6 text-orange-500" />,
    color: "bg-orange-500/10",
    to: "/prohibited-list",
  },
  {
    id: 2,
    title: "TUE Process Changes",
    icon: <Megaphone className="h-6 w-6 text-primary" />,
    color: "bg-primary/10",
    to: "/tue-process",
  },
];

const blogs = [
  {
    id: 1,
    title: "Common Unintentional Doping Risks",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 2,
    title: "Understanding the 'Speak Up!' Program",
    image:
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 3,
    title: "How to Apply for a TUE",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=200&h=200",
  },
];

export default function WadaPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full flex-col bg-background text-foreground relative">
      <Header />

      <div className="flex-1 w-full overflow-hidden flex flex-col relative">
        <ScrollArea className="flex-1 w-full">
          <div className="p-4 space-y-6 pb-24">
            {/* Recent WADA Updates */}
            <section>
              <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="text-sm font-bold text-foreground">
                  Recent Updates
                </h2>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wide cursor-pointer">
                  View All
                </span>
              </div>

              <div className="grid grid-cols-2 pb-2">
                {updates.map((item) => (
                  <button
                    onClick={() => navigate(item.to)}
                    key={item.id}
                    className={`${item.color} rounded-xl flex items-center mx-auto flex-col gap-2 p-3 relative border border-border/40 active:scale-95 transition-transform duration-200`}
                  >
                    <div className="flex-1 flex items-start pt-1">
                      <div className="bg-card p-2 rounded-lg shadow-sm ring-1 ring-border">
                        {item.icon}
                      </div>
                    </div>
                    <p className="text-xs font-bold text-foreground leading-tight">
                      {item.title}
                    </p>
                  </button>
                ))}
              </div>
            </section>

            {/* Substance Database */}
            <section>
              <h2 className="text-sm font-bold text-foreground mb-3 px-1">
                Substance Database
              </h2>
              <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/60 flex gap-4 items-center">
                <div className="shrink-0 h-16 w-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <ClipboardList className="h-7 w-7 text-primary" />
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-bold text-foreground mb-1">
                    Check Compliance
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 leading-snug">
                    Check substances against the 2026 Prohibited List.
                  </p>
                  <Button
                    onClick={() => navigate("/substance-database")}
                    size="sm"
                    className="h-8 px-4 rounded-full cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] uppercase font-bold tracking-wide w-full"
                  >
                    Open Database <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </section>

            {/* Educational Blogs */}
            <section className="pb-2">
              <h2 className="text-sm font-bold text-foreground mb-3 px-1">
                Insights
              </h2>
              <div className="grid gap-3">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-card p-2.5 rounded-xl shadow-sm border border-border/60 flex items-center gap-3 active:scale-[0.99] transition-transform cursor-pointer"
                  >
                    <img
                      src={blog.image}
                      alt="Blog"
                      className="h-16 w-16 object-cover rounded-lg bg-muted shrink-0"
                    />
                    <div className="flex-1 py-0.5 pr-2">
                      <span className="text-[10px] font-bold text-primary mb-0.5 block uppercase tracking-wider">
                        Education
                      </span>
                      <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-2">
                        {blog.title}
                      </h3>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 z-40">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
