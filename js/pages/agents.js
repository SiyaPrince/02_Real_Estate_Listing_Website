/**
 * LarHub Agents Directory
 */

import {
  renderAgentCard
} from "../components/agent-card.js";

import {
  searchPublicAgents
} from "../services/agent-service.js";

import {
  onReady,
  select
} from "../utils/dom.js";

import {
  getQueryParam,
  setQueryParams
} from "../utils/url.js";

let query = "";

function renderAgents() {
  const grid =
    select(
      "[data-agent-grid]"
    );

  const count =
    select(
      "[data-agent-result-count]"
    );

  const empty =
    select(
      "[data-agent-empty]"
    );

  const clear =
    select(
      "[data-clear-agent-search]"
    );

  if (
    !grid
    || !count
    || !empty
    || !clear
  ) {
    return;
  }

  const agents =
    searchPublicAgents(query);

  grid.innerHTML =
    agents
      .map(renderAgentCard)
      .join("");

  const resultWord =
    agents.length === 1
      ? "agent"
      : "agents";

  count.textContent =
    `${agents.length} ${resultWord}`;

  empty.hidden =
    agents.length !== 0;

  grid.hidden =
    agents.length === 0;

  clear.hidden =
    !query;
}

function syncUrl({
  replace = true
} = {}) {
  setQueryParams(
    {
      q: query
    },
    {
      replace
    }
  );
}

function populateSearch() {
  const form =
    select(
      "[data-agent-search]"
    );

  if (!form) {
    return;
  }

  form.elements.q.value =
    query;
}

function clearSearch() {
  query = "";

  syncUrl({
    replace: false
  });

  populateSearch();
  renderAgents();
}

function initSearch() {
  const form =
    select(
      "[data-agent-search]"
    );

  if (!form) {
    return;
  }

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      query =
        form.elements.q.value
          .trim();

      syncUrl({
        replace: false
      });

      renderAgents();
    }
  );

  document.addEventListener(
    "click",
    (event) => {
      if (
        event.target.closest(
          "[data-clear-agent-search]"
        )
        || event.target.closest(
          "[data-agent-empty-clear]"
        )
      ) {
        clearSearch();
      }
    }
  );

  window.addEventListener(
    "popstate",
    () => {
      query =
        getQueryParam("q")
        ?? "";

      populateSearch();
      renderAgents();
    }
  );
}

function initAgents() {
  query =
    getQueryParam("q")
    ?? "";

  populateSearch();
  initSearch();
  renderAgents();
}

onReady(initAgents);
