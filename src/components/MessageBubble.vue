<template>
  <div
    :class="[
      'inline-flex items-start p-4 mb-3 rounded-xl transition-all hover:scale-[1.01] self-start align-top w-fit',
      isOwnMessage ? 'ml-auto' : ''
    ]"
    class="glass-message"
  >
    <div :class="['flex items-start gap-3', isOwnMessage ? 'flex-row-reverse' : '']">
      <img
        :src="message.userPhoto || 'https://via.placeholder.com/40'"
        :alt="message.userName"
        class="w-10 h-10 rounded-full flex-shrink-0 border-2 border-white/20"
      />

      <div :class="['max-w-full', isOwnMessage ? 'text-right' : '']">
        <div class="flex items-center gap-2 mb-1" :class="isOwnMessage ? 'justify-end' : ''">
          <span class="font-semibold text-white text-sm">{{ message.userName }}</span>
          <span class="text-xs text-white/50">{{ formatTime(message.createdAt) }}</span>
        </div>

        <p v-if="message.text" class="text-white/90 break-words whitespace-pre-wrap inline-block max-w-[36ch]">
          {{ message.text }}
        </p>

        <img
          v-if="message.imageUrl"
          :src="message.imageUrl"
          alt="Shared image"
          class="mt-2 rounded-lg h-auto border border-white/20 max-w-[240px] sm:max-w-[300px]"
          @error="handleImageError"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '../types';

defineProps<{
  message: Message;
  isOwnMessage: boolean;
}>();

const formatTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString();
};

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  target.style.display = 'none';
};
</script>

<style scoped>
.glass-message {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
