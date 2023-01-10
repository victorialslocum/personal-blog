import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";

export async function getStaticProps() {
  const files = fs.readdirSync("posts");

  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
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
  let blog_posts = [];
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].frontmatter.tags.includes("TIL") == false) {
      blog_posts.push(posts[i]);
    }
  }
  return (
    <div>
      <div className="container mx-auto md:px-20 lg:px-40 mb-10 items-center">
        <div className="md:flex items-center p-10">
          <div className="md:flex-none w-250 h-350">
            <h1 className="text-7xl font-bold text-center pb-3">🌻</h1>
          </div>

          <div className="text-center md:text-left flex-1 md:pl-10">
            <h1 className="text-4xl pb-3 font-bold">Hello! I'm Victoria</h1>

            <p className="text-md">
              I'm currently helping to expand and educate the community
              around spaCy and other developer tools with Explosion. I'm kind of
              obsessed with natural language processing and working on
              cool projects that challenge my understanding of the world.
              Welcome to my learnings and doings!
            </p>
          </div>
        </div>
        <hr></hr>
        {/* <div className="text-center pt-10 pb-5">
        <h2 className="text-xl font-bold">Welcome to my blog!</h2>
        <h2 className="text-lg">Some recent posts 🔽</h2>
        </div> */}
      </div>
      {blog_posts.slice(0, 5).map(({ slug, frontmatter }) => (
        <div key={slug} className="overflow-hidden flex flex-col pb-10">
          
            <div className="md:flex">
              <Link href={`/post/${slug}`}>
              <a className="md:pt-7 flex-none items-center justify-center">
                
                  <div className="justify-center w-350 h-200">
                    <Image
                      width={350}
                      height={200}
                      alt={frontmatter.title}
                      src={`/${frontmatter.socialImage}`}
                    />
                  </div>
                
                </a>
              </Link>
              <div className="text-left flex-auto p-2 pl-9">
                <Link href={`/post/${slug}`}>
                  <a>
                  <div className="flex py-4">
                    <h1 className="text-2xl font-bold underline decoration-main">
                      {frontmatter.title}
                    </h1>
                    <div className="flex-none text-xl ml-6 mt-0.5 px-3 bg-gray-200 rounded-md">
                      {frontmatter.date}
                    </div>
                  </div>
                  </a>
                </Link>
                <p className="text-lg pr-5">{frontmatter.summary}</p>
                <div className="flex pt-5">
                  {frontmatter.tags.map((tag) => (
                    <div className="flex-none px-2 mr-2 bg-main-light rounded-md">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
        
        </div>
      ))}
      <Link href={"/blog"}>
        <div className="text-center pb-5">
          <button>
            <h2 className="text-lg font-bold hover:underline decoration-main">
              Read more posts
            </h2>
            <h2 className="text-xl">🔽</h2>
          </button>
        </div>
      </Link>
    </div>
  );
}
