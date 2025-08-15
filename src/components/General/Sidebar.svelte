<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  
  export let activeItem = ''; 
  export let isOpen = false;
  let isMobile = false;

  const sidebarItems = [
    { name: 'feed', label: 'Feed', iconSVG: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'},
    { name: 'write', label: 'Escrever', iconSVG: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'},
    { name: 'profile', label: 'Perfil', iconSVG: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'},
    { name: 'bookmarked', label: 'Favoritos', iconSVG: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'},
    { name: 'authors', label: 'Usuários', iconSVG: 'M12 4.354a4 4 0 110 4.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' }
  ]
  onMount(() => {
    const update = () => {
      isMobile = window.innerWidth < 768;
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  });

  function toggleSidebar() {
    isOpen = !isOpen;
    if (!isOpen && !isMobile) {
      activeItem = 'feed';
    }
  }
</script>
<style>
  .sidebar-collapsed {
    overflow: hidden;
  }
</style>


<div class="fixed top-0 left-0 z-50">
{#if isOpen}
    <aside in:fade out:fade class="w-64 h-screen fixed bg-zinc-800/90 text-zinc-100 border-r border-zinc-700 backdrop-blur-sm flex flex-col z-40">
      <div class="flex items-center justify-between h-20 border-b border-zinc-700/50 px-4">
        <a href="/" class="hover:scale-105 transition-transform duration-300">
          <h1 class="text-2xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-slate-500">
            Refúgio
          </h1>
        </a>
        <button
          aria-label="toggle sidebar"
          on:click={toggleSidebar}
          class="cursor-pointer transition-all duration-300"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      
      <nav class="mt-2 flex-1">
        <ul class="space-y-2 px-4">
          {#each sidebarItems as item}
            <li>
              <a href="/user/{item.name}" class={`flex items-center px-4 py-3 rounded-lg transition-all ${activeItem === item.name ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.iconSVG}/>
                </svg>
                <span>{item.label}</span>
              </a>
            </li>
          {/each}

        </ul>
      </nav>
      
      <div class="p-4 border-t border-gray-700 mt-auto">
        <a href="/about" class={`flex items-center px-4 py-3 rounded-lg transition-all ${activeItem === 'about' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>Sobre</span>
        </a>
        
        <a href="/logout" class="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-all mt-2">
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          <span>Sair</span>
        </a>
      </div>
  </aside>
{:else}

  <button
    on:click={toggleSidebar}
    aria-label="Abrir sidebar"
    class="fixed top-4 left-4 z-50 p-2 bg-zinc-800 text-zinc-100 rounded shadow hover:bg-zinc-700 transition-all duration-300 cursor-pointer"
  >
    <!-- Ícone hamburger -->
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
{/if}
</div>