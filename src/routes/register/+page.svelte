<script>
    import { goto } from '$app/navigation';
    import { API_URL } from '../../config';
    import { validatePassword, validatePasswordRules } from '../../utils/passwords';
    import Blackcat from "../../components/Headers/Blackcat.svelte";
    import ProfilePicture from '../../components/General/ProfilePicture.svelte';
    
  let email = '';
  let username = '';
  let password = '';
  let confirmPassword = '';
  let bio = '';
  let profilePicture = '';
  let isLoading = false;
  let errorMessage = '';
  let successMessage = '';

async function handleRegister() {
  errorMessage = '';
  successMessage = '';

  if (!email || !username || !password || !confirmPassword) {
    errorMessage = 'Por favor, preencha todos os campos';
    return;
  }
  
  try {
    validatePassword(password, confirmPassword);
  } catch (error) {
    errorMessage = error.message;
    return;
  }

  isLoading = true;

  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('confirm_password', confirmPassword);
    formData.append('bio', bio || '');

    if (profilePicture instanceof File) {
      formData.append('photo', profilePicture);
    }

    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      errorMessage = data.detail || 'Erro ao cadastrar';
      return;
    }

    successMessage = 'Cadastro realizado com sucesso! Redirecionando...';
    await new Promise(resolve => setTimeout(resolve, 2000));
    goto('/login');

  } catch (error) {
    console.error('Registration error:', error);
    errorMessage = 'Erro de conexão com o servidor';
  } finally {
    isLoading = false;
  }
}
</script>

<svelte:head>
  <title>Cadastro - Refúgio Anônimo</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 text-zinc-100 flex flex-col">
  <!-- Header -->
  <header class="container mx-auto px-4 py-8 flex justify-center">
    <a href="/" class="hover:scale-105 transition-transform duration-300">
      <Blackcat size="md" />
    </a>
  </header>

  <main class="flex-grow flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-sm mx-auto">
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-teal-500">
          Crie sua conta
        </h1>
        <p class="text-zinc-400">
          Junte-se à nossa comunidade para compartilhar pensamentos anonimamente
        </p>
      </div>

      <form on:submit|preventDefault={handleRegister} class="bg-zinc-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-zinc-700 w-full">
        {#if errorMessage}
          <div class="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-sm">
            {errorMessage}
          </div>
        {/if}
        
        {#if successMessage}
          <div class="mb-4 p-3 bg-teal-900/50 border border-teal-700 rounded-lg text-sm">
            {successMessage}
          </div>
        {/if}
        
        <ProfilePicture on:photoSelected={profilePicture} />

        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium mb-1 text-zinc-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              bind:value={email}
              class="w-full px-3 py-2 rounded-lg bg-zinc-700 border border-zinc-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label for="username" class="block text-sm font-medium mb-1 text-zinc-300">
              Nome de usuário
            </label>
            <input
              type="text"
              id="username"
              bind:value={username}
              class="w-full px-3 py-2 rounded-lg bg-zinc-700 border border-zinc-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
              placeholder="seu_nome"
              required
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium mb-1 text-zinc-300">
              Senha
            </label>
            <input
              type="password"
              id="password"
              bind:value={password}
              class="w-full px-3 py-2 rounded-lg bg-zinc-700 border border-zinc-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
              placeholder="••••••••"
              required
            />
            {#each Object.entries(validatePasswordRules(password)) as [rule, passed]}
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
          </div>

          <div>
            <label for="confirm-password" class="block text-sm font-medium mb-1 text-zinc-300">
              Confirme sua senha
            </label>
            <input
              type="password"
              id="confirm-password"
              bind:value={confirmPassword}
              class="w-full px-3 py-2 rounded-lg bg-zinc-700 border border-zinc-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
              placeholder="••••••••"
              required
            />
            {#if password && confirmPassword}
              <p class={password === confirmPassword ? 'text-green-400' : 'text-red-400'}>
                {password === confirmPassword ? 'As senhas coincidem ✅' : 'As senhas não coincidem ❌'}
              </p>
            {/if}
          </div>

          
          <div class="mb-4">
            <label for="bio" class="block text-sm font-semibold mb-2 text-zinc-300">
              Escreva uma bio
            </label>
            <textarea
              id="bio"
              bind:value={bio}
              rows="4"
              class="w-full px-4 py-3 rounded-lg bg-zinc-700 border border-zinc-600 text-zinc-100 placeholder-zinc-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition resize-none"
              placeholder="Descreva a si mesmo ou coisas que você gosta."
              aria-describedby="bioHelp"
              required
            ></textarea>
            <p id="bioHelp" class="mt-1 text-xs text-zinc-500">
              Conte um pouco sobre você — seus interesses, hobbies ou qualquer coisa que queira compartilhar.
            </p>
          </div>

          <button
            type="submit"
            class="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-teal-600 hover:from-indigo-600 hover:to-teal-700 transition text-white font-medium flex items-center justify-center" 
            disabled={isLoading}
          >
            {#if isLoading}
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Cadastrando...
            {:else}
              Cadastrar
            {/if}
          </button>
        </div>
      </form>

      <div class="mt-6 text-center text-sm text-zinc-500">
        Já tem uma conta?{' '}
        <a href="/login" class="text-purple-400 hover:text-purple-300 font-medium transition">
          Faça login
        </a>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="py-6 text-center text-sm text-zinc-500 border-t border-zinc-800">
    <div class="container mx-auto px-4">
      © {new Date().getFullYear()} Refúgio Anônimo. Todos os direitos reservados.
    </div>
  </footer>
</div>