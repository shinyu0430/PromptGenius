"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import Tag from "./Tag"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const TagList = ({ data, handleTagClick }) => {
  return (
    <div className="bg-gray-300 p-5 bg-opacity-25">
      {
        data.map((tag) => (
          <Tag 
          text={tag} 
          handleTagClick={handleTagClick} 
          key={tag} />
        ))
      }
    </div>
  )
}

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);


  const tag_list = ["ChatGPT", "Midjourney", "Clipdrop"];

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
    console.log(tagName)
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
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
        />
      ) : (
        <PromptCardList 
        data={allPosts} 
        handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;