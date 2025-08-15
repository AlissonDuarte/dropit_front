<script>
  import PostCategory from "../Categories/PostCategory.svelte";
  export let profilePicture = "";
  export let profileUsername = "";
  export let profileBio = "";
  export let profileLastPost = "";
  export let profileTags = [];

  let profileURL = `/user/visit/${profileUsername}`;
</script>

<a href={profileURL} 
   class="block w-full p-4 sm:p-6 border border-gray-200 rounded-xl shadow-md
          hover:shadow-lg hover:scale-[1.03] transition-transform duration-300
          dark:bg-black-800 dark:border-gray-700 dark:hover:bg-gray-700"
>
  <div class="flex items-center gap-4">
    <img 
      src={profilePicture || 'https://ui-avatars.com/api/?name=' + profileUsername + '&background=random'} 
      alt="Profile picture of {profileUsername}"
      class="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover shadow-md flex-shrink-0"
    />

    <div class="flex-1 min-w-0">
      <h5 class="text-lg sm:text-xl font-semibold text-white dark:text-white truncate">
        {profileUsername}
      </h5>
      <p class="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
        {profileBio || 'Sem descrição disponível.'}
      </p>
    </div>
  </div>

  <div class="mt-4 sm:mt-5 border-t border-gray-200 dark:border-gray-700 pt-3 sm:pt-4 flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400">
    <time datetime={profileLastPost}>
      Última postagem: {profileLastPost || 'Nenhuma'}
    </time>
  </div>

  {#if profileTags.length > 0}
    <div class="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
      {#each profileTags as tag}
        <PostCategory tag={tag} />
      {/each}
    </div>
  {/if}
</a>