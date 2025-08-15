<script>
  import Blackcat from '../../../components/Headers/Blackcat.svelte';
  import Sidebar from '../../../components/General/Sidebar.svelte';
  import Alert from '../../../components/General/Alert.svelte';
  import { validatePassword, validatePasswordRules } from '../../../utils/passwords';
  import { API_URL } from '../../../config';
  import { 
    triggerAlert, 
    showAlert, 
    alertMessage, 
    alertTitle,
    alertType 
  } from '../../../stores/alerts';
  import { onMount } from 'svelte';

  let isLoading = false;
  let selectedImageFile = null;

  let user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
    profilePicture: ''
  };


  async function fetchUser() {
    isLoading = true;
    const response = await fetch(`${API_URL}/user/profile`,
      {
        method: 'GET',
        credentials: 'include'
      }
    );
    const data = await response.json();
    user.username = data.username || '';
    user.email = data.email || '';
    user.bio = data.bio || '';
    user.profilePicture = data.photo_url || '';
    isLoading = false;
  }


  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      selectedImageFile = file;  

      const reader = new FileReader();
      reader.onload = (e) => {
        user.profilePicture = e.target.result; 
      };
      reader.readAsDataURL(file);
    }
  }

  async function saveProfile() {
    isLoading = true;

    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('bio', user.bio);

    if (user.password.trim() !== '') {

      try {
        validatePassword(user.password, user.confirmPassword);
      } catch (error) {
        isLoading = false;
        triggerAlert('error', 'Erro ao atualizar senha', error.message);
        return;
      }
      formData.append('password', user.password);
      formData.append('confirm_password', user.confirmPassword);
    }

    if (selectedImageFile) {
      formData.append('profile_picture', selectedImageFile);
    }

    try {
      const response = await fetch(`${API_URL}/user/profile`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      });

      if (response.ok) {
        triggerAlert('success', 'Perfil atualizado com sucesso!', 'Sucesso');
        fetchUser(); 
      } else {
        const errorData = await response.json();
        triggerAlert('error', errorData.message || 'Erro ao atualizar perfil', 'Erro');
      }
    } catch (error) {
      triggerAlert('error', 'Erro na requisição', 'Erro');
    }

    isLoading = false;
  }
  async function removeProfilePicture() {
    if (!confirm("Tem certeza que deseja remover sua foto de perfil?")) return;

    isLoading = true;

    try {
      const response = await fetch(`${API_URL}/user/profile/remove_picture`, {
        method: 'PATCH',
        credentials: 'include'
      });

      if (response.ok) {
        triggerAlert('success', 'Foto de perfil removida com sucesso.', 'Sucesso');
        await fetchUser();
      } else {
        const errorData = await response.json();
        triggerAlert('error', errorData.message || 'Erro ao remover foto', 'Erro');
      }
    } catch (error) {
      triggerAlert('error', 'Erro na requisição ao remover foto', 'Erro');
    }

    isLoading = false;
  }
  onMount(() => {
    fetchUser();
  });
</script>

