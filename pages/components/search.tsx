import React, { useEffect } from 'react';
import styles from '../../styles/search.module.css';
import filterLogo from '../../public/filter.svg';
import searchLogo from '../../public/search.svg';
import Image from 'next/image'
import { useState } from 'react';
interface SearchProps {
    
    posts: (value: any) => null;
    setPosts: (value: any) => null;
  }

const Search: React.FC<SearchProps> = ({posts, setPosts}) => {
    const [entries, setEntries] = useState(posts);
    const [pageLoadEntries, setPageLoadEntries] = useState(posts);
    const [selectedAuthor, setSelectedAuthor] = useState('ALL');
    const uniqueAuthors = new Set();
    const uniquePosts = pageLoadEntries.filter(post => {
        const isDuplicate = uniqueAuthors.has(post.authorId);
        uniqueAuthors.add(post.authorId);
        return !isDuplicate;
    });
    const handleSearch = (e:any) => {
      const value = e.target.value;
      console.log('value is ', value);
      console.log('pageLoadEntries is ', pageLoadEntries);
      if (value === "") {
        setPosts(pageLoadEntries);
      } else {
          const filteredEntries = pageLoadEntries.filter(item => `${item.title.toLowerCase()}`.includes(value.toLowerCase())
          );
          setPosts(filteredEntries);
      }
  }
  const handleAuthorFilter =  (e:any) =>{
    const value = selectedAuthor
    console.log('selectedAuthor is ', selectedAuthor);
    if (value === "ALL") {
        setPosts(pageLoadEntries);
      } else {
          const filteredEntries = pageLoadEntries.filter(item => item.authorId ==  value
          );
          setPosts(filteredEntries);
      }
  }
  useEffect(handleAuthorFilter,[selectedAuthor] )
    return (
        <div className={styles.container}>
            <div className={styles.searchInput}>

                <Image
                    priority
                    src={searchLogo}
                    alt="search logo"
                    className={styles.searchIcon}
                />
                <input type="text" placeholder="Search" onChange={handleSearch}/>
            </div>
            <div className={styles.filterButton}>


                <Image
                    priority
                    src={filterLogo}
                    alt="filter logo"
                    className={styles.filterIcon}
                />
                {/* <span>Filter</span> */}
                <select onChange={(e) => setSelectedAuthor(e.target.value)} value={selectedAuthor}>
                <option key={'all'} value={'ALL'}>ALL</option>
                    {
                        uniquePosts.length > 0 && uniquePosts.map( (post) =><>
                         <option key={post.authorId} value={post.authorId}>{post['User.name']}</option>
                        </> )
                    }
                
                </select>
            </div>
        </div>
    );
};

export default Search;
