const jobListItemTemplate = document.createElement('template');

jobListItemTemplate.innerHTML = `
  <li>
    <article class="fm-content">
      <img id="fm-logo" />

      <section class="fm-info">
        <header id="fm-header">
          <span id="fm-company" class="fm-company">
            <slot name="company">COMPANY</slot>
          </span>
          <!-- Tag list is created dynamically -->
        </header>

        <a id="fm-title" class="fm-title" href="#">
          <slot name="title">TITLE</slot>
        </a>

        <footer class="fm-footer">
          <time id="fm-added" class="fm-footer-item">
            <slot name="added">ADDED</slot>
          </time>

          <span id="fm-type" class="fm-footer-item">
            <slot name="type">TYPE</slot>
          </span>

          <span id="fm-location" class="fm-footer-item">
            <slot name="location">LOCATION</slot>
          </span>
        </footer>
      </section>

      <ul id="fm-categories" class="fm-categories">
        <!-- Category lists are created dynamically -->
      </ul>
    </article>
  </li>
`;

export { jobListItemTemplate };
