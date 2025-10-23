<template>
  <div class="glass-card p-4 border-t border-white/10">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col gap-3">
        <div v-if="imageUrl" class="glass-preview p-3 rounded-lg flex items-center justify-between">
          <div class="flex items-center gap-2">
            <ImageIcon class="w-5 h-5 text-white/60" />
            <span class="text-sm text-white/80 truncate max-w-xs">{{ imageUrl }}</span>
          </div>
          <button @click="imageUrl = ''" class="text-white/60 hover:text-white">
            <X class="w-5 h-5" />
          </button>
        </div>

        <div class="flex gap-2">
          <div class="relative flex-1">
            <textarea
              v-model="message"
              @keydown.enter.exact.prevent="sendMessage"
              placeholder="Type your message..."
              rows="1"
              class="w-full glass-input px-4 py-3 pr-24 rounded-xl text-white placeholder-white/40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            />
            <button
              @click="toggleEmojiPicker"
              class="absolute right-12 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg transition-all"
            >
              <Smile class="w-5 h-5 text-white/60" />
            </button>
            <button
              @click="toggleImageInput"
              class="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg transition-all"
            >
              <ImageIcon class="w-5 h-5 text-white/60" />
            </button>
          </div>

          <button
            @click="sendMessage"
            :disabled="!canSend"
            class="glass-button px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send class="w-5 h-5" />
          </button>
        </div>

        <div
          v-if="showEmojiPicker"
          class="glass-card rounded-xl overflow-hidden"
        >
          <emoji-picker
            @emoji-click="handleEmojiClick"
            class="emoji-picker-custom"
          ></emoji-picker>
        </div>

        <div v-if="showImageInput" class="glass-card p-4 rounded-xl">
          <div class="flex gap-2">
            <input
              v-model="imageUrl"
              type="url"
              placeholder="Paste image URL..."
              class="flex-1 glass-input px-4 py-2 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            />
            <button
              @click="showImageInput = false"
              class="glass-button px-4 py-2 rounded-lg text-white hover:bg-white/20 transition-all"
            >
              <X class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Send, Smile, ImageIcon, X } from 'lucide-vue-next';
import 'emoji-picker-element';

const message = ref('');
const imageUrl = ref('');
const showEmojiPicker = ref(false);
const showImageInput = ref(false);

const emit = defineEmits<{
  send: [message: string, imageUrl: string];
}>();

const canSend = computed(() => {
  return message.value.trim().length > 0 || imageUrl.value.trim().length > 0;
});

const sendMessage = () => {
  if (canSend.value) {
    emit('send', message.value.trim(), imageUrl.value.trim());
    message.value = '';
    imageUrl.value = '';
    showImageInput.value = false;
  }
};

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value;
  if (showEmojiPicker.value) {
    showImageInput.value = false;
  }
};

const toggleImageInput = () => {
  showImageInput.value = !showImageInput.value;
  if (showImageInput.value) {
    showEmojiPicker.value = false;
  }
};

const handleEmojiClick = (event: any) => {
  message.value += event.detail.unicode;
};

onMounted(() => {
  const emojiPicker = document.querySelector('emoji-picker');
  if (emojiPicker) {
    (emojiPicker as any).skinToneEmoji = 'hand';
  }
});
</script>

<style>
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.glass-input {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-button {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-preview {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.emoji-picker-custom {
  width: 100%;
  --background: rgba(30, 30, 50, 0.95);
  --border-color: rgba(255, 255, 255, 0.1);
  --input-background: rgba(255, 255, 255, 0.1);
  --text-color: #fff;
}
</style>
