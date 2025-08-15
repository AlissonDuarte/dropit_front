<script>
  function darkenColor(hex, factor = 0.15) {
    if (!hex) return 'rgba(0,0,0,0.5)';
    const r = parseInt(hex.slice(1, 3), 16) * (1 - factor);
    const g = parseInt(hex.slice(3, 5), 16) * (1 - factor);
    const b = parseInt(hex.slice(5, 7), 16) * (1 - factor);
    return `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}, 0.85)`;
  }

  function isLight(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 160;
  }

  export let tag;
</script>

<div
  class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold shadow-sm border"
  style="
    background-color: {darkenColor(tag.color)};
    color: {isLight(tag.color) ? '#000' : '#fff'};
    border-color: {tag.color};
  "
>
  #{tag.name}
</div>
