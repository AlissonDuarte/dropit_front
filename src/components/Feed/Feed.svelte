<script>
  import Post from "./Post.svelte";
  import { goto } from "$app/navigation";
  export let posts = [];
  export let cssClass = ""
  const handlePostClick = (post) => {
    goto(`/user/read/${post.uuid}`);
  };
</script>

{#if posts.length === 0}
  <p class="text-center text-zinc-400">Nenhum relato encontrado. Seja o primeiro a compartilhar!</p>
{:else}
  <div class={cssClass}>
    {#each posts as post (post.uuid)}
      <button
        type="button"
        class="block w-full text-left cursor-pointer hover:bg-zinc-800/30 transition-colors rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
        on:click={() => handlePostClick(post)}
        on:keydown={(e) => e.key === 'Enter' && handlePostClick(post)}
      >
        <Post {post} />
      </button>

    {/each}
  </div>
{/if}
