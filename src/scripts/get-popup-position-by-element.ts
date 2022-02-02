export function getPopupPositionByElement(el: Element): {left: number, top: number} {
  const {left, top, height } = el.getBoundingClientRect();

  return { left, top: top + height };
}