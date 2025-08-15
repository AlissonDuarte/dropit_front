<script>
  import Blackcat from "../components/Headers/Blackcat.svelte";
  import { fade } from "svelte/transition";
  
  const testimonials = [
    {
      quote: "Sentir alívio ao colocar para fora aquilo que você nunca conseguiu dizer em voz alta.",
      type: "Alívio",
      emoji: "😌"
    },
    {
      quote: "Ter um espaço só seu, onde seus pensamentos podem existir sem filtros ou julgamentos.",
      type: "Liberdade",
      emoji: "🕊️"
    },
    {
      quote: "Descobrir que você não está sozinho... Outros também vivem dilemas parecidos com os seus.",
      type: "Identificação",
      emoji: "🤝"
    },
    {
      quote: "Guardar momentos especiais, sonhos ou desabafos em um lugar seguro e só seu.",
      type: "Memória Segura",
      emoji: "🔐"
    },
    {
      quote: "Ter inspiração para seguir em frente ao explorar o que outras pessoas estão vivendo.",
      type: "Inspiração",
      emoji: "🌱"
    },
    {
      quote: "Sentir-se livre para escrever sobre qualquer coisa… Sem ter que explicar, sem rótulos.",
      type: "Expressão Livre",
      emoji: "📝"
    }
  ];
  
  const features = [
    {
      title: "Anonimato Total",
      description: "Seus posts nunca serão vinculados à sua identidade real. Nós não armazenamos dados pessoais.",
      icon: "🔒",
      color: "text-indigo-400"
    },
    {
      title: "Sem Julgamentos",
      description: "Um espaço seguro para compartilhar até seus pensamentos mais íntimos. Moderação ativa contra trolls.",
      icon: "💖",
      color: "text-pink-400"
    },
    {
      title: "Comunidade Apoiadora",
      description: "Interações positivas que ajudam no seu crescimento pessoal. Reações empáticas em cada post.",
      icon: "👥",
      color: "text-teal-400"
    },
    {
      title: "Categorias Organizadas",
      description: "Encontre exatamente o tipo de conteúdo que procura, desde sonhos até confissões profundas.",
      icon: "🗂️",
      color: "text-purple-400"
    },
    {
      title: "Diário Pessoal",
      description: "Seção privada apenas para você, com criptografia de ponta a ponta para seus pensamentos.",
      icon: "📔",
      color: "text-yellow-400"
    },
    {
      title: "Lembretes Positivos",
      description: "Receba mensagens encorajadoras baseadas no que você compartilhou anteriormente.",
      icon: "⏰",
      color: "text-blue-400"
    }
  ];

  // Estatísticas da plataforma
  const stats = [
    { value: "10k+", label: "Membros ativos" },
    { value: "50k+", label: "Histórias compartilhadas" },
    { value: "24/7", label: "Moderação ativa" },
    { value: "99.9%", label: "Satisfação dos usuários" }
  ];

  // Passos para começar
  const steps = [
    {
      number: "1",
      title: "Crie sua conta",
      description: "Leva menos de 1 minuto. Nenhum dado pessoal necessário."
    },
    {
      number: "2",
      title: "Escolha um avatar",
      description: "Selecione entre nossa coleção de avatares anônimos."
    },
    {
      number: "3",
      title: "Comece a compartilhar",
      description: "Poste na categoria que melhor se encaixa no seu sentimento."
    },
    {
      number: "4",
      title: "Conecte-se",
      description: "Interaja com outras histórias de forma positiva e construtiva."
    }
  ];

  // Perguntas frequentes
  const faqs = [
    {
      question: "Como garantem meu anonimato?",
      answer: "Usamos tecnologia avançada de privacidade que desassocia completamente sua identidade dos seus posts. Nem mesmo nós sabemos quem você é."
    },
    {
      question: "Posso deletar meus posts depois?",
      answer: "Sim, a qualquer momento você pode remover permanentemente qualquer conteúdo que tenha compartilhado."
    },
    {
      question: "Há algum custo para usar a plataforma?",
      answer: "Não, o Refúgio Anônimo é completamente gratuito. Acreditamos que um espaço seguro para desabafar deve ser acessível a todos."
    },
    {
      question: "Como a moderação funciona?",
      answer: "Nossa equipe revisa conteúdo 24/7 para manter a comunidade segura, com diretrizes claras contra discurso de ódio ou assédio."
    }
  ];

  let activeTab = 'all';
  
  const filteredTestimonials = activeTab === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.type.toLowerCase() === activeTab);
</script>

