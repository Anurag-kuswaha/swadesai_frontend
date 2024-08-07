import { GetServerSideProps } from 'next';
import axios from 'axios';
import Header from './components/header'
import style from '../styles/index.module.css';
import { calculateDifference } from './utils/const';
import SearchFilter from './components/search';

import { useState } from 'react';
interface BlogPost {
  id: number;
  title: string;
  content: string;
  createdAt: string
}

interface HomeProps {
  posts: BlogPost[];
}

const Home: React.FC<HomeProps> = ({ postsProps }) => {
  const[posts, setPosts] = useState(postsProps)

  return (
    <>
      <Header />

      <div className={style.headerAndSearch}>
        <p className={style.title} >{'Welcome to swades.ai - Building AI in India for the world'}</p>
        <SearchFilter posts={posts} setPosts={setPosts}/>
      </div>
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get('http://localhost:3001/posts');
  return { props: { postsProps: response.data.data } };
};

export default Home;
