const jobItemTemplate = document.createElement('template');

jobItemTemplate.innerHTML = `
  <article class="fm-content">
    <img class="fm-logo" />

    <section class="fm-info">
      <header class="fm-header">
        <span class="fm-company">
          <slot>COMPANY</slot>
        </span>
      </header>

      <a class="fm-title" href="#">
        <slot>TITLE</slot>
      </a>

      <footer class="fm-footer">
        <time class="fm-added fm-footer-item">
          <slot>ADDED</slot>
        </time>

        <span class="fm-type fm-footer-item">
          <slot>TYPE</slot>
        </span>

        <span class="fm-location fm-footer-item">
          <slot>LOCATION</slot>
        </span>
      </footer>
    </section>
  </article>
`;

export { jobItemTemplate };
