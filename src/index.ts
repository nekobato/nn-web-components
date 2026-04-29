import { defineNncEDisplay } from "./nnc-e-display";

export {
  defineNncEDisplay,
  NncEDisplayElement,
  parseNncEDisplayDirection,
  parseNncEDisplaySpeed,
} from "./nnc-e-display";
export type { NncEDisplayDirection } from "./nnc-e-display";

if (typeof customElements !== "undefined") {
  defineNncEDisplay();
}
