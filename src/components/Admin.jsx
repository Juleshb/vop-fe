import React, { useState } from "react";
import Logo from '../assets/logo.png'
import AlbumManager from "./Adomin/album";
import SongManager from "./Adomin/songs";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("General");

  const renderContent = () => {
    switch (activeTab) {
      case "General":
        return <div>General Content</div>;
      case "Albums":
        return <div><AlbumManager /></div>;
      case "Songs":
        return <div><SongManager /></div>;
      case "Gallery":
        return <div>Gallery Content</div>;
      case "Events":
            return <div>Event Content</div>;
      case "Account":
        return <div>Account Content</div>;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="flex h-screen font-Poppins">
      {/* Sidebar */}
      <div className="flex h-full flex-col bg-white border-r shadow-md xs:w-16 sm:w-20 md:w-64 transition-all">
        {/* Header */}
        <div className="flex flex-col items-center py-4">
  <img
    src={Logo}
    className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
    alt="Logo"
  />
</div>


        {/* Navigation */}
        <ul className="space-y-1 flex-grow">
          {["General", "Albums", "Songs", "Gallery","Events", "Account"].map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-Teal text-white"
                    : "text-gray hover:bg-HummingBird hover:text-gray-900"
                }`}
              >
                {/* Icon */}
                <span className="material-icons hidden xxs:block">
                  {tab === "General" && "dashboard"}
                  {tab === "Albums" && "album"}
                  {tab === "Songs" && "audiotrack"}
                  {tab === "Gallery" && "photo"}
                  {tab === "Events" && "event"}
                  {tab === "Account" && "account_circle"}
                </span>
                {/* Label */}
                <span className="hidden sm:block">{tab}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <button className="w-full mt-auto flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray hover:bg-Solitude hover:text-gray-900">
          <span className="material-icons">logout</span>
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 bg-Solitude overflow-auto">
        <div className="p-6 bg-white rounded-lg shadow-md">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
