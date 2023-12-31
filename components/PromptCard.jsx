"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick, handleCopyClick, copied }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  // const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  // const handleCopy = () => {
  //   setCopied(post.prompt);
  //   // 瀏覽器原生的 navigator.clipboard.write() API
  //   navigator.clipboard.writeText(post.prompt);
  //   setTimeout(() => setCopied(false), 3000);
  // };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={()=>handleCopyClick(post)}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-lg text-gray-900 font-bold'>
        {post.title}
      </p>
      <div>
        {post.url && (
                  <img src={post.url} alt="" style={{ width:'35%',float: 'left',marginRight: '10px' }} />
        )}
        <span>Prompt:</span>
        <p style={{ textAlign: 'justify' }} className='my-2 font-satoshi text-sm text-gray-700'>
          {post.prompt}
        </p>
      </div>
      <div style={{clear:"both"}}></div>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer mt-2'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <button
            className='font-inter text-sm green_gradient border border-gray-300 rounded-xl cursor-pointer px-3 py-1 hover:green'
            onClick={handleEdit}
          >
            編輯
          </button>
          <button
            className='font-inter text-sm orange_gradient border border-gray-300 rounded-xl cursor-pointer px-3 py-1 '
            onClick={handleDelete}
          >
            刪除
          </button>
        </div>
      )}
      
    </div>
  );
};

export default PromptCard;