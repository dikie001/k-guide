import React, { useState } from "react";
import {
  Search,
  MoreVertical,
  Camera,
  MessageSquare,
  Crown,
  X,
  Users,
  Megaphone,
} from "lucide-react";
import BottomNav from "@/components/shared/BottomNav";

// --- Types ---
interface Chat {
  id: string;
  name: string;
  role?: string;
  message: string;
  meta: string;
  metaColor?: string;
  isOnline?: boolean;
  avatarType: "image" | "icon";
  avatarSrc?: string;
  icon?: React.ReactNode;
}

// --- Mock Data ---
const chats: Chat[] = [
  {
    id: "1",
    name: "Dr. Kipchoge",
    role: "(Sports Physio)",
    message: "Available for consultations.",
    meta: "online",
    metaColor: "text-emerald-500",
    isOnline: true,
    avatarType: "image",
    avatarSrc: "https://i.pravatar.cc/150?u=kipchoge",
  },
  {
    id: "2",
    name: "Coach David",
    role: "(Nutritionist)",
    message: "New meal plans are ready.",
    meta: "Pinned",
    metaColor: "text-muted-foreground",
    avatarType: "image",
    avatarSrc: "https://i.pravatar.cc/150?u=david",
  },
  {
    id: "3",
    name: "Dr. Amina",
    role: "(Doping Expert)",
    message: "Reminder: Check the new WADA list.",
    meta: "Pinned",
    metaColor: "text-muted-foreground",
    avatarType: "image",
    avatarSrc: "https://i.pravatar.cc/150?u=amina",
  },
  {
    id: "4",
    name: "Iten Marathoners Group",
    message: "Eliud: Anyone going for a long run tomorrow?",
    meta: "Last now",
    metaColor: "text-muted-foreground",
    avatarType: "icon",
    icon: <Users className="text-primary w-6 h-6" />,
  },
  {
    id: "5",
    name: "Elite Women's Team",
    message: "Faith: Great session today ladies!",
    meta: "",
    avatarType: "image",
    avatarSrc: "https://i.pravatar.cc/150?u=elite",
  },
  {
    id: "6",
    name: "K-Guide Announcements",
    message: "New app update available with improved scanner.",
    meta: "Official",
    metaColor: "text-muted-foreground",
    avatarType: "icon",
    icon: <Megaphone className="text-primary w-6 h-6" />,
  },
  {
    id: "7",
    name: "John Korir",
    message: "John Korir",
    meta: "22 mins",
    metaColor: "text-muted-foreground",
    avatarType: "image",
    avatarSrc: "https://i.pravatar.cc/150?u=john",
  },
];

export default function Support() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const handleChatClick = (chat: Chat) => {
    setSelectedChat(chat);
    setIsModalOpen(true);
  };

  return (
    <div className="flex items-center justify-center">
      {/* Mobile App Container */}
      <div className="w-full min-h-screen bg-background font-sans rounded-3xl overflow-hidden -mt-14 flex flex-col border border-border/60">
        {/* Header Section */}
        <header className="bg-card text-foreground pb-0 flex flex-col border-b border-border/60 z-10">
          <div className="flex justify-between items-center px-4 py-4">
            <h1 className="text-xl font-semibold tracking-wide text-foreground">
              K-Guide Support
            </h1>
            <div className="flex space-x-4 text-muted-foreground">
              <Search className="w-5 h-5 cursor-pointer hover:text-foreground transition-colors" />
              <MoreVertical className="w-5 h-5 cursor-pointer hover:text-foreground transition-colors" />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center text-sm font-medium">
            <div className="px-4 py-3 text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
              <Camera className="w-5 h-5" />
            </div>
            <div className="flex-1 text-center py-3 border-b-2 border-primary text-primary cursor-pointer uppercase tracking-wider text-xs font-bold">
              Chats
            </div>
            <div className="flex-1 text-center py-3 text-muted-foreground cursor-pointer hover:text-foreground transition-colors uppercase tracking-wider text-xs font-bold">
              Status
            </div>
            <div className="flex-1 text-center py-3 text-muted-foreground cursor-pointer hover:text-foreground transition-colors uppercase tracking-wider text-xs font-bold">
              Calls
            </div>
          </div>
        </header>

        {/* Chat List */}
        <main className="flex-1 overflow-y-auto bg-background [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatClick(chat)}
              className="flex items-center px-4 py-3 cursor-pointer hover:bg-card active:bg-muted transition-colors group"
            >
              {/* Avatar */}
              <div className="relative mr-4 shrink-0">
                {chat.avatarType === "image" ? (
                  <img
                    src={chat.avatarSrc}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover bg-muted"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {chat.icon}
                  </div>
                )}
                {chat.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-background rounded-full" />
                )}
              </div>

              {/* Chat Content */}
              <div className="flex-1 min-w-0 border-b border-border/40 pb-3 group-last:border-none">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h2 className="text-[15px] font-semibold text-foreground truncate">
                    {chat.name}{" "}
                    <span className="text-muted-foreground font-normal text-[13px]">
                      {chat.role}
                    </span>
                  </h2>
                  <span className={`text-xs ml-2 shrink-0 ${chat.metaColor}`}>
                    {chat.meta}
                  </span>
                </div>
                <p className="text-[13px] text-muted-foreground truncate">
                  {chat.message}
                </p>
              </div>
            </div>
          ))}
        </main>

        <BottomNav />

        {/* Floating Action Button */}
        <button className="absolute bottom-6 right-6 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors z-10 text-primary-foreground">
          <MessageSquare className="w-6 h-6 fill-current" />
        </button>

        {/* Premium Modal */}
        {isModalOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-[90%] bg-card border border-border/60 rounded-2xl shadow-2xl p-6 transform transition-all text-center overflow-hidden">
              {/* Decorative Glow */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-300 to-amber-600 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                <Crown className="w-8 h-8 text-background" />
              </div>

              {/* Text */}
              <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
                Unlock <span className="text-amber-400">Premium</span>
              </h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Subscribe to connect directly with{" "}
                <strong className="text-foreground">
                  {selectedChat?.name}
                </strong>
                . Get exclusive meal plans, 1-on-1 consultations, and ad-free
                access.
              </p>

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-background font-bold rounded-xl transition-all shadow-[0_4px_14px_rgba(245,158,11,0.2)] hover:-translate-y-0.5">
                  Upgrade Now
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-3 px-4 bg-transparent border border-border/60 text-muted-foreground hover:bg-muted hover:text-foreground font-medium rounded-xl transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
