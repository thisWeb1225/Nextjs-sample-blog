import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from './header';
import Banner from './banner';
import About from './about';
import Project from './project';
import Posts from './posts';
import Footer from './footer';
import Post from '../pages/posts/[id]';

const name: string = 'this web'
export const siteTitle: string = 'Next.js Sample Website'

const Layout = ({ 
  children, home 
}: {
  children: React.ReactNode,
  home?: boolean
}) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico"/>
        <meta 
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle}/>
      </Head>

      <div className='px-2 sm:px-8 md:px-16 lg:px-32 bg-tw-dark text-tw-white'>
      <Header></Header>
      <Banner></Banner>
      <About></About>
      <Project></Project>
      <Posts></Posts>
      <Footer></Footer>
      </div>


      {/* <header className={styles.header}>
        {home ? (
          <>
            <Image 
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt="avatar"
            />
            <h1 className={utilStyles.heading2X1}>{name}</h1>
          </>
        ) : (
          <>
           <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt=""
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )} */}
    </>
  );
};

export default Layout;
