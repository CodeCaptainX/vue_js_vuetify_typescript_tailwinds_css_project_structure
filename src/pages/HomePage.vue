<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

// Types
interface Particle {
    id: number
    x: number
    y: number
    size: number
    delay: number
    duration: number
}

interface Badge {
    text: string
    bgColor: string
    textColor: string
    borderColor: string
    icon: string
}

// Reactive state
const showContent = ref<boolean>(false)
const particles = ref<Particle[]>([])
const isAnimating = ref<boolean>(true)

// Achievement badges data
const badges = ref<Badge[]>([
    {
        text: 'First Project Complete',
        bgColor: 'bg-green-500/20',
        textColor: 'text-green-200',
        borderColor: 'border-green-400/30',
        icon: '✨'
    },
    {
        text: 'Vue.js Explorer',
        bgColor: 'bg-blue-500/20',
        textColor: 'text-blue-200',
        borderColor: 'border-blue-400/30',
        icon: '🚀'
    },
    {
        text: 'TypeScript Ready',
        bgColor: 'bg-indigo-500/20',
        textColor: 'text-indigo-200',
        borderColor: 'border-indigo-400/30',
        icon: '⚡'
    },
    {
        text: 'Tailwind Styled',
        bgColor: 'bg-purple-500/20',
        textColor: 'text-purple-200',
        borderColor: 'border-purple-400/30',
        icon: '🎨'
    }
])

// Methods
const createParticles = (): void => {
    const newParticles: Particle[] = []
    for (let i = 0; i < 40; i++) {
        newParticles.push({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 12 + 8, // Larger size for stars (8px to 20px)
            delay: Math.random() * 3,
            duration: Math.random() * 2 + 1 // Faster blinking (1-3 seconds)
        })
    }
    particles.value = newParticles
}

const handleStartNextProject = (): void => {
    console.log('Starting next project...');
    alert('Ready to start your next amazing project! 🚀');

    // Open a new tab to an external website
    window.open('https://vuetifyjs.com/en/', '_blank');
}

const handleShareAchievement = async (): Promise<void> => {
    const shareData = {
        title: 'I just completed my first Vue.js project!',
        text: 'Check out my first Vue.js project with TypeScript and Tailwind CSS!',
        url: window.location.href
    }

    try {
        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            await navigator.share(shareData)
        } else {
            // Fallback for browsers that don't support Web Share API
            const text = 'I just completed my first Vue.js project with TypeScript and Tailwind CSS!'
            await navigator.clipboard.writeText(text)
            alert('Achievement copied to clipboard! 📋')
        }
    } catch (error) {
        console.error('Error sharing:', error)
        alert('Sharing not supported, but you should be proud! 🌟')
    }
}

// Lifecycle
onMounted(() => {
    createParticles()

    // Smooth entrance animation
    setTimeout(() => {
        showContent.value = true
    }, 500)

})
</script>

<template>

    <div class="min-h-screen celebration-bg relative overflow-hidden flex items-center justify-center">


        <!-- Animated Background Stars -->
        <div v-if="isAnimating" class="absolute inset-0 overflow-hidden">
            <div v-for="particle in particles" :key="particle.id" class="absolute text-white star-blink" :style="{
                left: particle.x + '%',
                top: particle.y + '%',
                fontSize: particle.size + 'px',
                animationDelay: particle.delay + 's',
                animationDuration: particle.duration + 's'
            }">
                ⭐
            </div>
        </div>

        <!-- Main Content -->
        <div class="relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 py-6 " :class="{
            'opacity-0 transform translate-y-10': !showContent,
            'opacity-100 transform translate-y-0': showContent
        }">
            <!-- Trophy Icon -->
            <div class="mb-8 animate-bounce-slow">
                <div class="inline-block tw-p-6 bg-yellow-400 rounded-full shadow-2xl animate-pulse-glow">
                    <svg class="w-16 h-16 text-yellow-800" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                </div>
            </div>

            <!-- Main Heading -->
            <h1 class="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight ">
                <span class="block animate-pulse text-5xl mb-4">🎉</span>
                <span class="gradient-text">Congratulations!</span>
            </h1>

            <!-- Subheading -->
            <h2 class="text-2xl md:text-4xl font-bold text-white mb-8 opacity-90">
                You Created Your First Vue 3 + Vuetify + Tailwind css + TypeScript Project
            </h2>

            <!-- Description Card -->
            <div class="bg-white/10 backdrop-blur-lg !p-5  rounded-3xl  mb-12 card-hover border border-white/20">
                <p class="text-lg md:text-xl text-white leading-relaxed mb-6">
                    This marks the beginning of your amazing development journey with modern Vue.js Vuetify Tailwind css
                    and
                    TypeScript!
                    You've mastered component composition, reactive references, and type-safe development.
                </p>

                <!-- Achievement Badges -->
                <div class="flex flex-wrap justify-center gap-4">
                    <span v-for="badge in badges" :key="badge.text"
                        :class="[badge.bgColor, badge.textColor, badge.borderColor]"
                        class="px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm">
                        {{ badge.icon }} {{ badge.text }}
                    </span>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button @click="handleStartNextProject"
                    class="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30">
                    Start Building 🚀
                </button>
                <button @click="handleShareAchievement"
                    class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30">
                    Share Achievement 📱
                </button>
            </div>

            <!-- Technical Stack Info -->
            <div class="mt-12 bg-black/20 backdrop-blur-sm rounded-2xl !p-6 border border-white/10">
                <h3 class="text-white font-semibold text-lg mb-3">🛠️ Your Tech Stack</h3>
                <div class="flex flex-wrap justify-center gap-3 text-sm">
                    <span class="bg-green-600/20 text-green-300 px-3 py-1 rounded-lg border border-green-500/30"> Vue
                        3</span>
                    <span class="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg border border-green-500/30">
                        Vuetify </span>
                    <span
                        class="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-lg border border-blue-500/30">TypeScript</span>
                    <span class="bg-cyan-600/20 text-cyan-300 px-3 py-1 rounded-lg border border-cyan-500/30">Tailwind
                        CSS 4</span>
                    <span
                        class="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-lg border border-purple-500/30">Composition
                        API</span>
                </div>
            </div>

            <!-- Motivational Quote -->
            <div class="mt-8 text-white/80">
                <p class="text-lg italic">
                    "The journey of a thousand commits begins with a single component."
                </p>
                <p class="text-sm mt-2 opacity-70">
                    — You just built yours! 🌟
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
/* .khmer {
    font-family: 'Kantumruy Pro', sans-serif;
} */

.star-blink {
    animation: starBlink 2s ease-in-out infinite;
    opacity: 0.8;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

@keyframes starBlink {

    0%,
    100% {
        opacity: 0.3;
        transform: scale(0.8);
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    }

    50% {
        opacity: 1;
        transform: scale(1.2);
        text-shadow: 0 0 20px rgba(255, 255, 255, 1);
    }
}

.animate-bounce-slow {
    animation: bounce 3s infinite;
}

.animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite alternate;
}

@keyframes pulse-glow {
    from {
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
    }

    to {
        box-shadow: 0 0 40px rgba(59, 130, 246, 0.8);
    }
}

.gradient-text {
    background: linear-gradient(135deg, #667eea 0%, #b88ee2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.celebration-bg {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    font-family: 'Inter', sans-serif;
}

.card-hover {
    transition: all 0.3s ease;
}

.card-hover:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}
</style>