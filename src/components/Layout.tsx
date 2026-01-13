import React, { ReactNode } from "react";

interface SidebarItemProps {
  icon: string;
  label: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active }) => (
  <div
    className={`
    flex items-center gap-3 px-4 py-3 mx-2 my-1 rounded-lg cursor-pointer transition-all duration-200
    ${active ? "bg-accent text-white font-semibold" : "bg-transparent text-gray-500 hover:bg-gray-100 font-medium"}
  `}
  >
    <span>{icon}</span>
    <span>{label}</span>
  </div>
);

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-[260px] bg-card border-r border-gray-200 flex flex-col py-6">
        <div className="px-6 pb-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white font-bold">
            B
          </div>
          <span className="text-xl font-bold font-title text-gray-800">
            Brazil Shuttle
          </span>
        </div>

        <nav className="flex-1">
          <SidebarItem icon="🏠" label="Home" active />
          <SidebarItem icon="✈️" label="Flights" />
          <SidebarItem icon="📊" label="Analytics" />
          <SidebarItem icon="💰" label="Wallet" />
        </nav>

        <div className="p-6">
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
            <p className="mb-2 text-sm font-semibold text-orange-800">
              Premium Features
            </p>
            <p className="m-0 text-xs text-orange-700">
              Unlock advanced price tracking.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 flex items-center justify-end px-8 bg-transparent">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-700">Hello, Customer</span>
            <div
              className="w-10 h-10 rounded-full bg-gray-300 bg-cover bg-center ring-2 ring-white shadow-sm"
              style={{
                backgroundImage: "url(https://i.pravatar.cc/150?img=12)",
              }}
            ></div>
          </div>
        </header>

        <main className="flex-1 px-8 pb-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
