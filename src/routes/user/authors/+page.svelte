<script>
  import Blackcat from '../../../components/Headers/Blackcat.svelte';
  import Sidebar from '../../../components/General/Sidebar.svelte';
  import FeedUser from '../../../components/User/FeedUser.svelte';
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
  let users = [];
  let isLoading = true;
  let page = 1;
  let hasMore = true;
  let searchQuery = '';

  // Função para buscar posts com filtros
  async function fetchUsers(reset = false) {
    if (isLoading && !reset) return;
    
    isLoading = true;
    if (reset) {
      page = 1;
      hasMore = true;
    }

    try {
      const url = new URL(`${API_URL}/users/preview`);
      url.searchParams.append('page', page);
      
      if (searchQuery && searchQuery.length > 2) {
        url.searchParams.append('search', searchQuery);
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      const data = await response.json();
      
      if (!response.ok) {
            triggerAlert('error', 'Erro', 'Erro ao buscar posts do servidor');
      }

      if (data.length === 0) {
        hasMore = false;
        if (page === 1) {
          triggerAlert('info', 'Nenhum post encontrado', 'Nenhum post foi encontrado com esses critérios.');
        }
      } else {
        const newUsers = data.map(user => ({
            id: user.uuid,
            username: user.username || 'Autor desconhecido',
            bio: user.bio,
            profilePicture: user.photo_url || '',
            lastPost: user.last_post_date || '',
            tags: user.top_tags || [],
        }));

        users = reset ? newUsers : [...users, ...newUsers];
        page++;
      }
    } catch(error) {
      triggerAlert(
        'error',
        'Erro ao buscar users',
        error.message || 'Ocorreu um erro ao buscar usuarios, por favor tente novamente.'
      );
    } finally {
      isLoading = false;
    }
  }

  const handleSearch = debounce(() => {
    fetchUsers(true);
  }, 500);



  function handleScroll() {
    if (!browser || isLoading || !hasMore) return;
    
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.body.offsetHeight;
    const threshold = 500;

    if (pageHeight - scrollPosition < threshold) {
      fetchUsers();
    }
  }

  onMount(() => {
    if (browser) {
      fetchUsers(true);
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
  <div class="hidden md:block mr-4 lg:mr-8">
    <Sidebar activeItem="authors" />
  </div>
  
  <main class="flex-1 px-4 sm:px-6 py-12 overflow-auto max-w-7xl mx-auto">
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
            placeholder="Buscar usuários..."
            class="w-full bg-zinc-700 text-zinc-100 rounded-lg px-4 py-2 pl-10
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <svg class="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" 
               fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>
    </header>

    <div class="flex justify-center">
      <FeedUser {users} cssClass="w-full" />
    </div>

    {#if isLoading && users.length > 0}
      <div class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    {/if}
    
    {#if !hasMore && users.length > 0}
      <div class="text-center py-8 text-zinc-400">
          Você chegou ao final da lista
      </div>
    {/if}
  </main>
</div>

{#if $showAlert}
  <Alert message={$alertMessage} type={$alertType} title={$alertTitle}/>
{/if}