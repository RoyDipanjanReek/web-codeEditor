import { SidebarProvider } from "@/components/ui/sidebar";
import { getAllPlaygroundForUser } from "@/modules/dashboard/actions";
import { DashboardSidebar } from "@/modules/dashboard/components/dashboard-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const playgoundData = await getAllPlaygroundForUser();
  console.log(playgoundData);

  const technologyIconMap: Record<string, string> = {
    REACT: "Zap",
    NEXTJS: "Lightbulb",
    EXPRESS: "Database",
    VUE: "Compass",
    HONO: "FlameIcon",
    ANGULAR: "Terminal",
  };

  const formatedPlaygroundData = playgoundData?.map((item) => ({
    id: item.id,
    name: item.title,
    starred: false,
    icon: technologyIconMap[item.template] || "Code2",
  }));

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        {/* DashBoard Layout  */}
        {/* @ts-ignore */}
        <DashboardSidebar initialPlaygroundData={formatedPlaygroundData} />
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}
