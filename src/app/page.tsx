import Image from "next/image";
import { Inter } from "next/font/google";
import MessageInput from "@/components/message-input/message-input";
import MenuBar from "@/components/menu-bar/menu-bar";
import SidePanel from "@/components/side-panel/side-panel";
import MainPanel from "@/components/main-panel/main-panel";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top menu */}
      <MenuBar />
      {/* Main content */}
      <main className="flex-1 flex items-center justify-between p-2">
        <div className="flex-shrink-0 w-1/3 lg:w-1/4 h-full">
          {/* Sidebar */}
          <SidePanel />
        </div>
        <div className="flex-1 ml-2 h-full">
          {/* Main content */}
          <section className="flex items-center justify-center h-full">
            <div className="flex-1 h-full">
              <MainPanel />
              <MessageInput />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
