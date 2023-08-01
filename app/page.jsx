"use client"

import Feed from '@components/Feed';
import { useState } from 'react';
import Sidebar from '@components/Sidebar';
const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
    <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center max-sm:text-xl">
        Discover & Share
        <br></br>
        <span className="orange_gradient text-center max-sm:text-lg">AI-powered Prompts</span>
      </h1>
      <p className="desc text-center">
        PromptGenius 是一個 AI Prompting 工具，希望可以讓大家發現、創造和分享創意的 Prompt。
      </p>
      <Feed />
    </section>
    </>
  )
}

export default Home