import Link from "next/link";

export default function Projects({}) {
  return (
    <div className="container mx-auto">
      <div className="md:flex">
        <div className="md:flex-1 p-10 md:ml-20">
          <h1 className="text-2xl font-bold pb-1 underline decoration-main">
            synsong
          </h1>
          <p className="text-md pb-4">
            synsong is a natural language prompt-based playlist generator
            written in{" "}
            <a
              className="underline"
              href="https://www.python.org/"
              target="_blank"
            >
              Python
            </a>
            . I used{" "}
            <a className="underline" href="https://spacy.io/" target="_blank">
              spaCy
            </a>{" "}
            for the NLP and{" "}
            <a
              className="underline"
              href="https://developer.spotify.com/"
              target="_blank"
            >
              Spotify
            </a>{" "}
            and{" "}
            <a
              className="underline"
              href="https://www.musixmatch.com/"
              target="_blank"
            >
              Musixmatch
            </a>{" "}
            APIs for the generation.
          </p>
          <a
            className="flex-none px-2 mr-2 bg-main-light rounded-md"
            href="https://synsong.app"
            target="_blank"
          >
            Website
          </a>
          <a
            className="flex-none px-2 mr-2 bg-main-light rounded-md"
            href="https://github.com/victorialslocum/synsong"
            target="_blank"
          >
            GitHub
          </a>
        </div>
        <div className="md:flex-1 p-10 md:mr-20">
          <h1 className="text-2xl pb-1 font-bold underline decoration-main">
            personal front-page{" "}
          </h1>
          <p class="pb-4">Coming soon!</p>

          {/* <a
            className="flex-none px-2 mr-2 bg-main-light rounded-md"
            href="https://github.com/victorialslocum/standup-integration"
            target="_blank"
          >
            GitHub
          </a> */}
        </div>
      </div>
      <div className="md:flex">
        <div className="md:flex-1 p-10 md:ml-20">
          <h1 className="text-2xl pb-1 font-bold underline decoration-main">
            compatibility test{" "}
          </h1>
          <p class="pb-4">
            <p class="pb-4">
              For a little fun, I made myself a compatibility test using{" "}
              <a
                className="underline"
                href="https://www.javascript.com/"
                target="_blank"
              >
                javascript
              </a>{" "}
              (for the first time) and{" "}
              <a
                className="underline"
                href="https://www.w3schools.com/html/"
                target="_blank"
              >
                HTML
              </a>
              .
            </p>
          </p>

          <a
            className="flex-none px-2 mr-2 bg-main-light rounded-md"
            href="https://compatibility.victoriaslocum.com"
            target="_blank"
          >
            Website
          </a>
          <a
            className="flex-none px-2 mr-2 bg-main-light rounded-md"
            href="https://github.com/victorialslocum/compatibilitytestweb"
            target="_blank"
          >
            GitHub
          </a>
        </div>
        <div className="md:flex-1 p-10 md:mr-20">
          <h1 className="text-2xl pb-1 font-bold underline decoration-main">
            standup integration
          </h1>
          <p class="pb-4">
            Using{" "}
            <a className="underline" href="https://slack.com/" target="_blank">
              Slack
            </a>{" "}
            and{" "}
            <a className="underline" href="https://notion.so" target="_blank">
              Notion
            </a>{" "}
            APIs and{" "}
            <a
              className="underline"
              href="https://www.javascript.com/"
              target="_blank"
            >
              JavaScript
            </a>
            , I created a standup bot integration that{" "}
            <a
              className="underline"
              href="https://github.com/victorialslocum/slack-notion-translation"
              target="_blank"
            >
              translated
            </a>{" "}
            the text pasted in Slack and auto-inputted into a Notion database.
          </p>

          <a
            className="flex-none px-2 mr-2 bg-main-light rounded-md"
            href="https://github.com/victorialslocum/standup-integration"
            target="_blank"
          >
            GitHub
          </a>
        </div>
      </div>
      <Link href={"https://github.com/victorialslocum"}>
        <div className="text-center pt-10 pb-5">
          <button>
            <h2 className="text-lg font-bold hover:underline decoration-main">
              Find more on GitHub!{" "}
            </h2>
          </button>
        </div>
      </Link>
    </div>
  );
}
