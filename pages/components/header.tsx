import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import logoUrl from '../../public/swades-logo.svg';
import { usePathname } from 'next/navigation'

interface Link {
    title: string;
    link: string;
}

interface LinkProps {
    isActive: boolean;
}



const link = 'link-class';
interface HeaderProps {
    
    setIsOpen: (value: any) => null;
  }

const Header: React.FC<HeaderProps> = ({
    setIsOpen
}) => {
    const [links, setLinks]= useState([
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Login', link: '/login' },
    ]);
    const pathname = usePathname()
    useEffect(() =>{
        if(pathname =='/dashboard'){
            setLinks( () => [
                { title: 'Dashboard', link: '/dashboard' },
                { title: 'Logout', link: '/' },
            ])
        }
    },[pathname])
    return (
        <div className='wrapperContainer'>
            <div className='wrapper'>
                <Link href='/'>
                    <Image
                        priority
                        src={logoUrl}
                        alt="company logo"
                    />
                </Link>
                <div className='linksAndUser'>

                { pathname== '/dashboard' &&
                    <button type="button" className="btn btn-primary" onClick={() => setIsOpen(true)} style={{
                        backgroundColor:'#1D5E6D',
                        borderColor:'#1D5E6D'
                    }}>Add Post</button>
                }
                
                    <div className='links'>
                        {links.map((element, index) => (
                            <Link
                                key={index}
                                className='link'
                                href={element.link}
                            >
                                {element.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
