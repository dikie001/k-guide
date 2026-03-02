import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Lock,
  Search,
} from "lucide-react";
import { useState } from "react";

interface Resource {
  id: number;
  title: string;
  category: "guide" | "document" | "article" | "video";
  description: string;
  date: string;
  locked: boolean;
}

const RESOURCES: Resource[] = [
  {
    id: 1,
    title: "Complete WADA Code Guide 2026",
    category: "guide",
    description: "Comprehensive guide to the WADA Prohibited List and rules",
    date: "Updated Jan 2026",
    locked: false,
  },
  {
    id: 2,
    title: "TUE Application Checklist",
    category: "document",
    description: "Step-by-step checklist for submitting a TUE application",
    date: "Dec 2025",
    locked: false,
  },
  {
    id: 3,
    title: "Supplement Safety Database",
    category: "article",
    description: "Interactive database of common supplements and their status",
    date: "Oct 2025",
    locked: false,
  },
  {
    id: 4,
    title: "Anti-Doping Webinar Series",
    category: "video",
    description: "Expert-led webinars on anti-doping rules and compliance",
    date: "Nov 2025",
    locked: true,
  },
  {
    id: 5,
    title: "Athlete Rights & Responsibilities",
    category: "guide",
    description: "Know your rights and obligations as a tested athlete",
    date: "Sep 2025",
    locked: false,
  },
  {
    id: 6,
    title: "Sample Collection Process",
    category: "document",
    description:
      "Detailed explanation of in-competition and out-of-competition testing",
    date: "Aug 2025",
    locked: false,
  },
];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: "guide", label: "Guides" },
    { id: "document", label: "Documents" },
    { id: "article", label: "Articles" },
    { id: "video", label: "Videos" },
  ];

  let filteredResources = RESOURCES;

  if (selectedCategory) {
    filteredResources = filteredResources.filter(
      (r) => r.category === selectedCategory,
    );
  }

  if (searchQuery) {
    filteredResources = filteredResources.filter(
      (r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "guide":
        return "bg-blue-100 text-blue-700";
      case "document":
        return "bg-purple-100 text-purple-700";
      case "article":
        return "bg-green-100 text-green-700";
      case "video":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "guide":
        return <BookOpen className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      case "article":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <ExternalLink className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative min-h-full bg-slate-50 font-sans text-slate-900 pb-28">
      <Header />

      <ScrollArea className="w-full h-[calc(100vh-80px)] flex-1">
        <div className="p-4 space-y-6">
          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide px-1">
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setSelectedCategory(null)}
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                All
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Resources List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1 mb-3">
              <h3 className="text-sm font-bold text-slate-900">
                Results ({filteredResources.length})
              </h3>
            </div>

            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-400">
                  {searchQuery ? "No matching resources" : "No resources found"}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredResources.map((resource) => (
                  <div
                    key={resource.id}
                    className="p-4 bg-white rounded-2xl border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div
                        className={`p-2.5 rounded-lg shrink-0 ${getCategoryColor(resource.category)}`}
                      >
                        {getCategoryIcon(resource.category)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-sm font-bold text-slate-900 line-clamp-2">
                            {resource.title}
                          </h4>
                          {resource.locked && (
                            <Lock className="h-4 w-4 text-slate-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2 mb-2">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {resource.date}
                          </Badge>
                          <button className="text-slate-300 group-hover:text-blue-600 transition-colors">
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Resources */}
          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 space-y-3">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide">
              Quick Links
            </h4>
            <div className="space-y-2">
              <Button
                className="w-full justify-start rounded-lg bg-white text-slate-900 hover:bg-blue-100 border border-blue-200"
                variant="outline"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Official WADA Website
              </Button>
              <Button
                className="w-full justify-start rounded-lg bg-white text-slate-900 hover:bg-blue-100 border border-blue-200"
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Prohibited List
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
}
