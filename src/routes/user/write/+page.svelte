<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { API_URL } from '../../../config';
  import { 
    triggerAlert, 
    showAlert, 
    alertMessage, 
    alertTitle,
    alertType 
  } from '../../../stores/alerts';
  import Alert from '../../../components/General/Alert.svelte';
  import Category from '../../../components/Categories/Category.svelte';
  import Sidebar from '../../../components/General/Sidebar.svelte';
  
  let title = '';
  let content = '';
  let isLoading = false;
  let characterCount = 0;
  let categories = [];
  const maxCharacters = 2000;
  
  let selectedCategories = [];
  const maxCategories = 4;
  
  $: characterCount = content.length;
  $: remainingCharacters = maxCharacters - characterCount;
  $: isOverLimit = characterCount > maxCharacters;
  $: remainingCategories = maxCategories - selectedCategories.length;
  
 const toggleCategory = (category) => {
    const isSelected = selectedCategories.some(c => c.uuid === category.uuid);
    if (isSelected) {
        selectedCategories = selectedCategories.filter(c => c.uuid !== category.uuid);
    } else if (selectedCategories.length < maxCategories) {
        selectedCategories = [...selectedCategories, category];
    }
    };

  
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      const data = await response.json();
      categories = data;
    } catch (error) {
      triggerAlert(
        'error',
        'Erro ao carregar categorias',
        'Ocorreu um erro ao carregar as categorias.'
      )
    }
  }
  const handlePostCreate = async () => {
    if (!content.trim() || isOverLimit) return;
    
    isLoading = true;
    
    try {
      const response = await fetch(`${API_URL}/posts/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          title: title,
          content: content,
          categories: selectedCategories.map(c => c.uuid)
        })
      });

      const status_code = response.status;
      if (status_code === 201) {
        isLoading = false;
        triggerAlert('error', 'Post criado com sucesso', 'O post foi criado com sucesso.');
        title = '';
        content = '';
        selectedCategories = [];

      } else {
        isLoading = false;
        triggerAlert(
          'error',
          'Erro ao criar post',
          'Ocorreu um erro ao criar o post.'
        )
      }
    } catch (error) {
      triggerAlert(
        'error',
        'Erro ao criar post',
        'Ocorreu um erro ao criar o post.'
      )
    }
  };

  onMount(() => {
    fetchCategories();
  });
</script>

<div class="flex min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 text-zinc-100">
  <div class="mr-8">
    <Sidebar activeItem="write" />
  </div>
  
  
  <main class="flex-1 px-4 py-12 overflow-auto">
    <div class="container mx-auto max-w-3xl">
      <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 to-zinc-400 mb-2">
          Compartilhe seu pensamento
        </h1>
        <p class="text-zinc-400">
          Escreva o que está em sua mente. Seja breve ou detalhado, o importante é se expressar.
        </p>
      </header>
      
      <div class="space-y-6">
        <!-- Campo de título -->
        <div class="space-y-2">
          <label for="title" class="block text-sm font-medium text-zinc-300">
            Título (opcional)
          </label>
          <input
            id="title"
            bind:value={title}
            type="text"
            maxlength="100"
            placeholder="Dê um título ao seu post..."
            class="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-transparent placeholder-zinc-500 text-zinc-100"
          />
        </div>
        
        <!-- Campo de conteúdo -->
        <div class="space-y-2">
          <label for="content" class="block text-sm font-medium text-zinc-300">
            Conteúdo
          </label>
          <textarea
            id="content"
            bind:value={content}
            rows="8"
            maxlength={maxCharacters}
            placeholder="Escreva aqui o que deseja compartilhar..."
            class="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-transparent placeholder-zinc-500 text-zinc-100 resize-none"
          ></textarea>
          <div class="flex justify-between items-center text-xs text-zinc-400">
            <span class={isOverLimit ? 'text-red-400' : ''}>
              {characterCount}/{maxCharacters} caracteres
            </span>
            {#if isOverLimit}
              <span class="text-red-400">
                Você excedeu o limite de caracteres
              </span>
            {/if}
          </div>
        </div>
        
        <div class="space-y-2">
          <label for ="categories" class="block text-sm font-medium text-zinc-300">
            Categorias (opcional)
          </label>
          <Category 
            categories={categories} 
            bind:selectedCategories 
          />
          <p class="text-xs text-zinc-500">
            Selecione até 3 categorias que melhor representem seu conteúdo
          </p>
        </div>
        <!-- Botão de publicação -->
        <div class="pt-4">
          <button
            on:click={handlePostCreate}
            disabled={!content.trim() || isOverLimit || isLoading}
            class="w-full py-3 px-6 bg-gradient-to-r from-zinc-700 to-zinc-600 hover:from-zinc-600 hover:to-zinc-500 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center cursor-pointer"
          >
            {#if isLoading}
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Publicando...
            {:else}
              Publicar
            {/if}
          </button>
        </div>
      </div>
    </div>
  </main>
</div>


{#if $showAlert}
  <Alert message={$alertMessage} type={$alertType} title={$alertTitle}/>
{/if}

<style>
  textarea {
    min-height: 200px;
    scrollbar-width: thin;
    scrollbar-color: #3f3f46 #27272a;
  }
  
  textarea::-webkit-scrollbar {
    width: 8px;
  }
  
  textarea::-webkit-scrollbar-track {
    background: #27272a;
    border-radius: 0 4px 4px 0;
  }
  
  textarea::-webkit-scrollbar-thumb {
    background-color: #3f3f46;
    border-radius: 4px;
  }
</style>
