import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  Ban,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Search,
  X,
} from "lucide-react";
import { useState, useMemo } from "react";

type ComplianceStatus = "BANNED" | "CONDITIONAL" | "SAFE" | "TUE_REQUIRED";

interface Substance {
  id: string;
  name: string;
  category: string;
  code: string;
  status: ComplianceStatus;
  inComp: boolean;
  outComp: boolean;
  threshold?: string;
  description: string;
}

const CATEGORIES = [
  { id: "ALL", label: "All" },
  { id: "S1", label: "Anabolic" },
  { id: "S2", label: "Peptides" },
  { id: "S6", label: "Stimulants" },
  { id: "S9", label: "Glucocorticoids" },
  { id: "S3", label: "Beta-2 Agonists" },
  { id: "M1", label: "Manipulation" },
];

const SUBSTANCES: Substance[] = Array.from({ length: 24 }).map((_, i) => ({
  id: `${i + 1}`,
  name:
    [
      "Stanozolol",
      "Pseudoephedrine",
      "Salbutamol",
      "Caffeine",
      "EPO",
      "Clenbuterol",
      "Testosterone",
      "Cannabis",
      "Insulin",
      "Morphine",
      "Furosemide",
      "Tamoxifen",
    ][i % 12] + (i > 11 ? ` Type-${i}` : ""),
  category: [
    "Anabolic Agents",
    "Stimulants",
    "Beta-2 Agonists",
    "Monitoring",
    "Peptide Hormones",
  ][i % 5],
  code: `S${(i % 9) + 1}`,
  status: (["BANNED", "CONDITIONAL", "TUE_REQUIRED", "SAFE"] as const)[i % 4],
  inComp: i % 4 !== 3,
  outComp: i % 4 === 0 || i % 4 === 2,
  threshold: i % 2 === 0 ? "> 150 ng/mL" : undefined,
  description:
    "Used to treat various medical conditions but regulated in sports due to performance-enhancing effects.",
}));

const statusStyles = {
  BANNED: {
    icon: "bg-red-500/10 text-red-500",
    badge: "bg-red-500/10 text-red-400",
    modal: "bg-red-500/10 text-red-400",
    label: "Banned",
  },
  SAFE: {
    icon: "bg-emerald-500/10 text-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-400",
    modal: "bg-emerald-500/10 text-emerald-400",
    label: "Safe",
  },
  CONDITIONAL: {
    icon: "bg-amber-500/10 text-amber-500",
    badge: "bg-amber-500/10 text-amber-400",
    modal: "bg-amber-500/10 text-amber-400",
    label: "Caution",
  },
  TUE_REQUIRED: {
    icon: "bg-amber-500/10 text-amber-500",
    badge: "bg-amber-500/10 text-amber-400",
    modal: "bg-amber-500/10 text-amber-400",
    label: "Caution",
  },
};

const CustomDetailModal = ({
  item,
  onClose,
}: {
  item: Substance | null;
  onClose: () => void;
}) => {
  if (!item) return null;
  const s = statusStyles[item.status];

  return (
    <div className="fixed inset-0 z-100 md:max-w-90 w-full mx-auto flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 h-screen rounded-[50px] bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md animate-in slide-in-from-bottom-10 bg-card border border-border/60 p-6 rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl">
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-muted sm:hidden" />

        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="outline"
                className="border-border text-muted-foreground"
              >
                {item.code}
              </Badge>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                {item.category}
              </span>
            </div>
            <h2 className="text-2xl font-black text-foreground leading-none">
              {item.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-muted/80 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className={cn(
            "mb-6 flex items-center gap-3 rounded-2xl p-4",
            s.modal,
          )}
        >
          {item.status === "BANNED" ? (
            <Ban className="h-6 w-6" />
          ) : item.status === "SAFE" ? (
            <CheckCircle2 className="h-6 w-6" />
          ) : (
            <AlertTriangle className="h-6 w-6" />
          )}
          <div>
            <p className="text-xs font-bold opacity-70 uppercase">
              Global Status
            </p>
            <p className="font-extrabold">{item.status.replace("_", " ")}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          {item.description}
        </p>

        <Button
          className="w-full rounded-xl h-12 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={onClose}
        >
          Understood
        </Button>
      </div>
    </div>
  );
};

export default function SubstanceDatabasePage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<Substance | null>(null);
  const itemsPerPage = 6;

  const filteredData = useMemo(() => {
    return SUBSTANCES.filter(
      (s) => activeFilter === "ALL" || s.code === activeFilter,
    );
  }, [activeFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div className="flex h-full w-full flex-col bg-background font-sans text-foreground">
      <div className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/60">
        <Header />
        <div className="px-4 pb-1 pt-1">
          <div className="relative mb-2 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search database..."
              className="rounded-2xl border-border/60 bg-card pl-10 h-10 text-sm font-semibold shadow-none focus-visible:ring-1 focus-visible:ring-primary/60 placeholder:text-muted-foreground/60 transition-all"
            />
          </div>

          <div
            className="
            flex gap-2 overflow-x-auto pb-2 -mx-4 px-4
            [&::-webkit-scrollbar]:h-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-border
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:hover:bg-muted-foreground/30
          "
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveFilter(cat.id);
                  setPage(1);
                }}
                className={cn(
                  "shrink-0 rounded-xl px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 border",
                  activeFilter === cat.id
                    ? "bg-foreground text-background border-foreground shadow-md -translate-y-0.5"
                    : "bg-card text-muted-foreground border-border/60 hover:border-border hover:bg-muted/50",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 w-full bg-background">
        <div className="p-4 pb-32 space-y-3">
          {currentData.map((item) => {
            const s = statusStyles[item.status];
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={cn(
                  "group relative flex items-center justify-between rounded-xl bg-card p-4 shadow-sm border border-border/60 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer overflow-hidden",
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors",
                      s.icon,
                    )}
                  >
                    <FlaskConical className="h-6 w-6" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="h-5 px-1.5 text-[10px] bg-muted text-muted-foreground font-bold border-0"
                      >
                        {item.code}
                      </Badge>
                      <span className="text-[11px] font-medium text-muted-foreground">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 pl-2">
                  <div
                    className={cn(
                      "px-2 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide",
                      s.badge,
                    )}
                  >
                    {s.label}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/40 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              </div>
            );
          })}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-6 pt-8 pb-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="h-11 w-11 rounded-full border-border/60 bg-card hover:bg-muted disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex flex-col items-center">
                <span className="text-sm font-black text-foreground">
                  Page {page}
                </span>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                  of {totalPages}
                </span>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="h-11 w-11 rounded-full border-border/60 bg-card hover:bg-muted disabled:opacity-30"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
        <BottomNav />
      </ScrollArea>

      <CustomDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
