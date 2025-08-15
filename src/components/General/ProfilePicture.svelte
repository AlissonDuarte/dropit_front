<script>
  import { createEventDispatcher } from 'svelte';

  let file;
  let previewUrl = "";
  const dispatch = createEventDispatcher();

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      alert("Por favor, selecione um arquivo de imagem válido.");
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("A imagem deve ter até 5MB.");
      return;
    }

    file = selectedFile;

    previewUrl = URL.createObjectURL(file);

    processFile(file);
  }

  function processFile(file) {
    const formData = new FormData();
    formData.append('photo', file);

    dispatch('photoSelected', { formData });
  }
</script>

<div class="flex flex-col items-center gap-3">
  <label
    for="profilePhoto"
    class="cursor-pointer rounded-full border-2 border-zinc-600 hover:border-emerald-500 transition-colors w-28 h-28 flex items-center justify-center overflow-hidden bg-zinc-700"
    title="Clique para selecionar uma foto"
  >
    {#if previewUrl}
      <img src={previewUrl} alt="Pré-visualização da foto de perfil" class="w-full h-full object-cover" />
    {:else}
      <span class="text-zinc-500">Clique para escolher</span>
    {/if}
  </label>

  <input
    id="profilePhoto"
    type="file"
    accept="image/*"
    class="hidden"
    on:change={handleFileChange}
  />
</div>
