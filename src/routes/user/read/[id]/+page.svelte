<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import {
    triggerAlert,
    showAlert,
    alertMessage,
    alertTitle,
    alertType
  } from '../../../../stores/alerts';
  import { API_URL } from '../../../../config';
  import Alert from '../../../../components/General/Alert.svelte';
  import Sidebar from '../../../../components/General/Sidebar.svelte';
  import Reaction from '../../../../components/Reactions/Reaction.svelte';

  let post = {
    title: "",
    content: "",
    username: "",
    created_at: "",
    tags: [],
    isBookmarked: false,
    reactions: {
      love: 0,
      like: 0,
      support: 0,
      sad: 0,
      user_reaction: null
    }
  };

  let postUUID = $page.params.id;
  let showScrollIndicator = true;
  let isBookmarked = false;
  let readingProgress = 0;
  let contentContainer;
  let isMobile = false;


  function handleScroll() {
    if (!contentContainer) return;
    const scrollTop = contentContainer.scrollTop;
    const scrollHeight = contentContainer.scrollHeight - contentContainer.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    readingProgress = Math.round(scrolled);
    showScrollIndicator = readingProgress < 95;
  }

  function checkMobile() {
    isMobile = window.innerWidth < 768;
  }

  async function fetchPost(postUUID) {
    try {
      const response = await fetch(`${API_URL}/post/detail/${postUUID}`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();
      post = data;
      isBookmarked = data.is_bookmarked;
    } catch (error) {
      triggerAlert(
        'error',
        'Erro ao buscar post',
        error.message || 'Ocorreu um erro ao buscar o post, por favor tente novamente.'
      )
    }
  }

  async function toggleBookmark(){
    const response = await fetch(`${API_URL}/posts/${postUUID}/bookmark`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

      const result = await response.json();
      isBookmarked = result;

      triggerAlert(
        result ? 'success' : 'info',
        'Favoritos',
        result ? 'Post adicionado aos seus favoritos.' : 'Post removido dos seus favoritos.'
      );
  }

  onMount(() => {
    checkMobile();
    fetchPost(postUUID);
    window.addEventListener('resize', checkMobile);
    
    if (contentContainer) {
      contentContainer.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (contentContainer) {
        contentContainer.removeEventListener('scroll', handleScroll);
      }
    };
  });
</script>

<div class="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 text-zinc-100 overflow-x-hidden">
  {#if !isMobile}
    <div class="fixed left-0 top-0 h-full">
      <Sidebar activeItem="" />
    </div>
  {/if}

  <main class={`${isMobile ? 'ml-0' : 'ml-16 md:ml-20 lg:ml-64'} transition-all duration-300`}>
    <!-- Barra de progresso -->
    <div class="h-1 bg-zinc-700 w-full fixed top-0 z-20">
      <div
        class="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-300"
        style={`width: ${readingProgress}%`}
      ></div>
    </div>

    <div class="container mx-auto px-4 py-4 md:py-20 max-w-4xl">
      <header class="mb-6 md:mb-12 text-center">
        <div class="flex justify-between items-center mb-4 md:mb-6">
          <button
            on:click={() => history.back()}
            class="flex items-center text-zinc-400 hover:text-zinc-200 transition-colors text-sm md:text-base cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
            Voltar
          </button>

          <div class="flex items-center space-x-2 md:space-x-4">
            <button
              aria-label={isBookmarked ? "Remover bookmark" : "Adicionar bookmark"}
              on:click={toggleBookmark}
              class={`cursor-pointer p-1 md:p-2 rounded-full ${isBookmarked ? 'text-yellow-400' : 'text-zinc-400 hover:text-zinc-200'}`}
              title={isBookmarked ? "Remover bookmark" : "Adicionar bookmark"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            </button>
          </div>
        </div>

        <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 to-zinc-300 mb-2 md:mb-4 leading-tight">
          {post.title}
        </h1>

        <div class="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs md:text-sm text-zinc-400">
          <span>Por @{post.username}</span>
          <span>•</span>
          <span>{
            new Date(post.created_at).toLocaleString('pt-BR', {
                dateStyle: 'short',
                timeStyle: 'short',
            })
          }</span>
        </div>

        {#if post.tags.length > 0}
          <div class="flex flex-wrap justify-center gap-2 mt-4 md:mt-6">
            {#each post.tags as tag}
              <span
                class="px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium"
                style={`background-color: ${tag.color}; color: white`}
              >
                {tag.name}
              </span>
            {/each}
          </div>
        {/if}
      </header>

      <div bind:this={contentContainer} class="content max-h-[70vh] md:max-h-[65vh] rounded-lg md:rounded-xl bg-zinc-900 px-4 py-4 md:px-6 md:py-8 shadow-inner overflow-y-auto">
        <article class="prose prose-invert max-w-none prose-sm md:prose-lg break-words overflow-x-hidden">
          {@html post.content}
        </article>

        <div class="mt-8 md:mt-16 pt-4 md:pt-8 border-t border-zinc-700">
          <Reaction reactions={post.reactions} postUUID={post.uuid} readOnly={false}/>
        </div>
      </div>

      {#if showScrollIndicator}
        <div class="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-zinc-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      {/if}
    </div>
  </main>
</div>


{#if $showAlert}
  <Alert message={$alertMessage} type={$alertType} title={$alertTitle}/>
{/if}

<style global>
  .content {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  
  .content::-webkit-scrollbar {
    display: none;
  }
  
  .prose {
    font-size: 0.875rem;
  }
  
  @media (min-width: 768px) {
    .prose {
      font-size: 1.125rem;
    }
  }
  
</style>