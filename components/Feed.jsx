"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import Toast from "./Toast"
import Tag from "./Tag"



const PromptCardList = ({ data, handleTagClick, handleCopyClick, copied }) => {
  return (

    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleCopyClick={handleCopyClick}
          copied={copied}
        />
      ))}
    </div>
  );
};

const TagList = ({ data, handleTagClick }) => {
  return (
    <div className="p-5 overflow-x-auto hideScroll">
      <div className="flex space-x-2 align-start">
        {
          data.map((tag) => (
            <Tag
              text={tag}
              handleTagClick={handleTagClick}
              key={tag} />
          ))
        }
      </div>
    </div>
  )
}

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [copied, setCopied] = useState("");

  const tag_list = ["ChatGPT", "Midjourney", "Clipdrop", "Magenta", "Claude", "Bard AI", "Image Creator"];

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  const handleCopyClick = (post) => {
    console.log("Test")
    setCopied(post.prompt);
    // 瀏覽器原生的 navigator.clipboard.write() API
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className='feed'>
      {/* Search */}
      <form className='relative w-full flex-col'>
        <div className="">
          <input
            type='text'
            placeholder='透過關鍵字或使用者名稱搜尋'
            value={searchText}
            onChange={handleSearchChange}
            required
            className='search_input peer'
          />
        </div>

        <TagList
          data={tag_list}
          handleTagClick={handleTagClick}
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
          handleCopyClick={handleCopyClick}
          copied={copied}
        />
      ) : (
        <PromptCardList
          data={allPosts}
          handleTagClick={handleTagClick}
          handleCopyClick={handleCopyClick}
          copied={copied}
        />
      )}
      <Toast message="Prompt 複製成功" show={copied} />
      {/* <Toast message="Prompt 複製成功" show={true}/> */}
    </section>
  );
};

export default Feed;