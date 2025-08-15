<script>
  import Blackcat from '../../../components/Headers/Blackcat.svelte';
  import Sidebar from '../../../components/General/Sidebar.svelte';
  import Feed from '../../../components/Feed/Feed.svelte';
  import Alert from '../../../components/General/Alert.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { debounce } from 'lodash-es';
  import { API_URL } from '../../../config';
  import { 
    triggerAlert, 
    showAlert, 
    alertMessage, 
    alertTitle,
    alertType 
  } from '../../../stores/alerts';
  
  // Variáveis de estado
  let posts = [];
  let isLoading = true;
  let page = 1;
  let hasMore = true;
  let searchQuery = '';
  let selectedTag = 'Todas';
  let tags = ['Todas', 'Tecnologia', 'Design', 'Negócios', 'Arte'];

  // Função para buscar posts com filtros
  async function fetchPosts(reset = false) {
    if (isLoading && !reset) return;
    
    isLoading = true;
    if (reset) {
      page = 1;
      hasMore = true;
    }

    try {
      const url = new URL(`${API_URL}/posts/bookmarked`);
      url.searchParams.append('page', page);
      
      if (searchQuery && searchQuery.length > 2) {
        url.searchParams.append('search', searchQuery);
      }
      
      if (selectedTag !== 'Todas') {
        url.searchParams.append('tag', selectedTag);
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error('Erro ao buscar posts');
      }

      if (data.length === 0) {
        hasMore = false;
        if (page === 1) {
          triggerAlert('info', 'Nenhum post encontrado', 'Você não tem posts salvos nos seus favoritos.');
        }
      } else {
        const newPosts = data.map(post => ({
          uuid: post.uuid,
          title: post.title,
          author: post.username || 'Autor desconhecido',
          date:new Date(post.created_at).toLocaleString('pt-BR', {
                dateStyle: 'short',
                timeStyle: 'short',
            }),
          content: post.content,
          likes: post.reactions?.length || post.likes || 0,
          comments: post.comments || [],
          isLiked: post.isLiked || false,
          isBookmarked: post.is_bookmarked || false,
          tags: post.tags || [],
          reactions: post.reactions
        }));

        posts = reset ? newPosts : [...posts, ...newPosts];
        page++;
      }
    } catch(error) {
      triggerAlert(
        'error',
        'Erro ao buscar posts',
        error.message || 'Ocorreu um erro ao buscar os posts, por favor tente novamente.'
      );
    } finally {
      isLoading = false;
    }
  }

  const handleSearch = debounce(() => {
    fetchPosts(true);
  }, 500);

  function selectTag(tag) {
    selectedTag = tag;
    fetchPosts(true);
  }

  function clearSearch() {
    searchQuery = '';
    selectedTag = 'Todas';
    fetchPosts(true);
  }

  function handleScroll() {
    if (!browser || isLoading || !hasMore) return;
    
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.body.offsetHeight;
    const threshold = 500;

    if (pageHeight - scrollPosition < threshold) {
      fetchPosts();
    }
  }

  onMount(() => {
    if (browser) {
      fetchPosts(true);
      window.addEventListener('scroll', handleScroll);
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener('scroll', handleScroll);
    }
  });
</script>

<div class="flex min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 text-zinc-100">
  <div class="mr-8">
    <Sidebar activeItem="bookmarked" />
  </div>
  <main class="flex-1 px-4 py-12 overflow-auto">
    <header class="container mx-auto px-4 py-8 flex flex-col items-center gap-6">
      <a href="/" class="hover:scale-105 transition-transform duration-300">
        <Blackcat size="md" />
      </a>
      
      <div class="w-full max-w-2xl space-y-4">
        <div class="relative">
          <input 
            type="text" 
            bind:value={searchQuery}
            on:input={handleSearch}
            placeholder="Buscar posts por título ou conteúdo..."
            class="w-full bg-zinc-700 text-zinc-100 rounded-lg px-4 py-2 pl-10
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <svg class="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" 
               fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          
          {#if searchQuery || selectedTag !== 'Todas'}
            <button 
              on:click={clearSearch}
              class="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-200" aria-label="Limpar busca"
              title="Limpar busca"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </button>
          {/if}
        </div>
        
      </div>
    </header>

  <div class="container mx-auto px-4">
    <Feed {posts} cssClass="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-free" />
  </div>
    
    {#if isLoading && posts.length > 0}
      <div class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    {/if}
    
    {#if !hasMore && posts.length > 0}
      <div class="text-center py-8 text-zinc-400">
        {#if searchQuery || selectedTag !== 'Todas'}
          Não há mais posts que correspondam à sua busca.
        {:else}
          Você chegou ao final do feed
        {/if}
      </div>
    {/if}
  </main>
</div>

{#if $showAlert}
  <Alert message={$alertMessage} type={$alertType} title={$alertTitle}/>
{/if}