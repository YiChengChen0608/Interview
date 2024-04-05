import { ref } from "vue";

export function useTargetPosition() {
  const targetPosition = ref({ x: 0, y: 0 });

  const setRandomTargetPosition = (containerElementReact) => {
    const x = Math.floor(Math.random() * (containerElementReact.width - 30));
    const y =
      Math.floor(Math.random() * (containerElementReact.height - 30)) +
      containerElementReact.y;

    targetPosition.value.x = x;
    targetPosition.value.y = y;
  };

  return { targetPosition, setRandomTargetPosition };
}
