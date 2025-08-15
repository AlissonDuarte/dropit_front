<script>
  export let reactions = [];
  export let activeReaction = null;
  export let readOnly = false;
  export let onReact = () => {};

  let justReacted = false;

  function handleReaction(reactionType) {
    if (readOnly) return;
    justReacted = true;
    setTimeout(() => (justReacted = false), 500);

    if (reactionType === activeReaction) {
      onReact(null);
    } else {
      onReact(reactionType);
    }
  }
</script>

<div class="flex gap-4">
  {#each reactions as reaction}
    <button
      class="relative cursor-pointer flex items-center space-x-1 group"
      aria-label={reaction.label}
      on:click={() => handleReaction(reaction.type)}
      title={reaction.label}
      disabled={readOnly}
    >
      <span
        class={`absolute inset-0 rounded-full opacity-0 transition-all duration-300 ${reaction.color.replace('text-', 'bg-')}`}
        class:animate-glow={activeReaction === reaction.type && justReacted}
      ></span>

      {#if activeReaction === reaction.type && justReacted}
        <span class="absolute top-[-10px] left-[-10px] w-full h-full flex items-center justify-center pointer-events-none z-10">
          <span class="animate-burst text-lg">💥</span>
        </span>
      {/if}

      <span
        class={`w-5 h-5 transition-all duration-300 ease-out ${
          activeReaction === reaction.type 
            ? `scale-125 animate-bounce-once ${reaction.color}` 
            : 'text-zinc-400 group-hover:scale-110 group-hover:' + reaction.color
        }`}
      >
        {@html activeReaction === reaction.type ? reaction.iconFilled : reaction.iconOutline}
      </span>

      <span
        class={`text-sm font-medium transition-all duration-300 ease-out transform ${
          activeReaction === reaction.type 
            ? `${reaction.color} scale-110 ${justReacted ? 'animate-pop' : ''}`
            : 'text-zinc-400 group-hover:' + reaction.color
        }`}
      >
        {reaction.count}
      </span>
    </button>
  {/each}
</div>

<style>
  button {
    transition: transform 0.2s ease-out;
  }
  button:active {
    transform: scale(0.95);
  }

  @keyframes bounce-once {
    0% { transform: scale(1); }
    30% { transform: scale(1.4); }
    60% { transform: scale(0.9); }
    100% { transform: scale(1); }
  }

  .animate-bounce-once {
    animation: bounce-once 0.4s ease-out;
  }

  @keyframes glow {
    0% { box-shadow: 0 0 0px rgba(255,255,255,0); opacity: 1; }
    50% { box-shadow: 0 0 12px rgba(255,255,255,0.6); opacity: 0.8; }
    100% { box-shadow: 0 0 0px rgba(255,255,255,0); opacity: 0; }
  }

  .animate-glow {
    animation: glow 0.5s ease-out;
  }

  @keyframes pop {
    0% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); }
  }

  .animate-pop {
    animation: pop 0.3s ease-out;
  }

  @keyframes burst {
    0% { transform: scale(0); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.8; }
    100% { transform: scale(2); opacity: 0; }
  }

  .animate-burst {
    animation: burst 0.5s ease-out forwards;
  }
</style>
