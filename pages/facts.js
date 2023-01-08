export default function facts({}) {
  return (
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-8">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification is-link">
              <p class="title">🎧 I love music</p>
              <p class="subtitle">
                I am constantly listening to anything and everything.
              </p>
            </article>
            <article class="tile is-child notification">
              <p class="title">... and reading</p>
              <p class="subtitle">
                I've been obsessed with books for a really long time now.
              </p>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-success">
              <p class="title">🗺️ a need for exploration</p>
              <p class="content is-size-5">
                Exploring new cultures and experiencing new things has to be one
                of my favorite things about life. Some of my favorite trips have
                been to Mongolia, Costa Rica, and Italy.
              </p>
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-primary">
            <p class="title">👅 languages</p>
            <p class="subtitle">
              I'm a little obsessed with learning languages... currently, I
              somewhat speak ASL and Spanish, and am working on Arabic and
              German.
            </p>
          </article>
        </div>
      </div>
      <div class="tile is-parent is-vertical">
        <article class="tile is-child notification">
          <div class="content">
            <p class="title pb-2">🐢 marathon runner</p>
            <p class="subtitle">
              I ran the Carlsbad Marathon in January of 2022!
            </p>
            <p class="subtitle">
              After 20 weeks of training and many set backs, I was so proud to
              reach this milestone. I can't wait for the next one.
            </p>
          </div>
        </article>
        <article class="tile is-child notification is-link">
          <p class="title">love.py</p>
          <p class="subtitle">
            I love making over-engineered solutions to small problems.
          </p>
        </article>
      </div>
    </div>
  );
}
