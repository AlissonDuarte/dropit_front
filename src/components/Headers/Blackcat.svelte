<script>
  import { onMount, onDestroy, afterUpdate } from "svelte";
  import { browser } from '$app/environment';

  let isBlinking = false;
  let positions = {
    head: {
      x: 90,
      y: 110,
    },
    leftEye: {
      x: 78,
      y: 112
    },
    rightEye: {
      x: 104,
      y: 112
    },
    leftEar: {
      x: 60,
    },
    rightEar: {
      x: 120,
    },
  };

  let blinkTimeout;

  // handle mouse/touch movement
  const handleMove = (clientX, clientY) => {
    if (!browser) return;
    
    const svgElement = document.getElementById("brand");
    if (!svgElement) return;
    
    const rect = svgElement.getBoundingClientRect();
    const svgCenterX = rect.left + rect.width / 2;
    const svgCenterY = rect.top + rect.height / 2;
    const offsetX = clientX - svgCenterX;
    const offsetY = clientY - svgCenterY;

    const maxHeadOffset = 6;
    const headDistance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    const clampedHeadDistance = Math.min(headDistance, maxHeadOffset);
    const headAngle = Math.atan2(offsetY, offsetX);
    const headMoveX = clampedHeadDistance * Math.cos(headAngle);
    const headMoveY = clampedHeadDistance * Math.sin(headAngle);

    const maxEyesOffset = 20;
    const eyesDistance = headDistance;
    const eyesAngle = headAngle;
    const clampedEyesDistance = Math.min(eyesDistance, maxEyesOffset);
    const eyeMoveX = clampedEyesDistance * Math.cos(eyesAngle);
    const eyeMoveY = clampedEyesDistance * Math.sin(eyesAngle);

    const earMoveFactor = 0.5;
    const earMoveX = headMoveX * earMoveFactor;
    
    positions = {
      head: { x: 90 + headMoveX, y: 110 + headMoveY },
      leftEye: { x: 77.5 + eyeMoveX, y: 112 + eyeMoveY },
      rightEye: { x: 103.5 + eyeMoveX, y: 112 + eyeMoveY },
      leftEar: { x: 60 - earMoveX },
      rightEar: { x: 120 - earMoveX },
    };
  };

  const handleMouseMove = (event) => handleMove(event.clientX, event.clientY);
  const handleTouchMove = (event) => {
    if (event.touches.length > 0) {
      handleMove(event.touches[0].clientX, event.touches[0].clientY);
    }
  };

  // Blink behavior using timeout
  const scheduleBlink = () => {
    if (!browser) return;
    
    const nextBlinkInterval = Math.random() * 3000 + 2000;
    blinkTimeout = setTimeout(() => {
      isBlinking = true;
      setTimeout(() => (isBlinking = false), 200);
      scheduleBlink();
    }, nextBlinkInterval);
  };

  onMount(() => {
    if (!browser) return;
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    scheduleBlink();
  });

  onDestroy(() => {
    if (!browser) return;
    
    clearTimeout(blinkTimeout);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("touchmove", handleTouchMove);
  });
</script>

<svg id="brand" width="96" height="96" viewBox="0 0 180 180">
  <defs>
    <clipPath id="backgroundClip">
      <circle cx="90" cy="90" r="90" />
    </clipPath>
  </defs>
  <g clip-path="url(#backgroundClip)">
    <circle
      id="bg"
      cx="90"
      cy="90"
      r="90"
      class="fill-zinc-400 dark:fill-zinc-100"
    />
    <path
      id="left-ear"
      class="fill-zinc-100 dark:fill-zinc-900"
      d={`M${positions.leftEar.x} 34L${positions.leftEar.x} 34L127 180H17Z`}
    />
    <path
      id="right-ear"
      class="fill-zinc-100 dark:fill-zinc-900"
      d={`M${positions.rightEar.x} 34L${positions.rightEar.x} 34L53 180H163Z`}
    />
    <circle
      id="head"
      r="42"
      cx={positions.head.x}
      cy={positions.head.y}
      class="fill-zinc-100 dark:fill-zinc-900"
    />
    <ellipse
      id="left-eye"
      rx="7"
      cx={positions.leftEye.x}
      cy={positions.leftEye.y}
      ry={isBlinking ? 0 : 14} 
      class="fill-zinc-900 dark:fill-zinc-100 transition-all duration-150"
    />
    <ellipse
      id="right-eye"
      rx="7"
      cx={positions.rightEye.x}
      cy={positions.rightEye.y}
      ry={isBlinking ? 0 : 14}
      class="fill-zinc-900 dark:fill-zinc-100 transition-all duration-150"
    />
  </g>
</svg>