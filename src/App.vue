<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <LoginScreen v-if="!user" @signed-in="handleSignIn" />

    <div v-else class="h-screen flex flex-col">
      <ChatHeader
        :user="user"
        :online-users="onlineUsers"
        @sign-out="handleSignOut"
      />

      <ChatTabs
        :active-tab="activeTab"
        @change-tab="activeTab = $event"
      />

      <ChatMessages
        :messages="displayedMessages"
        :current-user-id="user.uid"
        :empty-message="activeTab === 'global' ? 'No messages yet. Be the first to say hello!' : 'You haven\'t sent any messages yet.'"
      />

      <MessageInput @send="handleSendMessage" />

      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db, rtdb } from './firebase';
import { ref as rRef, onValue, onDisconnect, set, serverTimestamp as rtdbServerTimestamp } from 'firebase/database';
import type { User, Message } from './types';

import LoginScreen from './components/LoginScreen.vue';
import ChatHeader from './components/ChatHeader.vue';
import ChatTabs from './components/ChatTabs.vue';
import ChatMessages from './components/ChatMessages.vue';
import MessageInput from './components/MessageInput.vue';
import AppFooter from './components/AppFooter.vue';

const user = ref<User | null>(null);
const messages = ref<Message[]>([]);
const activeTab = ref<'global' | 'my-messages'>('global');
const onlineUsers = ref(1);

const displayedMessages = computed(() => {
  if (activeTab.value === 'global') {
    return messages.value;
  }
  return messages.value.filter(msg => msg.userId === user.value?.uid);
});

const handleSignIn = () => {
  console.log('User signed in');
};

const handleSignOut = async () => {
  try {
    await signOut(auth);
    user.value = null;
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

const handleSendMessage = async (text: string, imageUrl: string) => {
  if (!user.value) return;

  try {
    await addDoc(collection(db, 'messages'), {
      userId: user.value.uid,
      userName: user.value.displayName || 'Anonymous',
      userPhoto: user.value.photoURL || null,
      text,
      imageUrl: imageUrl || null,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

onMounted(() => {
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      user.value = {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL
      };

      const messagesQuery = query(
        collection(db, 'messages'),
        orderBy('timestamp', 'desc'),
        limit(100)
      );

      onSnapshot(messagesQuery, (snapshot) => {
        messages.value = snapshot.docs
          .map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              userId: data.userId,
              userName: data.userName,
              userPhoto: data.userPhoto,
              text: data.text,
              imageUrl: data.imageUrl,
              timestamp: data.timestamp,
              createdAt: data.timestamp?.toDate() || new Date()
            };
          })
          .reverse();
      });

      // Initialize presence in Realtime Database
      const userStatusRef = rRef(rtdb, `/status/${firebaseUser.uid}`);
      const connectedRef = rRef(rtdb, '.info/connected');

      onValue(connectedRef, (snap) => {
        if (snap.val() === false) return;
        onDisconnect(userStatusRef)
          .set({ state: 'offline', last_changed: rtdbServerTimestamp() })
          .then(() => {
            set(userStatusRef, { state: 'online', last_changed: rtdbServerTimestamp() });
          });
      });

      // Listen to all statuses to compute online users
      const statusRef = rRef(rtdb, '/status');
      onValue(statusRef, (snap) => {
        const val = snap.val() || {};
        onlineUsers.value = Object.values(val).filter((s: any) => s && s.state === 'online').length || 1;
      });
    } else {
      user.value = null;
    }
  });
});
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
}
</style>