<div class="flex min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 text-zinc-100">
  <div class="mr-8">
    <Sidebar activeItem="profile" />
  </div>

  <main class="flex-1 px-4 py-12 overflow-auto">
    <header class="container mx-auto px-4 py-8 flex flex-col items-center gap-6">
      <a href="/" class="hover:scale-105 transition-transform duration-300">
        <Blackcat size="md" />
      </a>
      <h1 class="text-3xl font-bold text-zinc-100">Meu Perfil</h1>
    </header>

    <section class="container mx-auto max-w-xl px-4">
      <div class="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 shadow-lg">
        <form on:submit|preventDefault={saveProfile} class="space-y-6">
          <!-- Foto de perfil -->
          <div class="flex items-start gap-6">
          <!-- Foto de Perfil -->
          <div class="flex flex-col items-center gap-2">
            <div class="w-20 h-20 rounded-full bg-zinc-700 overflow-hidden flex items-center justify-center text-zinc-400 text-sm">
              {#if user.profilePicture}
                <img 
                  src={user.profilePicture} 
                  alt="Foto de perfil" 
                  class="object-cover w-full h-full"
                  on:error={(e) => e.target.src = `https://ui-avatars.com/api/?name=${user.username}&background=random`}
                />
              {:else}
                Sem foto
              {/if}
            </div>

            {#if !user.profilePicture.startsWith('https://ui-avatars.com')}
              <button
                type="button"
                on:click={removeProfilePicture}
                class="text-red-500 hover:text-red-700 text-xs underline cursor-pointer"
              >
                Remover foto
              </button>
            {/if}
          </div>

          <!-- Upload nova foto -->
          <div class="flex-1">
            <label for="picture" class="text-zinc-300 text-sm block mb-1">Alterar foto</label>
            <input 
              type="file" 
              accept="image/*" 
              id="picture"
              on:change={handleImageChange}
              class="block w-full text-sm text-zinc-400 file:bg-zinc-700 file:text-zinc-300 
                    file:px-3 file:py-1 file:rounded-md file:border-0 file:cursor-pointer"
            />
          </div>
        </div>


          <div>
            <label for="username" class="block text-zinc-300 text-sm mb-1">Usuário</label>
            <input 
              type="text" 
              bind:value={user.username} 
              class="w-full bg-zinc-700 text-zinc-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
            />
          </div>

          <div>
            <label for="email" class="block text-zinc-300 text-sm mb-1">Email</label>
            <input 
              type="email" 
              bind:value={user.email} 
              class="w-full bg-zinc-700 text-zinc-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
            />
          </div>

          <div>
            <label for="password" class="block text-zinc-300 text-sm mb-1">Senha</label>
            <input 
              type="password" 
              bind:value={user.password} 
              placeholder="Deixe em branco para manter"
              class="w-full bg-zinc-700 text-zinc-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
            />
            {#if user.password}
              {#each Object.entries(validatePasswordRules(user.password)) as [rule, passed]}
                <li class={passed ? 'text-green-400' : 'text-red-400'}>
                  {#if rule === 'length'}
                    Mínimo de 8 caracteres
                  {:else if rule === 'uppercase'}
                    Pelo menos uma letra maiúscula
                  {:else if rule === 'lowercase'}
                    Pelo menos uma letra minúscula
                  {:else if rule === 'number'}
                    Pelo menos um número
                  {:else if rule === 'specialChar'}
                    Pelo menos um caractere especial (!@#$%^&*()_+)
                  {/if}
                </li>
              {/each}
            {/if}
          </div>
          {#if user.password}
            <div>
              <label for="confirmPassword" class="block text-zinc-300 text-sm mb-1">Confirmar Senha</label>
              <input
                type="password"
                bind:value={user.confirmPassword}
                placeholder="Confirme a senha"
                class="w-full bg-zinc-700 text-zinc-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            {#if user.password && user.confirmPassword}
              <p class={user.password === user.confirmPassword ? 'text-green-400' : 'text-red-400'}>
                {user.password === user.confirmPassword ? 'As senhas coincidem ✅' : 'As senhas não coincidem ❌'}
              </p>
            {/if}
            </div>
          {/if}
          <div>
            <label for="bio"class="block text-zinc-300 text-sm mb-1">Bio</label>
            <textarea 
              rows="3" 
              bind:value={user.bio} 
              class="w-full bg-zinc-700 text-zinc-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            ></textarea>
          </div>

          <div class="pt-4 border-t border-zinc-700/50 flex justify-end">
            <button 
              type="submit" 
              class="cursor-pointer bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
            >
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
      
    </section>

    {#if isLoading}
      <div class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    {/if}
  </main>
</div>

{#if $showAlert}
  <Alert message={$alertMessage} type={$alertType} title={$alertTitle}/>
{/if}
