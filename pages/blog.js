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
    <div className="">
      {blog_posts.map(({ slug, frontmatter }) => (
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
    </div>
  );
}
