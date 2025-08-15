<script>
  import { API_URL } from "../../config";
  import { triggerAlert } from '../../stores/alerts';
  import PostCategory from "../Categories/PostCategory.svelte";
  import Reaction from "../Reactions/Reaction.svelte";

  export let post = {};

  const toggleLike = () => {
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
  };


  async function toggleBookmark(){
    const response = await fetch(`${API_URL}/posts/${post.uuid}/bookmark`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

      const result = await response.json();
      post.isBookmarked = result;

      triggerAlert(
        result ? 'success' : 'info',
        'Favoritos',
        result ? 'Post adicionado aos seus favoritos.' : 'Post removido dos seus favoritos.'
      );
  }

</script>

<div class="bg-zinc-800/50 border border-zinc-700 rounded-xl p-5 mb-6 shadow-lg hover:shadow-zinc-700/20 transition-all duration-300">
  <div class="mb-4">
    <h2 class="text-xl font-bold text-zinc-100 mb-1">{post.title}</h2>
    <div class="flex items-center text-zinc-400 text-sm">
      <span class="font-medium text-zinc-300">{post.author}</span>
      <span class="mx-2">•</span>
      <span>{post.date}</span>
    </div>

    {#if post.tags}
      <div class="flex flex-row gap-2 flex-wrap">
        {#each post.tags as tag}
          <PostCategory tag={tag} />
        {/each}
      </div>
    {/if}
  </div>

  <div class="mb-5">
    <p class="text-zinc-300 whitespace-pre-line break-words">
      {post.content.slice(0, 240)}{post.content.slice(0, 240).endsWith("...") ? '' : '...'}
    </p>
  </div>

  <div class="flex justify-between items-center pt-3 border-t border-zinc-700/50">
    <div class="flex space-x-4">
      <Reaction postUUID={post.uuid} reactions={post.reactions} readOnly={true}/>
    </div>
    <button 
      on:click|stopPropagation={toggleBookmark}
      aria-label="Favoritar"
    >
      <svg 
        class={`cursor-pointer w-5 h-5 ${post.isBookmarked ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-400 hover:text-yellow-400'}`} 
        viewBox="0 0 24 24"
      >
        <path 
          stroke="currentColor" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="1.5"
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </button>
  </div>
</div>

<style>
  .whitespace-pre-line {
    white-space: pre-line;
    word-wrap: break-word;
    overflow-wrap: anywhere;
  }
  .tag {
    transition: all 0.2s ease;
  }
  .tag:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }
</style>