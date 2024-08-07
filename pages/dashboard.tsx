import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import withAuth from './components/withAuth';
import Header from './components/header'
import style from '../styles/index.module.css';
import SearchFilter from './components/search';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import AddPostModal from './components/addPostModal';
import {getHeader, getUserId, baseURL, calculateDifference, getUserToken} from './utils/const'

const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const currentUserId = getUserId();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const[blogTitle, setBlogTitle] = useState('');
  const[blogContent, setBlogContent] = useState('');


  useEffect(() => {
    // Check authentication
    const token = getUserToken();
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
      // Fetch user's posts
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let relativeUrl = '/post'
    const response = await axios.post(baseURL+ relativeUrl, {
        title: blogTitle,
        content: blogContent
      }, {
        headers: getHeader()
      });
     if(response.statusText == 'OK'){
        router.push('/dashboard');
        setIsModalOpen(false);
        setBlogTitle('')
        setBlogContent('')
     }
     
  };
  useEffect(() => {
    (async function () {
      let relativeUrl = '/posts'
      if (currentUserId) {
        relativeUrl += `?authorId=${currentUserId}`
      }
      const response = await axios.get(baseURL + relativeUrl);
      setPosts( ()=>  response.data.data);

    })()

  }, [isModalOpen])

  if (!isAuthenticated) {
    return <p>Loading...</p>;
  }

  return (
    <>
     <Header  setIsOpen={setIsModalOpen}/>
    <div className='row'>
      <div className='col-12'>

      <AddPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        setBlogTitle={setBlogTitle}
        setBlogContent={setBlogContent}
      />
       </div>
    
    { posts.length >0 && <div className='col-12'>

    <div className={style.headerAndSearch}>
        <p className={style.title} >{'Welcome to swades.ai - Building AI in India for the world'}</p>
        <SearchFilter posts={posts} setPosts={setPosts}/>
        <h2></h2>

      </div>
      <div className={`${style.title} + ' row'`} >{'Your Blog Posts'}</div>
      <div className='container'>
        <div className='row justify-content-between card-columns blog-container text-white'>
          {posts && posts.map((post, key) => (
            <div key={post.id} className={'card text-body mb-3 '} style={{ maxWidth: '25rem', backgroundColor: '#1D5E6D' }}>
              <div className='card-body text-white'>
                <h5 className="card-title text-white">{post.title}</h5>
                <p className="card-text">{post.content}</p>

                <div className='row'>
                  <div className='col-9'>
                    <p className={'card-text text-white text-left '  + style.lastUpdatedMsg}> Last updated {calculateDifference(post.createdAt)} ago</p> </div>
                  <div className='col-3'>  <a href="#" className={'btn btn-primary ' + style.shareButton}>Share</a>  </div>
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>
    </div> }
    </div> 
    </>
  );
};



export default withAuth(Dashboard);
