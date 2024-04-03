import { ref } from "vue";

const getBallPosition = (cellElement) => {
  // 找出cell與main的距離
  const mainRect = document.querySelector("main").getBoundingClientRect();
  const elementRect = cellElement.getBoundingClientRect();

  const top = elementRect.top - mainRect.top;
  const left = elementRect.left - mainRect.left;

  // 讓球置中
  const x = left + elementRect.width / 2 - 30;
  const y = top + elementRect.height / 2 - 30;

  return { x, y };
};

const setBallPosition = (ballElement, position = { x: 0, y: 0 }) => {
  ballElement.style.top += position.y;
  ballElement.style.left += position.x;
  return { left: ballElement.style.left, top: ballElement.style.top };
};

export function useBallPosition(ballElement, cellElement) {
  const position = ref({ x: 0, y: 0 });

  const ballPosition = getBallPosition(ballElement);
  const { left, top } = setBallPosition(ballElement, ballPosition);

  position.value.x += left;
  position.value.y += top;

  return { position };
}
