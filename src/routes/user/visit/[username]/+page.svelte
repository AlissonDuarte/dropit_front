<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Blackcat from '../../../../components/Headers/Blackcat.svelte';
  import Sidebar from '../../../../components/General/Sidebar.svelte';
  import Alert from '../../../../components/General/Alert.svelte';
  import Feed from '../../../../components/Feed/Feed.svelte';
  import { API_URL } from '../../../../config';
  import {
    triggerAlert,
    showAlert,
    alertMessage,
    alertTitle,
    alertType
  } from '../../../../stores/alerts';
	import { goto } from '$app/navigation';

  
  let user = {
    username: '',
    bio: '',
    profilePicture: '',
    isFollowing: false,
    memberSince: '',
    postsPreview: [],
    totalPosts: 0,
    totalReactions: 0
  };
  let username = $page.params.username;
  let isLoading = true;
  let error = null;

  async function fetchUser() {
    try {
      const response = await fetch(`${API_URL}/user/visit/${username}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      
      const status_code = response.status;
      
      if (status_code === 307) {
        triggerAlert('info', 'Aviso', 'Redirecionando para o seu perfil');
        isLoading = false;
        goto('/user/profile');
        return
      }

      if (status_code === 200 && response.ok) {
        const userData = await response.json();

        user.postsPreview = userData.posts_preview.map(post => ({
          ...post,
          date:new Date(post.created_at).toLocaleString('pt-BR', {
                dateStyle: 'short',
                timeStyle: 'short',
            }),
          isBookmarked: post.is_bookmarked
        }));
        user.username = userData.username;
        user.bio = userData.bio;
        user.profilePicture = userData.photo_url;
        user.isFollowing = userData.is_following;
        user.totalPosts = userData.total_posts;
        user.memberSince = userData.created_at;
        user.totalReactions = userData.total_reactions;
        isLoading = false;

      } else {
        triggerAlert('error', 'Erro', 'Erro ao buscar dados do usuário');
      }
    } catch(error) {
      console.error('Erro ao buscar dados do usuário:', error);
      triggerAlert('error', 'Erro', 'Ocorreu um erro interno ao buscar dados do servidor');
      isLoading = false;
    }
  }
  onMount(() => {
    fetchUser();
  });

  function toggleFollow() {
    user.isFollowing = !user.isFollowing;
  }
</script>

<div class="flex min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 text-zinc-100">
  <Sidebar activeItem="authors" class="hidden md:block" />
  
  <main class="flex-1 px-4 py-6 md:py-12 overflow-auto">
    <div class="container mx-auto max-w-4xl">
      <header class="mb-8 md:mb-12 text-center">
        <a href="/" class="inline-block hover:scale-105 transition-transform duration-300">
          <Blackcat size="md" />
        </a>
      </header>

      {#if error}
        <div class="bg-red-900/50 border border-red-700 text-red-100 p-4 rounded-lg mb-6">
          {error}
        </div>
      {:else}
        <section class="bg-zinc-800 rounded-xl shadow-lg p-6 mb-8">
          <div class="flex flex-col md:flex-row items-center gap-6">
            <div class="w-24 h-24 rounded-full bg-zinc-700 flex items-center justify-center text-3xl font-bold">
              <img 
                src={user.profilePicture || 'https://ui-avatars.com/api/?name=' + user.username + '&background=random'} 
                alt="Profile picture of {user.username}" 
                class="w-full h-full rounded-full object-cover" />
            </div>
            
            <div class="flex-1 text-center md:text-left">
              <h1 class="text-2xl md:text-3xl font-bold mb-2">@{user.username}</h1>
              
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-sm md:text-base">
                <div>
                  <p class="text-zinc-400">Membro desde</p>
                  <p class="font-medium">{user.memberSince}</p>
                </div>
                <div>
                  <p class="text-zinc-400">Posts</p>
                  <p class="font-medium flex">{user.totalPosts}</p>
                </div>
                <div>
                  <p class="text-zinc-400">Reações</p>
                  <div class="grid grid-cols-2 gap-2 mt-1">
                  <div class="flex items-center" title="Curti">
                      <svg class="w-4 h-4 text-blue-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                      </svg>
                    <span>{user.totalReactions.like}</span>
                  </div>
                    <div class="flex items-center" title="Triste">
                      <svg class="w-5 h-5 text-slate-900 mr-2" viewBox="0 0 256 256">
                          <path fill="yellow" stroke="currentColor" stroke-width="12" d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Z"/>
                          <path fill="currentColor" d="M80,108a12,12,0,1,1,12,12A12,12,0,0,1,80,108Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,176,108Z"/>
                          <path fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" d="M174.92,172a8,8,0,1,1-13.84,8c-7.47-12.91-19.21-20-33.08-20s-25.61,7.1-33.08,20a8,8,0,1,1-13.84-8c10.29-17.79,27.39-28,46.92-28S164.63,154.2,174.92,172Z"/>
                      </svg>
                      <span>{user.totalReactions.sad}</span>
                    </div>
                        <div class="flex items-center" title="Apoio">
                        <svg fill="currentColor" class="w-5 h-5 text-emerald-500" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                        </svg>
                      <span>{user.totalReactions.support}</span>
                    </div>
                    <div class="flex items-center" title="Amei">
                      <svg class="w-4 h-4 text-red-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                      </svg>
                      <span>{user.totalReactions.love}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              on:click={toggleFollow}
              class="px-6 py-2 rounded-full font-medium transition-colors
                    {user.isFollowing 
                      ? 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600' 
                      : 'bg-blue-600 hover:bg-blue-500 text-white'}"
            >
              {user.isFollowing ? 'Seguindo' : 'Seguir'}
            </button>
          </div>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold mb-4 px-2">Posts de @{user.username}</h2>
          
          {#if isLoading}
            <div class="flex justify-center py-12">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          {:else}
            {#if user.postsPreview.length === 0}
              <div class="bg-zinc-800/50 rounded-lg p-8 text-center text-zinc-400">
                Nenhum post encontrado
              </div>
            {:else}
              <Feed posts={user.postsPreview} cssClass="space-y-6 max-w-3xl mx-auto cursor-pointer" />
            {/if}
          {/if}
        </section>
      {/if}
    </div>
  </main>
</div>

{#if $showAlert}
  <Alert message={$alertMessage} type={$alertType} title={$alertTitle}/>
{/if}