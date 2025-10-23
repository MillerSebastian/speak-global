<template>
  <header class="glass-card p-4 border-b border-white/10">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <MessageCircle class="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 class="text-xl font-bold text-white">Global Speak</h1>
          <p class="text-xs text-white/60">{{ onlineUsers }} online</p>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="hidden sm:flex items-center gap-3">
          <img
            v-if="user?.photoURL"
            :src="user.photoURL"
            :alt="user.displayName || 'User'"
            class="w-8 h-8 rounded-full border-2 border-white/20"
          />
          <span class="text-white text-sm font-medium">{{ user?.displayName }}</span>
        </div>

        <button
          @click="$emit('signOut')"
          class="glass-button p-2 rounded-lg hover:bg-white/20 transition-all"
        >
          <LogOut class="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { MessageCircle, LogOut } from 'lucide-vue-next';
import type { User } from '../types';

defineProps<{
  user: User | null;
  onlineUsers: number;
}>();

defineEmits<{
  signOut: [];
}>();
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
