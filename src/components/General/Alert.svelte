<script>
  import { fly } from "svelte/transition";
  import { bounceIn } from "svelte/easing";

  export let message = "";
  export let type = "info";
  export let title = "";
  export let duration = 5000;

  const typeClasses = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-500 text-white",
  };

  let progress = 0;
  let interval;

  function startProgress() {
    progress = 100;

    interval = setInterval(() => {
      progress -= (100 / duration) * 100;
      if (progress <= 0) {
        clearInterval(interval);
        message = "";
        type = "";   
        title = "";  
      }
    }, 100);
  }

  startProgress();

  setTimeout(() => {
    clearInterval(interval);
    message = "";
    type = "";
    title = "";
  }, duration);
</script>

{#if type}
  <div 
    class={`notification p-4 rounded-lg shadow-md mt-4 ${typeClasses[type]} fixed top-4 right-4 z-50`} 
    transition:fly={{ x: 100, duration: 500, easing: bounceIn }}
  >
    {#if title}
      <h3 class="font-semibold text-lg mb-2">{title}</h3>
    {/if}
    <p>{message}</p>
    
    <div class="progress-bar-container mt-2">
      <div 
        class="progress-bar" 
        style="width: {progress}%" 
        transition:fly={{ y: 100, duration: 500, easing: bounceIn }}
      ></div>
    </div>
  </div>
{/if}

<style>
  .notification {
    position: fixed;
    top: 1em;
    right: 1em;
  }

  .progress-bar-container {
    width: 100%;
    height: 5px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }

  .progress-bar {
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 2px;
    transition: width 0.1s linear;
  }
</style>
