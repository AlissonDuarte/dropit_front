<script>
	import { on } from 'svelte/events';
  import { onMount } from 'svelte';
  import { API_URL } from '../../config';
  import { fade, fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
  
  export let notificationCount = 0;

  const BellIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  `;

  const icons = ["✉️", "🔄"]
  let notifications = [];
  let isOpen = false;
  let hasFetched = false; 
  async function fetchNotifications() {
    try {
      const response = await fetch(`${API_URL}/notifications`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();
      notifications = data.map(notification => ({
        ...notification,
        icon: notification.notification_type === "att" ? icons[1] : icons[0]
      }));
      hasFetched = true;
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }

  async function toggleNotifications() {
    isOpen = !isOpen;
    
    if (isOpen && !hasFetched) {
      await fetchNotifications();
    }
    
    if (isOpen) {
      notifications = notifications.map(n => ({ ...n, read: true }));
      notificationCount = 0;
    }
  }

  function closeNotifications() {
    isOpen = false;
  }

  const handlePostClick = (post_id) => {
    goto(`/user/read/${post_id}`);
  };

  onMount(() => {
    document.addEventListener('click', (event) => {
    const notificationArea = document.querySelector('.notifications-container');
    if (notificationArea && !notificationArea.contains(event.target)) {
      closeNotifications();
    }
  });
  })

</script>

<div class="notification-wrapper">
  <button class="bell-icon" on:click|stopPropagation={toggleNotifications}>
    {@html BellIcon}
    {#if notificationCount > 0}
      <span class="badge">{notificationCount}</span>
    {/if}
  </button>

  {#if isOpen}
    <div class="notifications-container" transition:fade>
      <div class="notifications-header">
        <h3>Notificações</h3>
        <button class="close-btn" on:click|stopPropagation={closeNotifications}>×</button>
      </div>
      
      <div class="notifications-list">
        {#each notifications as notification (notification.uuid)}
          <button class="notification-item {notification.read ? 'read' : ''}" in:fly={{ y: -20, duration: 200 }} on:click={() => handlePostClick(notification.post_id)}>
            <div class="notification-icon">{notification.icon}</div>
            <div class="notification-content">
              <h4>{notification.title}</h4>
              <p>{notification.message}</p>
              <small>{notification.created_at}</small>
            </div>
          </button>
        {:else}
          <div class="empty-state">Nenhuma notificação</div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
.notification-wrapper {
    position: relative;
    display: inline-block;
}

.bell-icon {
    background: none;
    border: none;
    cursor: pointer;
    position: relative;
    padding: 8px;
    color: #e0e0e0; /* Cor clara para o ícone */
    font-size: 24px;
    transition: color 0.2s;
}

.bell-icon:hover {
    color: #ffffff; /* Branco no hover */
}

.badge {
    position: absolute;
    top: 0;
    right: 0;
    background: #ff4757;
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.notifications-container {
    position: absolute;
    right: 0;
    top: 100%;
    width: 350px;
    max-height: 500px;
    overflow-y: auto;
    background: #1e1e1e; /* Fundo mais escuro */
    border: 1px solid #333; /* Borda sutil */
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Sombra mais intensa */
    z-index: 1000;
    transform-origin: top right;
}

.notifications-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #333; /* Borda mais escura */
    background: #252525; /* Fundo levemente diferente */
}

.notifications-header h3 {
    margin: 0;
    font-size: 16px;
    color: #ffffff; /* Texto branco */
}

.close-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #a0a0a0; /* Cinza claro */
    transition: color 0.2s;
}

.close-btn:hover {
    color: #ffffff; /* Branco no hover */
}

.notifications-list {
    padding: 8px 0;
}

.notification-item {
    display: flex;
    padding: 12px 16px;
    cursor: pointer;
    transition: background 0.2s;
    border-left: 3px solid transparent;
}

.notification-item:hover {
    background: #2a2a2a; /* Fundo de hover mais claro que o container */
    border-left-color: #4a90e2; /* Destaque azul na borda esquerda */
}

.notification-item.read {
    opacity: 0.7;
    background: #252525; /* Fundo diferente para itens lidos */
}

.notification-icon {
    font-size: 20px;
    margin-right: 12px;
    flex-shrink: 0;
    color: #4a90e2; /* Azul para ícones */
}

.notification-content h4 {
    margin: 0 0 4px 0;
    font-size: 14px;
    color: #e0e0e0; /* Cinza muito claro para títulos */
    font-weight: 500;
}

.notification-content p {
    margin: 0 0 4px 0;
    font-size: 13px;
    color: #b0b0b0; /* Cinza médio para texto */
    line-height: 1.4;
}

.notification-content small {
    color: #7a7a7a; /* Cinza mais escuro para datas */
    font-size: 11px;
}

.empty-state {
    padding: 16px;
    text-align: center;
    color: #7a7a7a;
}

.notifications-container::-webkit-scrollbar {
    width: 6px;
}

.notifications-container::-webkit-scrollbar-track {
    background: #252525;
}

.notifications-container::-webkit-scrollbar-thumb {
    background: #4a4a4a;
    border-radius: 3px;
}

.notifications-container::-webkit-scrollbar-thumb:hover {
    background: #5a5a5a;
}
</style>