import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Clock, Eye, MessageSquare, Search } from "lucide-react";
import { useState } from "react";

interface Notification {
  id: number;
  type: "alert" | "info" | "message" | "reminder";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: "alert",
    title: "WADA Update",
    description: "Tramadol added to prohibited list effective Jan 1, 2026",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "reminder",
    title: "TUE Application",
    description: "Your asthma TUE expires in 30 days",
    timestamp: "4 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "Recovery Tips",
    description: "New foam rolling routine available",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: 4,
    type: "message",
    title: "Coach David",
    description: "Check out the new meal plan I sent",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: 5,
    type: "alert",
    title: "Scanning Alert",
    description: "Unknown supplement detected - review required",
    timestamp: "3 days ago",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  const handleMarkAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "alert":
        return "bg-red-100 text-red-700";
      case "info":
        return "bg-blue-100 text-blue-700";
      case "message":
        return "bg-purple-100 text-purple-700";
      case "reminder":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <Bell className="h-4 w-4" />;
      case "info":
        return <Eye className="h-4 w-4" />;
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      case "reminder":
        return <Clock className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  let filteredNotifications = notifications;

  if (selectedTab === "unread") {
    filteredNotifications = notifications.filter((n) => !n.read);
  }

  if (searchQuery) {
    filteredNotifications = filteredNotifications.filter(
      (n) =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative min-h-full bg-slate-50 font-sans text-slate-900 pb-28">
      <Header />

      <ScrollArea className="w-full h-[calc(100vh-80px)] flex-1">
        <div className="p-4 space-y-4">
          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
              <Search className="h-4 w-4" />
            </div>
            <Input
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white border-none shadow-sm rounded-full h-10 text-sm focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
            />
          </div>

          {/* Tabs */}
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 rounded-xl h-auto p-1 bg-white border border-slate-100">
              <TabsTrigger
                value="all"
                className="rounded-lg data-[state=active]:bg-blue-50"
              >
                All
                {unreadCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full font-bold">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="rounded-lg data-[state=active]:bg-blue-50"
              >
                Unread
                {unreadCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full font-bold">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3 mt-4">
              {unreadCount > 0 && (
                <Button
                  onClick={handleMarkAllAsRead}
                  variant="outline"
                  size="sm"
                  className="w-full rounded-lg border-slate-200 hover:border-blue-200 hover:bg-blue-50 text-xs"
                >
                  Mark all as read
                </Button>
              )}

              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">
                    {searchQuery
                      ? "No matching notifications"
                      : "No notifications"}
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleMarkAsRead(notification.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      notification.read
                        ? "bg-white border-slate-100 opacity-75"
                        : "bg-blue-50 border-blue-100 shadow-sm"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div
                          className={`p-2 rounded-lg shrink-0 ${getTypeColor(notification.type)}`}
                        >
                          {getTypeIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="text-sm font-bold text-slate-900 truncate">
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="h-2 w-2 rounded-full bg-blue-600 shrink-0"></div>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-2">
                            {notification.description}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {notification.timestamp}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(notification.id);
                        }}
                        className="text-slate-300 hover:text-red-500 transition-colors shrink-0"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>

            <TabsContent value="unread" className="space-y-3 mt-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">
                    No unread notifications
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="p-4 rounded-2xl border bg-white border-slate-100 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div
                          className={`p-2 rounded-lg shrink-0 ${getTypeColor(notification.type)}`}
                        >
                          {getTypeIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="text-sm font-bold text-slate-900 truncate">
                              {notification.title}
                            </h4>
                            <div className="h-2.5 w-2.5 rounded-full bg-blue-600 shrink-0"></div>
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-2">
                            {notification.description}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {notification.timestamp}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(notification.id);
                        }}
                        className="text-slate-300 hover:text-red-500 transition-colors shrink-0"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
}
