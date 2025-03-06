import { useState, useRef} from "react";
import { useBlogStore } from "../stores/useBlogStore";
import { Editor } from "@tinymce/tinymce-react";


const CreateBlogPage = () => {
  const {isCreatingBlog, addBlog} = useBlogStore();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState();
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const blogData = { title, content};
    console.log(blogData);
    await addBlog(blogData);
  };

  if(isCreatingBlog){
    return <h1>Adding Blog, wait for a while...</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-5 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-3">Post Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-3">Post Content</label>
          <Editor 
           apiKey="myjj8iymxg6y5rj4b996n0vuak7utowkf1snqnk5huqr5i11"
           textareaName = "content"
           initalValue = "Write your Blog here"
           onEditorChange = {(newText) => setContent(newText)}
          />
        </div>
        {/*<div className="mb-4">
          <label className="block text-gray-700 mb-3">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
        </div> */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
