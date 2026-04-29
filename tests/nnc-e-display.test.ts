import { beforeEach, describe, expect, it } from "vitest";
import { defineNncEDisplay, NncEDisplayElement } from "../src/index";

describe("nnc-e-display", () => {
  beforeEach(() => {
    document.body.replaceChildren();
    defineNncEDisplay();
  });

  it("defines the custom element once", () => {
    expect(customElements.get("nnc-e-display")).toBe(NncEDisplayElement);
    expect(() => defineNncEDisplay()).not.toThrow();
  });

  it("uses label text when no slot content is provided", async () => {
    const element = document.createElement("nnc-e-display");
    element.setAttribute("label", "まもなく 1 番線に 快速が到着します");

    document.body.append(element);
    await element.updateComplete;

    expect(element.shadowRoot?.textContent).toContain(
      "まもなく 1 番線に 快速が到着します",
    );
  });

  it("keeps slotted text ahead of label fallback", async () => {
    const element = document.createElement("nnc-e-display");
    element.setAttribute("label", "fallback");
    element.textContent = "slot message";

    document.body.append(element);
    await element.updateComplete;

    const slot = element.shadowRoot?.querySelector("slot");

    expect(slot?.assignedNodes()).toHaveLength(1);
    expect(element.textContent).toBe("slot message");
  });

  it("normalizes direction and speed attributes", () => {
    const element = document.createElement(
      "nnc-e-display",
    ) as NncEDisplayElement;

    document.body.append(element);

    expect(element.direction).toBe("left");
    expect(element.speed).toBe(200);

    element.setAttribute("direction", "right");
    element.setAttribute("speed", "80");

    expect(element.direction).toBe("right");
    expect(element.speed).toBe(80);

    element.setAttribute("direction", "up");
    element.setAttribute("speed", "-1");

    expect(element.direction).toBe("left");
    expect(element.speed).toBe(200);
  });
});
