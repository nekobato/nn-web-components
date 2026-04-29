import { LitElement, css, html } from "lit";
import type { PropertyValues } from "lit";

/**
 * Direction values supported by `<nnc-e-display>`.
 */
export type NncEDisplayDirection = "left" | "right";

const elementName = "nnc-e-display";
const defaultDirection: NncEDisplayDirection = "left";
const defaultSpeed = 200;
const minimumDuration = 1;
const fallbackViewportWidth = 320;
const fallbackCharacterWidth = 16;

const directionConverter = {
  /**
   * Converts the `direction` attribute into a supported direction value.
   */
  fromAttribute: (value: string | null): NncEDisplayDirection =>
    parseNncEDisplayDirection(value),

  /**
   * Reflects only supported direction values back to the host attribute.
   */
  toAttribute: (value: NncEDisplayDirection): NncEDisplayDirection =>
    parseNncEDisplayDirection(value),
};

const speedConverter = {
  /**
   * Converts the `speed` attribute into a positive px-per-second value.
   */
  fromAttribute: (value: string | null): number => parseNncEDisplaySpeed(value),

  /**
   * Reflects a normalized speed value back to the host attribute.
   */
  toAttribute: (value: number): string => String(parseNncEDisplaySpeed(value)),
};

/**
 * Returns a supported direction, falling back to the MVP default.
 */
export const parseNncEDisplayDirection = (
  value: string | null,
): NncEDisplayDirection =>
  value === "right" || value === "left" ? value : defaultDirection;

/**
 * Returns a positive px-per-second speed, falling back to the MVP default.
 */
export const parseNncEDisplaySpeed = (
  value: string | number | null,
): number => {
  const speed = Number(value);

  return Number.isFinite(speed) && speed > 0 ? speed : defaultSpeed;
};

/**
 * Estimates text width when the DOM implementation cannot measure layout.
 */
const estimateContentWidth = (text: string): number =>
  Math.max(1, text.trim().length * fallbackCharacterWidth);

/**
 * Custom element for a Japanese train-sign inspired horizontal LED display.
 */
export class NncEDisplayElement extends LitElement {
  static properties = {
    direction: {
      converter: directionConverter,
      reflect: true,
    },
    label: {
      type: String,
    },
    speed: {
      converter: speedConverter,
      reflect: true,
    },
  };

  static styles = css`
    :host {
      --nnc-e-display-background: #07110d;
      --nnc-e-display-color: #ffd45a;
      --nnc-e-display-border-color: #245947;
      --nnc-e-display-height: 76px;
      --nnc-e-display-padding-inline: 24px;
      --nnc-e-display-font-family:
        "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", system-ui,
        sans-serif;
      --nnc-e-display-font-size: 2rem;
      --nnc-e-display-font-weight: 700;
      --nnc-e-display-letter-spacing: 0;
      --nnc-e-display-radius: 6px;
      --nnc-e-display-shadow: 0 18px 48px rgb(0 0 0 / 32%);
      --nnc-e-display-dot-size: 1px;
      --nnc-e-display-dot-gap: 5px;
      --nnc-e-display-glow: 0 0 7px rgb(255 212 90 / 72%);
      --nnc-e-display-duration: 2.6s;
      --nnc-e-display-travel-start: 100%;
      --nnc-e-display-travel-end: -100%;

      box-sizing: border-box;
      display: block;
      min-width: 0;
      color: var(--nnc-e-display-color);
      font-family: var(--nnc-e-display-font-family);
      -webkit-tap-highlight-color: transparent;
    }

    :host([hidden]) {
      display: none;
    }

    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }

    .board {
      position: relative;
      display: flex;
      min-width: 0;
      min-height: var(--nnc-e-display-height);
      overflow: hidden;
      border: 1px solid var(--nnc-e-display-border-color);
      border-radius: var(--nnc-e-display-radius);
      background:
        linear-gradient(180deg, rgb(255 255 255 / 8%), transparent 44%),
        radial-gradient(
          circle at center,
          rgb(255 212 90 / 16%) var(--nnc-e-display-dot-size),
          transparent calc(var(--nnc-e-display-dot-size) + 0.5px)
        ),
        var(--nnc-e-display-background);
      background-size:
        100% 100%,
        var(--nnc-e-display-dot-gap) var(--nnc-e-display-dot-gap),
        auto;
      box-shadow: var(--nnc-e-display-shadow);
      color: inherit;
    }

    .board::before,
    .board::after {
      position: absolute;
      z-index: 1;
      top: 0;
      bottom: 0;
      width: clamp(28px, 8%, 96px);
      pointer-events: none;
      content: "";
    }

    .board::before {
      left: 0;
      background: linear-gradient(
        90deg,
        var(--nnc-e-display-background),
        transparent
      );
    }

    .board::after {
      right: 0;
      background: linear-gradient(
        270deg,
        var(--nnc-e-display-background),
        transparent
      );
    }

    .viewport {
      position: relative;
      z-index: 0;
      display: flex;
      width: 100%;
      min-width: 0;
      align-items: center;
      overflow: hidden;
      padding-inline: var(--nnc-e-display-padding-inline);
      color: inherit;
      line-height: 1;
      overflow-wrap: anywhere;
      touch-action: manipulation;
    }

    .marquee {
      display: inline-flex;
      min-width: max-content;
      align-items: center;
      color: inherit;
      font-size: var(--nnc-e-display-font-size);
      font-weight: var(--nnc-e-display-font-weight);
      font-variant-numeric: tabular-nums;
      letter-spacing: var(--nnc-e-display-letter-spacing);
      text-shadow: var(--nnc-e-display-glow);
      white-space: nowrap;
      will-change: transform;
      animation: nnc-e-display-slide var(--nnc-e-display-duration) linear
        infinite;
    }

    .content {
      display: inline-flex;
      min-width: max-content;
      align-items: center;
    }

    ::slotted(*) {
      min-width: 0;
    }

    @keyframes nnc-e-display-slide {
      from {
        transform: translate3d(var(--nnc-e-display-travel-start), 0, 0);
      }

      to {
        transform: translate3d(var(--nnc-e-display-travel-end), 0, 0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .marquee {
        animation: none;
        transform: none;
        will-change: auto;
      }
    }

    @media (width <= 640px) {
      :host {
        --nnc-e-display-height: 64px;
        --nnc-e-display-padding-inline: 16px;
        --nnc-e-display-font-size: 1.45rem;
      }
    }
  `;

