/**
 * LarHub Application Entry Point
 *
 * Shared application bootstrapping.
 */

import {
  renderPublicHeader
} from "./components/public-header.js";

import {
  renderPublicFooter
} from "./components/public-footer.js";

import {
  initPublicNavigation
} from "./features/navigation.js";

import {
  onReady
} from "./utils/dom.js";

/**
 * Initialize global LarHub behaviour.
 */
function initLarHub() {
  renderPublicHeader();
  renderPublicFooter();
  initPublicNavigation();
}

onReady(initLarHub);
