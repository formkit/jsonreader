<template>
  <div class="navigation-card">
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <div class="card-links">
        <div v-for="(link, index) in links" :key="index" class="link-item">
          <a
            :href="link.url"
            class="link-anchor"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
          >
            <span class="link-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span class="link-title">{{ link.title }}</span>
          </a>
          <p class="link-description">{{ link.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "Further Reading",
  },
  links: {
    type: Array,
    required: true,
    // Each link should have: { title, url, description, external? }
  },
})
</script>

<style scoped>
.navigation-card {
  position: relative;
  margin: 2.5rem 0;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    var(--color-bg-card),
    var(--color-bg-card-secondary)
  );
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(var(--color-accent-rgb), 0.1);
}

.navigation-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    var(--color-accent),
    rgba(var(--color-accent-rgb), 0.5)
  );
}

.card-content {
  padding: 1.75rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  color: var(--color-text-primary);
  letter-spacing: 0.01em;
}

.card-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.link-item {
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
}

.link-item:hover {
  background-color: rgba(var(--color-accent-rgb), 0.05);
}

.link-anchor {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1rem;
  color: var(--color-accent);
  text-decoration: none;
  margin-bottom: 0.375rem;
  transition: transform 0.2s ease;
}

.link-anchor:hover {
  transform: translateX(4px);
}

.link-icon {
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  opacity: 0.8;
}

.link-description {
  font-size: 0.9rem;
  margin-left: 1.85rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
}
</style>