  declare direction: NncEDisplayDirection;
  declare label: string;
  declare speed: number;

  #animationFrame = 0;
  #resizeObserver: ResizeObserver | undefined;

  /**
   * Initializes Lit reactive properties through generated accessors.
   */
  constructor() {
    super();

    this.direction = defaultDirection;
    this.label = "";
    this.speed = defaultSpeed;
  }

  /**
   * Starts metric observation after Lit has connected the element.
   */
  connectedCallback(): void {
    super.connectedCallback();
    this.#scheduleAnimationMetrics();
  }

  /**
   * Cleans up observers and pending animation frame work.
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#resizeObserver?.disconnect();

    if (this.#animationFrame !== 0) {
      cancelAnimationFrame(this.#animationFrame);
      this.#animationFrame = 0;
    }
  }

  /**
   * Renders the display structure with label text as slot fallback.
   */
  render() {
    return html`
      <span class="board" part="base">
        <span class="viewport" part="viewport">
          <span class="marquee" part="marquee">
            <span class="content" part="content">
              <slot @slotchange=${this.#handleSlotChange}>${this.label}</slot>
            </span>
          </span>
        </span>
      </span>
    `;
  }

  /**
   * Starts resize observation once the internal DOM exists.
   */
  protected firstUpdated(): void {
    const marqueeElement = this.#getMarqueeElement();

    this.#resizeObserver =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(() => this.#scheduleAnimationMetrics());
    this.#resizeObserver?.observe(this);

    if (marqueeElement) {
      this.#resizeObserver?.observe(marqueeElement);
    }

    this.#scheduleAnimationMetrics();
  }

  /**
   * Updates animation metrics when public API values change.
   */
  protected updated(changedProperties: PropertyValues<this>): void {
    if (
      changedProperties.has("direction") ||
      changedProperties.has("label") ||
      changedProperties.has("speed")
    ) {
      this.#scheduleAnimationMetrics();
    }
  }

  /**
   * Returns the internal marquee element, if it has rendered.
   */
  #getMarqueeElement(): HTMLSpanElement | null {
    return this.renderRoot.querySelector<HTMLSpanElement>(".marquee");
  }

  /**
   * Returns the internal slot element, if it has rendered.
   */
  #getSlotElement(): HTMLSlotElement | null {
    return this.renderRoot.querySelector<HTMLSlotElement>("slot");
  }

  /**
   * Returns readable text from the slotted content or label fallback.
   */
  #getReadableText(): string {
    const slottedText =
      this.#getSlotElement()
        ?.assignedNodes({ flatten: true })
        .map((node) => node.textContent ?? "")
        .join("")
        .trim() ?? "";

    return slottedText || this.label;
  }

  /**
   * Defers DOM measurement so reads and writes are batched together.
   */
  #scheduleAnimationMetrics(): void {
    if (!this.isConnected || this.#animationFrame !== 0) {
      return;
    }

    this.#animationFrame = requestAnimationFrame(() => {
      this.#animationFrame = 0;
      this.#updateAnimationMetrics();
    });
  }

  /**
   * Applies pixel-based travel variables so speed means px per second.
   */
  #updateAnimationMetrics(): void {
    const marqueeElement = this.#getMarqueeElement();

    if (!marqueeElement) {
      return;
    }

    const hostWidth = Math.max(
      this.clientWidth,
      this.getBoundingClientRect().width,
      fallbackViewportWidth,
    );
    const contentWidth = Math.max(
      marqueeElement.scrollWidth,
      estimateContentWidth(this.#getReadableText()),
    );
    const travelDistance = hostWidth + contentWidth;
    const duration = Math.max(minimumDuration, travelDistance / this.speed);
    const isRight = this.direction === "right";
    const start = isRight ? -contentWidth : hostWidth;
    const end = isRight ? hostWidth : -contentWidth;

    marqueeElement.style.setProperty(
      "--nnc-e-display-duration",
      `${duration}s`,
    );
    marqueeElement.style.setProperty(
      "--nnc-e-display-travel-start",
      `${start}px`,
    );
    marqueeElement.style.setProperty("--nnc-e-display-travel-end", `${end}px`);
  }

  /**
   * Handles changes in slot assignment that can alter text width.
   */
  readonly #handleSlotChange = (): void => {
    this.#scheduleAnimationMetrics();
  };
}

/**
 * Registers `<nnc-e-display>` with a custom elements registry.
 */
export const defineNncEDisplay = (
  registry: CustomElementRegistry = customElements,
): void => {
  if (!registry.get(elementName)) {
    registry.define(elementName, NncEDisplayElement);
  }
};

declare global {
  interface HTMLElementTagNameMap {
    "nnc-e-display": NncEDisplayElement;
  }
}
