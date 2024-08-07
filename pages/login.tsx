import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from './components/header'
import style from '../styles/login.module.css'
import Link from 'next/link'
import { toast } from 'react-toastify';
import Image from 'next/image';
import heroBannerUrl from '../public/hero-banner.png';
import {updateLoggedInData, baseURL} from './utils/const'
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/login`, {
        email,
        password,
      });
      if(response.data.error){
        toast.error(response.data.msg, {position: "top-center",});
      } else {
        toast.success('welcome back!', {position: "top-center",});
        updateLoggedInData(response.data.data)
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('some error occured', {position: "top-center",});
    }
  };

  return (
    <>
      <Header />

      <div className="container">

        <div className="row">
          <div className="col-12 col-sm-6">
            <h1 className={style.header}>Login</h1>
            <div className={style.form}>
              <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.inputGroup}>
                  <span className={style.icon}>@</span>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={style.inputGroup}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className={`${style.icon} ${style.passwordIcon}`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    👁
                  </span>
                </div>
                <button className={style.button} type="submit">Login</button>
                <div className='mt-2 mb-2 text-center fw-bolder' > OR</div>
                <button className={style.buttonSecondary + ' mt-4'} onClick={ () => router.push('/signup')}>Signup</button>
               
              </form>
             
            </div>
          </div>
          <div className="col-12 col-sm-6 d-flex justify-content-center align-items-center text-center mt-5 mt-sm-0">
           
            <Image
                        priority
                        src={heroBannerUrl}
                        alt="company logo"
                    />

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
