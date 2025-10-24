<template>
  <div class="flex-1 overflow-y-auto p-4 scroll-smooth" ref="messagesContainer">
    <div class="max-w-7xl mx-auto">
      <div v-if="messages.length === 0" class="text-center text-white/40 mt-20">
        <MessageSquare class="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p class="text-lg">{{ emptyMessage }}</p>
      </div>

      <TransitionGroup name="message" tag="div" class="flex flex-wrap gap-4 items-start">
        <MessageBubble
          v-for="msg in messages"
          :key="msg.id"
          :message="msg"
          :is-own-message="msg.userId === currentUserId"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { MessageSquare } from 'lucide-vue-next';
import MessageBubble from './MessageBubble.vue';
import type { Message } from '../types';

const props = defineProps<{
  messages: Message[];
  currentUserId: string;
  emptyMessage?: string;
}>();

const messagesContainer = ref<HTMLElement | null>(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

watch(() => props.messages.length, () => {
  scrollToBottom();
});
</script>

<style scoped>
.message-enter-active {
  transition: all 0.3s ease;
}

.message-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
</style>