<div class="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 text-zinc-100">
  <!-- Navigation -->
  <nav class="container mx-auto px-4 py-6 flex justify-between items-center">
    <div class="flex items-center space-x-2">

      <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-teal-500">
        Refúgio Anônimo
      </span>
    </div>
    <div class="hidden md:flex space-x-8">
      <a href="#features" class="hover:text-indigo-400 transition">Recursos</a>
      <a href="#testimonials" class="hover:text-indigo-400 transition">Depoimentos</a>
      <a href="#how-it-works" class="hover:text-indigo-400 transition">Como Funciona</a>
      <a href="#faq" class="hover:text-indigo-400 transition">FAQ</a>
    </div>
    <div class="flex items-center space-x-4">
      <a href="/login" class="px-4 py-2 rounded-lg border border-zinc-600 hover:border-indigo-500 transition">Entrar</a>
      <a href="/register" class="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-teal-600 hover:from-indigo-600 hover:to-teal-700 transition">Cadastrar</a>
    </div>
  </nav>

  <!-- Hero Section -->
  <header class="container mx-auto px-4 py-12 md:py-24 flex flex-col items-center">
    <div class="mb-8 hover:scale-105 transition-transform duration-300">
      <Blackcat />
    </div>
    <h1 class="text-4xl md:text-6xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-teal-500 leading-tight">
      Seu Espaço Seguro <br>para Ser Verdadeiro
    </h1>

    <p class="text-xl md:text-2xl text-zinc-300 text-center max-w-3xl mb-10">
      Compartilhe sonhos, metas, segredos e pensamentos íntimos em uma comunidade que entende.
      <br class="hidden sm:block" />
      Totalmente anônimo. Zero julgamentos. Apenas apoio.
    </p>
    <div class="flex flex-col sm:flex-row gap-4">
      <a href="/register" class="px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-500 to-teal-600 hover:from-indigo-600 hover:to-teal-700 transition text-white font-medium text-center flex items-center justify-center">
        Comece Agora - É Grátis
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </a>
      <a href="#video-tour" class="px-8 py-4 rounded-lg border border-zinc-600 hover:border-zinc-400 transition text-white font-medium text-center flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
        </svg>
        Ver Tour
      </a>
    </div>
    
    <!-- Estatísticas em Destaque -->
    <!-- <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
      {#each stats as stat}
        <div class="bg-zinc-800/50 rounded-xl p-6 text-center border border-zinc-700 hover:border-indigo-500 transition">
          <div class="text-3xl font-bold text-indigo-400 mb-2">{stat.value}</div>
          <div class="text-zinc-400">{stat.label}</div>
        </div>
      {/each}
    </div> -->
  </header>

  <!-- Video Section -->
  <section id="video-tour" class="container mx-auto px-4 py-16">
    <div class="max-w-5xl mx-auto bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-700 shadow-xl">
      <div class="aspect-w-16 aspect-h-9 bg-zinc-800 flex items-center justify-center">
        <div class="text-center p-8">
          <div class="text-6xl mb-4">🎬</div>
          <h3 class="text-2xl font-bold mb-2">Tour pela Plataforma</h3>
          <p class="text-zinc-400 max-w-md mx-auto">Veja como o Refúgio Anônimo funciona e como você pode começar a compartilhar hoje mesmo.</p>
          <button class="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition flex items-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
            </svg>
            Assistir Vídeo
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="container mx-auto px-4 py-20">
    <div class="max-w-4xl mx-auto text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold mb-6">Um Espaço Feito para Você</h2>
      <p class="text-lg text-zinc-300">O Refúgio Anônimo oferece tudo que você precisa para compartilhar com segurança e encontrar apoio.</p>
    </div>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each features as feature}
        <div class="bg-zinc-800 rounded-xl p-8 shadow-lg border border-zinc-700 hover:border-purple-500 transition group">
          <div class="text-4xl mb-4 {feature.color} group-hover:scale-110 transition-transform">{feature.icon}</div>
          <h3 class="text-xl font-bold mb-3">{feature.title}</h3>
          <p class="text-zinc-300">{feature.description}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- How It Works Section -->
  <section id="how-it-works" class="container mx-auto px-4 py-20 bg-zinc-800/30">
    <div class="max-w-4xl mx-auto text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold mb-6">Como Funciona</h2>
      <p class="text-lg text-zinc-300">Em apenas 4 passos simples você pode começar sua jornada de compartilhamento seguro.</p>
    </div>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
      {#each steps as step}
        <div class="relative bg-zinc-800 rounded-xl p-6 shadow-lg border border-zinc-700 hover:border-teal-500 transition">
          <div class="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-teal-600 flex items-center justify-center text-white font-bold">
            {step.number}
          </div>
          <h3 class="text-lg font-bold mb-3 mt-2">{step.title}</h3>
          <p class="text-zinc-300 text-sm">{step.description}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Testimonials Section -->
  <section id="testimonials" class="container mx-auto px-4 py-20">
    <div class="max-w-4xl mx-auto text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold mb-6">O que a comunidade está compartilhando</h2>
      <p class="text-lg text-zinc-300">Histórias reais de pessoas reais (mas sempre anônimas)</p>
    </div>
    
    <!-- Filtro de Categorias -->
    <div class="flex flex-wrap justify-center gap-3 mb-8 max-w-2xl mx-auto">
      <button 
        class={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab === 'all' ? 'bg-indigo-600 text-white' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}`}
        on:click={() => activeTab = 'all'}
      >
        Todas
      </button>
      <button 
        class={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab === 'confissão' ? 'bg-indigo-600 text-white' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}`}
        on:click={() => activeTab = 'confissão'}
      >
        Confissões
      </button>
      <button 
        class={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab === 'sonho' ? 'bg-indigo-600 text-white' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}`}
        on:click={() => activeTab = 'sonho'}
      >
        Sonhos
      </button>
      <button 
        class={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab === 'meta' ? 'bg-indigo-600 text-white' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}`}
        on:click={() => activeTab = 'meta'}
      >
        Metas
      </button>
    </div>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredTestimonials as testimonial}
        <div transition:fade class="bg-zinc-800 rounded-xl p-6 shadow-lg border border-zinc-700 hover:shadow-purple-500/10 transition hover:-translate-y-1">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center mr-3 text-xl">
              {testimonial.emoji}
            </div>
            <span class="text-sm font-medium text-purple-400">
              {testimonial.type}
            </span>
          </div>
          <p class="text-zinc-100 italic">"{testimonial.quote}"</p>
          <div class="mt-4 pt-4 border-t border-zinc-700 flex justify-between text-xs text-zinc-500">
            <span>Anônimo</span>
            <span>3 dias atrás</span>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- FAQ Section -->
  <section id="faq" class="container mx-auto px-4 py-20 bg-zinc-800/50">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Perguntas Frequentes</h2>
        <p class="text-lg text-zinc-300">Tire suas dúvidas sobre como funciona o Refúgio Anônimo</p>
      </div>
      
      <div class="space-y-4">
        {#each faqs as faq, i}
          <div class="bg-zinc-800 rounded-xl p-6 border border-zinc-700 hover:border-indigo-500 transition">
            <button class="flex justify-between items-center w-full text-left">
              <h3 class="text-lg font-medium text-zinc-100">{faq.question}</h3>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-zinc-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            <div class="mt-4 text-zinc-300">
              {faq.answer}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="container mx-auto px-4 py-20">
    <div class="max-w-4xl mx-auto bg-gradient-to-br from-indigo-900/50 to-teal-900/30 rounded-2xl p-8 md:p-12 border border-zinc-700 shadow-xl overflow-hidden relative">
      <div class="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-indigo-600/20 blur-3xl"></div>
      <div class="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-teal-600/20 blur-3xl"></div>
      
      <div class="relative text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Pronto para se libertar?</h2>
        <p class="text-lg text-zinc-300 mb-8 max-w-2xl mx-auto">Junte-se a milhares de pessoas que já encontraram alívio e apoio no Refúgio Anônimo.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/register" class="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-teal-600 hover:from-indigo-600 hover:to-teal-700 transition text-white font-medium text-center shadow-lg hover:shadow-indigo-500/30">
            Criar Conta Gratuita
          </a>
          <a href="/sobre" class="px-8 py-3 rounded-lg border border-zinc-600 hover:border-zinc-400 transition text-white font-medium text-center">
            Conheça Nossa História
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-zinc-800 py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <Blackcat size="sm" />
            <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-teal-500">
              Refúgio Anônimo
            </span>
          </div>
          <p class="text-zinc-400 text-sm">Seu espaço seguro para compartilhar sonhos, metas e pensamentos íntimos sem julgamentos.</p>
        </div>
        
        <div>
          <h4 class="text-zinc-200 font-medium mb-4">Navegação</h4>
          <ul class="space-y-2">
            <li><a href="/" class="text-zinc-400 hover:text-white transition text-sm">Início</a></li>
            <li><a href="#features" class="text-zinc-400 hover:text-white transition text-sm">Recursos</a></li>
            <li><a href="#testimonials" class="text-zinc-400 hover:text-white transition text-sm">Depoimentos</a></li>
            <li><a href="#faq" class="text-zinc-400 hover:text-white transition text-sm">FAQ</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-zinc-200 font-medium mb-4">Legal</h4>
          <ul class="space-y-2">
            <li><a href="/privacidade" class="text-zinc-400 hover:text-white transition text-sm">Política de Privacidade</a></li>
            <li><a href="/termos" class="text-zinc-400 hover:text-white transition text-sm">Termos de Serviço</a></li>
            <li><a href="/seguranca" class="text-zinc-400 hover:text-white transition text-sm">Segurança</a></li>
            <li><a href="/cookies" class="text-zinc-400 hover:text-white transition text-sm">Cookies</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-zinc-200 font-medium mb-4">Contato</h4>
          <ul class="space-y-2">
            <li><a href="mailto:contato@refugioanonimo.com" class="text-zinc-400 hover:text-white transition text-sm">contato@refugioanonimo.com</a></li>
            <!-- <li><a href="/suporte" class="text-zinc-400 hover:text-white transition text-sm">Suporte</a></li>
            <li><a href="/imprensa" class="text-zinc-400 hover:text-white transition text-sm">Imprensa</a></li>
            <li class="flex space-x-4 mt-4">
              <a aria-label="a" href="www.google.com" class="text-zinc-400 hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a aria-label="b" href="www.google.com" class="text-zinc-400 hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a aria-label="c" href="www.google.com" class="text-zinc-400 hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </li> -->
          </ul>
        </div>
      </div>
      
      <div class="border-t border-zinc-800 pt-8 text-center">
        <p class="text-zinc-500 text-sm">© {new Date().getFullYear()} Refúgio Anônimo. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</div>