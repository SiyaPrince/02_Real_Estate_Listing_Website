/**
 * LarHub Pagination Component
 */

export function getPageCount(
  totalItems,
  pageSize
) {
  return Math.max(
    1,
    Math.ceil(totalItems / pageSize)
  );
}

export function paginateItems(
  items,
  page,
  pageSize
) {
  const pageCount =
    getPageCount(
      items.length,
      pageSize
    );

  const safePage = Math.min(
    Math.max(page, 1),
    pageCount
  );

  const start =
    (safePage - 1) * pageSize;

  return {
    page: safePage,
    pageCount,
    items: items.slice(
      start,
      start + pageSize
    )
  };
}

export function renderPagination(
  target,
  {
    page,
    pageCount,
    onPageChange
  }
) {
  target.innerHTML = "";

  if (pageCount <= 1) {
    return;
  }

  const nav = document.createElement(
    "nav"
  );

  nav.className = "pagination__nav";
  nav.setAttribute(
    "aria-label",
    "Property result pages"
  );

  const previous =
    document.createElement("button");

  previous.type = "button";
  previous.className =
    "pagination__button";
  previous.textContent = "Previous";
  previous.disabled = page === 1;

  previous.addEventListener(
    "click",
    () => onPageChange(page - 1)
  );

  nav.append(previous);

  const windowStart = Math.max(
    1,
    Math.min(
      page - 2,
      pageCount - 4
    )
  );

  const windowEnd = Math.min(
    pageCount,
    windowStart + 4
  );

  for (
    let number = windowStart;
    number <= windowEnd;
    number += 1
  ) {
    const button =
      document.createElement("button");

    button.type = "button";
    button.className =
      "pagination__button";
    button.textContent =
      String(number);

    if (number === page) {
      button.setAttribute(
        "aria-current",
        "page"
      );
    }

    button.addEventListener(
      "click",
      () => onPageChange(number)
    );

    nav.append(button);
  }

  const next =
    document.createElement("button");

  next.type = "button";
  next.className =
    "pagination__button";
  next.textContent = "Next";
  next.disabled = page === pageCount;

  next.addEventListener(
    "click",
    () => onPageChange(page + 1)
  );

  nav.append(next);
  target.append(nav);
}
