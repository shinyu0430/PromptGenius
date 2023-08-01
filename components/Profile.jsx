"use client";
import PromptCard from "./PromptCard";
import { useState } from "react";
import Toast from "./Toast"

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");

  const handleCopyClick = (post) => {
    setCopied(post.prompt);
    // 瀏覽器原生的 navigator.clipboard.write() API
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name}</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout '>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            copied={copied}
            handleCopyClick={handleCopyClick}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
      <Toast message="Prompt 複製成功" show={copied} />
    </section>
  );
};

export default Profile;