import Head from 'next/head';
import { PostCard, Categories, PostWidget, FeaturedPostCard } from '../components';
import { getPosts } from '../services';
import { FeaturedPosts } from '../sections/index';

export default function Home({posts}: {posts:any}) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
         <FeaturedPosts />
     <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10'>
         
         {/* leftside */}
         <div className="lg:col-span-8 col-span-1">
            {posts.map((post : any, index : any) => (
              <PostCard key={index} post={post.node} />
            ))}
           
        </div>

        {/* rightside */}
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget categories={undefined} slug={undefined}/>
            <Categories />
          </div>
        </div>
      </div>

    </div>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}
