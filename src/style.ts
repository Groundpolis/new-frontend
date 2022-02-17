import { createGlobalStyle } from 'styled-components';
import { animationFade, animationFadeLeft, animationFadeUp } from './animation';

export default createGlobalStyle`
body {
    font-family: "Koruri", sans-serif;
    --primary: #60B241;
    --primary-d: #1c3d11;
    --primary-l: #8eb97e;
    --fg: var(--tone-9);
    --shadow-color: rgba(0, 0, 0, 0.1);
    &.dark {
    --shadow-color: rgba(20, 20, 20, 0.3);
    }
    font-size: 16px;
}

button.btn:not(.primary):not(.info):not(.success):not(.warn):not(.danger):not(.lift):not(:disabled) {
    border-color: var(--dimmed);
    color: var(--fg);
    &:active, &:focus {
        border-color: var(--primary);
        color: var(--primary);
    }
}

button.btn.primary:disabled {
    background: transparent;
    color: var(--dimmed);
}

.vstack:not(.dense) {
    gap: var(--stack-margin);
    > * + * {
        margin-top: 0;
    }
}

.hstack:not(.dense) {
    gap: var(--stack-margin);
    > * + * {
        margin-left: 0;
    }
}

.vstack:not(.dense).slim,
.hstack:not(.dense).slim {
    gap: 4px;
}

.gp-disabled {
    opacity: 0.5;
    pointer-events: none;
}

.menu.large .item {
    display: flex;
    align-items: center;
    border: none;
    border-radius: var(--radius);
    width: 100%;
    > .icon {
        color: currentColor;
        margin-right: var(--margin);
    }
    &.active {
        color: var(--primary);
    }
}

.menu.slim .item {
    margin: 0 auto;
    display: flex;
    height: 50px;
    padding: 0;
    align-items: center;
    justify-content: center;
    > .icon {
        font-size: 1.25em;
        margin: 0;
    }
    > .label {
        display: none;
    }
}

.vgroup.outline {
    > * + * {
        border-top: 1px solid var(--tone-1);
    }
}

.gp-nowrap {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.gp-anm {
  &-fade {
    ${animationFade};
    &-up {
      ${animationFadeUp}
    }
    &-left {
      ${animationFadeLeft}
    }
  }
}
`;