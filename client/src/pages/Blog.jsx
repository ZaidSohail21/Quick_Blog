import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets';
import Moment from 'moment';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext()
  const [data, setdata] = useState(null)
  const [comment, setcomment] = useState([])
  const [name, setname] = useState('')
  const [content, setcontent] = useState('')

  const fetchdata = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`)
      console.log("Fetched blog data:", data);
      data.success ? setdata(data.blog) : toast.error(data.message)
      data.success ? toast.success("Blog Fetched Successfully") : toast.error("Blog Not Found");  
    } catch (error) {
      toast.error(error.message)
    }
  }

  
const fetchcomment = async () => {
  try {
    const { data } = await axios.post(`/api/blog/comment`, { blogId: id });
    if (data.success) {
      setcomment(data.comments);
      toast.success("Comments fetched successfully");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  const addComment = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(`/api/blog/add-comment`, { blog: id, name, content });
    if (data.success) {
      toast.success(data.message);
      fetchcomment(); // reload comments after adding
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  useEffect(() => {
    fetchdata();
    fetchcomment();
  }, [])
  return data ? (
    <div className='relative'>
      <img src={assets.gradientBackground} className='absolute -top-50 -z-1 opacity-50' />

      <Navbar />

      <div className='text-center mt-20 text-gray-600'>
        <p className='text-primary py-4 font-medium'>
          Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto 
        text-gray-800'>{data.title}</h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 
        bg-primary/5 font-medium text-primary '>Micheal Brown</p>
      </div>
      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} className='rounded-3xl mb-5' />
        <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{ __html: data.description }} ></div>
        {/* Comment Section  */}
        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
          <p className='font-semibold mb-4' >Comments ({comment.length})</p>
          <div className='flex flex-col gap-4'>
            {comment.map((item, index) => (
              <div key={index} className='relative bg-primary/2 border border-primary/5 
              max-w-xl p-4 rounded text-gray-600 '>
                <div className='flex items-center gap-2 mb-2'>
                  <img src={assets.user_icon} className='w-6' />
                  <p className='font-medium'>{item.name}</p>
                </div>
                <p className='text-sm max-w-md ml-8'>{item.content}</p>
                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}

          </div>
        </div>
        {/* Comment Section  */}
        <div className='max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Add your comments</p>
          <form onSubmit={addComment}>
            <input value={name} onChange={(e) => setname(e.target.value)} type="text" placeholder='Name' required className='w-full p-2 border border-gray-300 rounded outline-none' />

            <textarea value={content} onChange={(e) => setcontent(e.target.value)} placeholder='Comment...' className='w-full p-2 border border-gray-300  rounded outline-none h-48'></textarea>

            <button type='submit' className='bg-primary text-white rounded p-2 px-8  hover:scale-102 transition-all cursor-pointer'>Submit</button>
          </form>
        </div>
        {/* Share Buttons  */}
        <div className='my-24 max-x-3xl mx-auto'>
          <p className='font-semibold my-4'>Share this article on social media</p>
          <div className='flex'>
            <img src={assets.facebook_icon} width={50} alt="" />
            <img src={assets.twitter_icon} width={50} alt="" />
            <img src={assets.googleplus_icon} width={50} alt="" />
          </div>
        </div>
      </div>
      < Footer />
    </div>
  ) : <Loader />;
}



export default Blog
