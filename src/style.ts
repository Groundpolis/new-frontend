import { createGlobalStyle } from 'styled-components';
import { animationFade, animationFadeLeft, animationFadeUp } from './animation';

export default createGlobalStyle`
html {
    font-size: 16px;
}

body {
    font-family: "Koruri", sans-serif;
}

/* button.btn:not(.primary):not(.info):not(.success):not(.warn):not(.danger):not(.lift):not(:disabled) {
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
} */

.menu .item .icon {
    color: currentColor;
}

.gp-disabled {
    opacity: 0.5;
    pointer-events: none;
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