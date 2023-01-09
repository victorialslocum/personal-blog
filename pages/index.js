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
      <div className="container mx-auto px-40 mb-10">
      
        <div className="flex items-center p-10">
          <div className="flex-none w-250 h-350">
          <h1 className="text-7xl font-bold">🌻</h1>
          </div>

          <div className="text-left flex-1 pl-10">
            <h1 className="text-4xl pb-3 font-bold">Hello! I'm Victoria</h1>
            
            <p className="text-md">
              I'm currently helping to expand and educate the community
              around spaCy and other developer
              tools with Explosion. I'm kind of
              obsessed with natural language
              processing
              and working on cool projects that challenge my understanding of
              the world. Welcome to my learnings and doings!
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
        <div key={slug} className="overflow-hidden flex flex-col">
          <Link href={`/post/${slug}`}>
            <a>
              <div className="flex">
                <div className="pt-7 flex-none w-350 h-200">
                  <Image
                    width={350}
                    height={200}
                    alt={frontmatter.title}
                    src={`/${frontmatter.socialImage}`}
                  />
                </div>

                <div className="text-left flex-auto p-2 pl-9">
                  <div className="flex py-4">
                    <h1 className="text-2xl font-bold underline decoration-main">
                      {frontmatter.title}
                    </h1>
                    <div className="text-xl ml-6 mt-0.5 px-3 bg-gray-200 rounded-md">
                      {frontmatter.date}
                    </div>
                  </div>

                  <p className="text-lg">{frontmatter.summary}</p>
                  <div className="flex pt-5">
                    {frontmatter.tags.map((tag) => (
                      <div className="flex-none px-2 mr-2 bg-main-light rounded-md">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          </Link>
        </div>
      ))}
      <Link href={'/blog'}><div className="text-center pt-10 pb-5">
        <h2 className="text-lg font-bold">Read more posts</h2>
        <h2 className="text-xl">🔽</h2>
        </div></Link>
    </div>
  );
}
