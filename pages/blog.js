import fs from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';

export async function getStaticProps() {
  const files = fs.readdirSync('posts');

  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`posts/${fileName}`, 'utf-8');
    const { data: frontmatter } = matter(readFile);
    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  let blog_posts = []
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].frontmatter.tags.includes('TIL') == false) {
      blog_posts.push(posts[i])
    }
  }
  return (
    <div className=''>
      <div className=''>HEADER</div>
      {blog_posts.map(({ slug, frontmatter }) => (
        <div
          key={slug}
          className='overflow-hidden flex flex-col'
        >
          <Link href={`/post/${slug}`}>
          <a>
            <div className='flex'>
              <div className='pt-7 flex-none w-325 h-170'><Image
                width={350}
                height={200}
                alt={frontmatter.title}
                src={`/${frontmatter.socialImage}`}
              /></div>
              
              
              <div className='text-left flex-auto p-2 pl-9'>
                <div className='flex py-4'><h1 className='text-2xl font-bold underline decoration-main'>{frontmatter.title}</h1>
              <div className='text-xl ml-6 mt-0.5 px-3 bg-gray-200 rounded-md'>{frontmatter.date}</div></div>
              
              <p className='text-lg'>{frontmatter.summary}</p>
              <div className='flex pt-5'>{frontmatter.tags.map((tag)=>(<div className='flex-none px-2 mr-2 bg-main-light font-bold rounded-md'>{tag}</div>))}</div>
              </div>
              
            
              </div>
            </a>
            
          </Link>
        </div>
      ))}
    </div>
  );
}
