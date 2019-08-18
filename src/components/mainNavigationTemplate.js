export const createMainNavigationTemplate = (filtersData) => {
  return `<nav class="main-navigation">
    ${filtersData.map((it) => {
    return `<a href="#${it.title.toLowerCase().split(` `)[0].trim()}"
      class="
        main-navigation__item
        ${it.isActive ? `main-navigation__item--active` : ``}
        ${it.isAdditional ? `main-navigation__item--additional` : ``}
      ">${it.title} ${it.count ? `<span class="main-navigation__item-count">${it.count}</span>` : ``}</a>`;
  }).join(``)}
  </nav>`;
};
