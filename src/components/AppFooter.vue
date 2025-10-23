<template>
  <footer class="glass-card border-t border-white/10 py-6">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-center sm:text-left">
          <p class="text-white font-semibold">Miller Sebastian</p>
          <p class="text-white/60 text-sm">Created with passion</p>
        </div>

        <div class="flex items-center gap-4">
          <a
            href="https://github.com/MillerSebastian"
            target="_blank"
            rel="noopener noreferrer"
            class="glass-button p-3 rounded-lg hover:bg-white/20 transition-all group"
            title="GitHub"
          >
            <Github class="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          </a>

          <a
            href="https://portfolio.millersebastian.com"
            target="_blank"
            rel="noopener noreferrer"
            class="glass-button p-3 rounded-lg hover:bg-white/20 transition-all group"
            title="Portfolio"
          >
            <Briefcase class="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          </a>

          <a
            href="https://www.linkedin.com/in/sebastian-rodelo-139696266/"
            target="_blank"
            rel="noopener noreferrer"
            class="glass-button p-3 rounded-lg hover:bg-white/20 transition-all group"
            title="LinkedIn"
          >
            <Linkedin class="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Github, Briefcase, Linkedin } from 'lucide-vue-next';
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.glass-button {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
