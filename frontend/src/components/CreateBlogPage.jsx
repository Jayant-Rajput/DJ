import { useState, useRef, useEffect} from "react";
import { useBlogStore } from "../stores/useBlogStore";
import { Editor } from "@tinymce/tinymce-react";
import { useChatStore } from "../stores/useChatStore";


const CreateBlogPage = () => {


  const {messages, subscribeToMessage, unsubscribeToMessage} = useChatStore();
  
  useEffect(() => {
    subscribeToMessage();
    return () => unsubscribeToMessage();
  }, [messages]);

  const {isCreatingBlog, addBlog} = useBlogStore();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState();
  const [image, setImage] = useState(null);
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    if (content) {
      console.log("Image updated:", content);
    }
  }, [content]);

  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    
    if (image) {
      formData.append("image", image); // This field name should match what multer expects.
    }
    
    console.log("FormData ready for submission.");
    await addBlog(formData);
  };

  if(isCreatingBlog){
    return <h1>Adding Blog, wait for a while...</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-5 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl text-blue-500 font-bold mb-4">Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-3">Post Title</label>
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-3">Post Content</label>
          <Editor 
           apiKey="myjj8iymxg6y5rj4b996n0vuak7utowkf1snqnk5huqr5i11"
           textareaName = "content"
           init={{
            placeholder: "Write your content here"
           }}
           onEditorChange = {(newText) => setContent(newText)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-3">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={handleFileUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Upload
          </button>
          <p className="mt-2 text-gray-600">
            {image ? `Selected: ${image.name}` : "No image selected"}
          </p>
        </div>
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
