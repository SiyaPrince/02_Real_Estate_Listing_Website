/**
 * LarHub Application Entry Point
 *
 * Increment 0.7
 *
 * Shared application bootstrapping only.
 * Feature modules and page-specific behaviour belong
 * to later increments.
 */

import {
  onReady
} from "./utils/dom.js";

/**
 * Initialize global LarHub behaviour.
 *
 * Keep this function intentionally small.
 * Shared components and features will register here
 * as later increments are implemented.
 */
function initLarHub() {
  // Shared initialization will be added incrementally.
}

onReady(initLarHub);
