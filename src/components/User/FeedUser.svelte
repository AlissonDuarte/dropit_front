<script>
  import Users from "./Users.svelte";
  import { goto } from "$app/navigation";
  export let users = [];
  export let cssClass = ""
  const handleUserClick = (user) => {
    goto(`/user/visit/${user.username}`);
  };
</script>

{#if users.length === 0}
  <p class="text-center text-zinc-400">Nenhum usuário encontrado.</p>
{:else}
  <div class={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${cssClass}`}>
    {#each users as user (user.id)}
        <Users
            profilePicture={user.profilePicture}
            profileUsername={user.username}
            profileBio={user.bio}
            profileLastPost={user.lastPost}
            profileTags={user.tags}
        />
    {/each}
  </div>
{/if}
