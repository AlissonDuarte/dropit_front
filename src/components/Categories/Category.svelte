<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  export let categories = [];
  export let selectedCategories = [];

  let searchTerm = '';
  let isOpen = false;
  let highlightedIndex = -1; // para navegação por teclado
  const dispatch = createEventDispatcher();

  const toggleCategory = (category) => {
    if (selectedCategories.some(c => c.uuid === category.uuid)) {
      selectedCategories = selectedCategories.filter(c => c.uuid !== category.uuid);
    } else {
      selectedCategories = [...selectedCategories, category];
    }
    dispatch('change', selectedCategories);
  };

  const removeCategory = (uuid) => {
    selectedCategories = selectedCategories.filter(c => c.uuid !== uuid);
    dispatch('change', selectedCategories);
  };

  const filteredCategories = () => {
    return categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.group.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.dropdown-container')) {
      isOpen = false;
      highlightedIndex = -1;
    }
  };

  // Navegação por teclado no dropdown
  function onInputKeydown(event) {
    const items = filteredCategories();
    if (!isOpen) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        isOpen = true;
        event.preventDefault();
        highlightedIndex = 0;
      }
      return;
    }
    switch (event.key) {
      case 'ArrowDown':
        highlightedIndex = (highlightedIndex + 1) % items.length;
        event.preventDefault();
        break;
      case 'ArrowUp':
        highlightedIndex = (highlightedIndex - 1 + items.length) % items.length;
        event.preventDefault();
        break;
      case 'Enter':
        if (highlightedIndex >= 0 && items[highlightedIndex]) {
          toggleCategory(items[highlightedIndex]);
          event.preventDefault();
        }
        break;
      case 'Escape':
        isOpen = false;
        highlightedIndex = -1;
        event.preventDefault();
        break;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div 
class="dropdown-container space-y-2 relative cursor-pointer" 
role="combobox" 
aria-haspopup="listbox"
aria-expanded={isOpen} 
aria-owns="category-list" 
aria-controls="category-list" 
aria-label="Selecionar categorias"
>
  <div class="relative">
    <input
      type="text"
      bind:value={searchTerm}
      on:focus={() => { isOpen = true; highlightedIndex = -1; }}
      placeholder="Pesquisar categorias..."
      class="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-transparent placeholder-zinc-500 text-zinc-100"
      role="searchbox"
      aria-autocomplete="list"
      aria-activedescendant={highlightedIndex >= 0 ? `category-${filteredCategories()[highlightedIndex].uuid}` : undefined}
      on:keydown={onInputKeydown}
    />
    <button
      on:click={() => { isOpen = !isOpen; if (!isOpen) highlightedIndex = -1; }}
      class="absolute right-3 top-3 text-zinc-400 hover:text-zinc-200"
      aria-label={isOpen ? "Fechar lista de categorias" : "Abrir lista de categorias"}
      type="button"
    >
      {#if isOpen}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      {/if}
    </button>
  </div>
  {#if selectedCategories.length > 0}
    <div class="flex flex-wrap gap-2 mt-2" aria-label="Categorias selecionadas" role="list">
        {#each selectedCategories as category}
        <div
            class="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium"
            style={`background-color: ${category.color}; color: white`}
            role="listitem"
        >
            {category.name}
            <button
            on:click|stopPropagation={() => removeCategory(category.uuid)}
            class="text-white hover:text-zinc-200"
            aria-label={`Remover categoria ${category.name}`}
            type="button"
            >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            </button>
        </div>
        {/each}
    </div>
  {/if}
  {#if isOpen}
    {#if filteredCategories().length > 0}
    <ul
    id="category-list"
    role="listbox"
    class="cursor-pointer absolute z-10 w-full mt-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg max-h-[50vh] overflow-y-auto custom-scrollbar"
    tabindex="-1"
    >
        {#each filteredCategories() as category, i}
            <li
                id={"category-" + category.uuid}
                role="option"
                aria-selected={selectedCategories.some(c => c.uuid === category.uuid)}
                tabindex="0"
                on:click|stopPropagation={() => {
                    if (selectedCategories.length < 3 || selectedCategories.some(c => c.uuid === category.uuid)) {
                    toggleCategory(category);
                    }
                }}
                on:keydown|stopPropagation={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && (selectedCategories.length < 3 || selectedCategories.some(c => c.uuid === category.uuid))) {
                    e.preventDefault();
                    toggleCategory(category);
                    }
                }}
                on:mouseover={() => highlightedIndex = i}
                on:focus={() => highlightedIndex = i}
                class={`transition-colors px-4 py-2 text-sm flex items-center gap-2 rounded cursor-pointer
                    ${selectedCategories.length >= 3 && !selectedCategories.some(c => c.uuid === category.uuid)
                    ? 'cursor-not-allowed opacity-40 pointer-events-none' : 'hover:text-white text-zinc-200'}
                `}
                style="background-color: {highlightedIndex === i ? category.color + '33' : (selectedCategories.some(c => c.uuid === category.uuid) ? '#444' : 'transparent')}"
            >
            <div class="w-3 h-3 rounded-full" style={`background-color: ${category.color}`}></div>
            <span>{category.name}</span>
            <span class="text-xs text-zinc-400 ml-2">{category.group}</span>
            </li>
        {/each}
      </ul>
    {:else}
      <div class="absolute z-10 w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg px-4 py-2 text-zinc-400">
        Nenhuma categoria encontrada
      </div>
    {/if}
  {/if}
</div>


<style>
  .dropdown-container {
    min-width: 300px;
  }
  /* Custom scrollbar (opcional) */
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background-color: #222;
  }
</style>
