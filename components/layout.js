export default function Layout({ children }) {
  return (
      <section class="section">
        <div class="container is-max-desktop">
          <div class="box p-6">
            <div class="columns">
              <div class="column">
                <a class="title is-1">🌻</a>
              </div>
              <div class="column pt-4">
              <a class="button is-primary mr-1 is-pulled-right" href="https://victoriaslocum.com">
                  <span>website</span>
                </a>
                <a class="button is-primary mr-1 is-pulled-right" href="/facts">
                  <span>fun facts</span>
                </a>
                <a
                  class="button is-primary pr-4 mr-1 is-pulled-right"
                  href="/til"
                >
                  <span>til</span>
                </a>
                <a class="button is-primary mr-1 is-pulled-right" href="/">
                  <span>blog</span>
                </a>
              </div>
            </div>

            <div class="">{children}</div>
          </div>
        </div>
      </section>

  );
}
