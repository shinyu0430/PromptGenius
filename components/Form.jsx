import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        讓我們將驚人的 Prompt 與世界分享！
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
           關於你的 Prompt
          </span>
          <input type="text" 
          value={post.title} 
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          placeholder="介紹你的 Prompt..."
          className='form_input'
          required/>
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            你的 AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='貼上你的 Prompt...'
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
           你的圖片(選填)
          </span>
          <input type="text" 
          value={post.url} 
          onChange={(e) => setPost({ ...post, url: e.target.value })}
          placeholder="貼上 URL"
          className='form_input'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            分類{" "}
            <span className='font-normal'>
              (ChatGPT, Midjourney, Clipdrop etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='Tag'
            required
            className='form_input'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            取消
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;