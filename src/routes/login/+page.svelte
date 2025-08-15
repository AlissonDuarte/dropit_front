<script>
  import Blackcat from "../../components/Headers/Blackcat.svelte";
  import Alert from "../../components/General/Alert.svelte";
  import { 
    showAlert, 
    alertType, 
    alertTitle, 
    alertMessage,
    triggerAlert 
  } from "../../stores/alerts";
  import { fade } from "svelte/transition";
  import { goto } from "$app/navigation";
  import { API_URL } from '../../config';


  let email = '';
  let password = '';
  let rememberMe = false;
  let isLoading = false;
  let errorMessage = '';
  
  async function handleLogin() {
    if (!email || !password) {
      triggerAlert(
        "warning",
        "Campos obrigatórios",
        "Por favor, preencha todos os campos"
      );
      return;
    }

    isLoading = true;
    
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: password,
          remember: rememberMe
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || "Erro ao fazer login";
        
        triggerAlert(
          "error",
          "Falha no login",
          errorMessage === "Invalid email or password" 
            ? "E-mail ou senha inválidos" 
            : errorMessage
        );
        return;
      }
      
      goto('/user/feed');
      
    } catch (error) {
      triggerAlert(
        "error",
        "Erro inesperado",
        "Ocorreu um erro durante o login"
      );
    } finally {
      isLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Login - Refúgio Anônimo</title>
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
          Acesse sua conta
        </h1>
        <p class="text-zinc-400">
          Entre no seu espaço seguro para compartilhar pensamentos
        </p>
      </div>

            <form on:submit|preventDefault={handleLogin} class="bg-zinc-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-zinc-700 w-full"> <!-- Alterado p-8 para p-6 -->
        {#if errorMessage}
          <div class="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-sm">
            {errorMessage}
          </div>
        {/if}

        <div class="space-y-4"> <!-- Reduzido space-y-6 para space-y-4 -->
          <div>
            <label for="email" class="block text-sm font-medium mb-1 text-zinc-300"> <!-- mb-2 para mb-1 -->
              Email
            </label>
            <input
              type="email"
              id="email"
              bind:value={email}
              class="w-full px-3 py-2 rounded-lg bg-zinc-700 border border-zinc-600 focus:border-teal-400 focus:ring-1 focus:ring-indigo-500 outline-none transition"
              placeholder="seu@email.com"
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
              class="w-full px-3 py-2 rounded-lg bg-zinc-700 border border-zinc-600 focus:border-teal-400 focus:ring-1 focus:ring-indigo-500 outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          <div class="flex items-center justify-between text-sm"> <!-- Adicionado text-sm -->
            <div class="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                bind:checked={rememberMe}
                class="h-4 w-4 rounded bg-zinc-700 border-zinc-600 text-purple-500 focus:ring-purple-500"
              />
              <label for="remember-me" class="ml-2 text-zinc-400">
                Lembrar de mim
              </label>
            </div>

            <a href="/recuperar-senha" class="text-indigo-400 hover:text-indigo-300 transition">
              Esqueceu a senha?
            </a>
          </div>

          <button
            type="submit"
            class="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-teal-600 hover:from-indigo-600 hover:to-teal-700 transition text-white font-medium flex items-center justify-center cursor-pointer" 
            disabled={isLoading}
          >
            {#if isLoading}
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Entrando...
            {:else}
              Entrar
            {/if}
          </button>
        </div>
      </form>

      <div class="mt-6 text-center text-sm text-zinc-500"> <!-- mt-8 para mt-6 -->
        Não tem uma conta?{' '}
        <a href="/register" class="text-indigo-400 hover:text-indigo-300 font-medium transition">
          Cadastre-se
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

{#if $showAlert}
  <Alert message={$alertMessage} type={$alertType} title={$alertTitle}/>
{/if}