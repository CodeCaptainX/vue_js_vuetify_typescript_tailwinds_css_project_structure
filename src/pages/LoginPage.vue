<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form state
const formData = reactive({
    username: '',
    password: '',
    rememberMe: false
})

// UI state
const showPassword = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const errors = reactive({
    username: '',
    password: '',
    general: ''
})

// Form validation
const validateForm = (): boolean => {
    errors.username = ''
    errors.password = ''
    errors.general = ''

    let isValid = true

    if (!formData.username.trim()) {
        errors.username = 'Username is required'
        isValid = false
    }

    if (!formData.password) {
        errors.password = 'Password is required'
        isValid = false
    } else if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters'
        isValid = false
    }

    return isValid
}

// Handle login
const handleLogin = async (): Promise<void> => {
    if (!validateForm()) return

    isLoading.value = true

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Simulate login logic here
        // Replace with your actual authentication logic

        if (formData.rememberMe) {
            localStorage.setItem('rememberMe', 'true')
            localStorage.setItem('username', formData.username)
        }

        // Navigate to dashboard or home
        router.push('/')

    } catch (error) {
        errors.general = 'Login failed. Please check your credentials.'
    } finally {
        isLoading.value = false
    }
}

// Handle input formatting
const handleUsernameInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    formData.username = target.value.toUpperCase().replace(/\s/g, '')
}

// Clear error when user starts typing
const clearError = (field: keyof typeof errors) => {
    errors[field] = ''
}

// Toggle password visibility
const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
}
</script>

<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden p-6">

        <!-- Animated background particles -->
        <div class="absolute inset-0 overflow-hidden">
            <div class="absolute w-20 h-20 bg-white/10 rounded-full top-1/4 left-1/12 animate-bounce"
                style="animation-delay: 0s; animation-duration: 6s;"></div>
            <div class="absolute w-16 h-16 bg-white/10 rounded-full top-3/5 right-1/5 animate-bounce"
                style="animation-delay: 2s; animation-duration: 6s;"></div>
            <div class="absolute w-12 h-12 bg-white/10 rounded-full top-1/3 right-1/4 animate-bounce"
                style="animation-delay: 4s; animation-duration: 6s;"></div>
            <div class="absolute w-24 h-24 bg-white/10 rounded-full bottom-1/4 left-1/5 animate-bounce"
                style="animation-delay: 1s; animation-duration: 6s;"></div>
            <div class="absolute w-14 h-14 bg-white/10 rounded-full top-1/6 right-1/3 animate-bounce"
                style="animation-delay: 3s; animation-duration: 6s;"></div>
            <div class="absolute w-18 h-18 bg-white/10 rounded-full bottom-1/5 right-1/3 animate-bounce"
                style="animation-delay: 5s; animation-duration: 6s;"></div>
        </div>

        <!-- Login card -->
        <div
            class="bg-white/95 backdrop-blur-xl rounded-3xl !p-8 w-full max-w-md shadow-2xl border border-white/20 relative z-10 animate-fade-in-up">

            <!-- Header -->
            <div class="text-center mb-8">
                <div class="flex flex-col items-center gap-4 mb-4">
                    <!-- Logo -->
                    <div
                        class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                            </path>
                        </svg>
                    </div>
                    <h1 class="text-3xl font-bold text-gray-900">Admin Portal</h1>
                </div>
                <p class="text-gray-600 text-lg">Welcome back! Please sign in to continue.</p>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleLogin" class="space-y-6">

                <!-- Username field -->
                <div class="space-y-2">
                    <label for="username" class="block text-sm font-semibold text-gray-700">Username</label>
                    <div class="relative">
                        <input id="username" type="text" v-model="formData.username" @input="handleUsernameInput"
                            @focus="clearError('username')" :class="[
                                'w-full px-4 py-4 pr-12 rounded-xl border-2 text-lg transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400',
                                errors.username
                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                                    : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20',
                                'focus:outline-none focus:ring-4'
                            ]" placeholder="Enter your username" autocomplete="username" />
                        <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                    </div>
                    <span v-if="errors.username" class="text-red-500 text-sm font-medium">{{ errors.username }}</span>
                </div>

                <!-- Password field -->
                <div class="space-y-2">
                    <label for="password" class="block text-sm font-semibold text-gray-700">Password</label>
                    <div class="relative">
                        <input id="password" :type="showPassword ? 'text' : 'password'" v-model="formData.password"
                            @focus="clearError('password')" :class="[
                                'w-full px-4 py-4 pr-12 rounded-xl border-2 text-lg transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400',
                                errors.password
                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                                    : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20',
                                'focus:outline-none focus:ring-4'
                            ]" placeholder="Enter your password" autocomplete="current-password" />
                        <button type="button" @click="togglePasswordVisibility"
                            class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-500 transition-colors duration-200">
                            <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                </path>
                            </svg>
                            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21">
                                </path>
                            </svg>
                        </button>
                    </div>
                    <span v-if="errors.password" class="text-red-500 text-sm font-medium">{{ errors.password }}</span>
                </div>

                <!-- Remember me checkbox -->
                <div class="flex items-center">
                    <label class="flex items-center cursor-pointer group">
                        <input type="checkbox" v-model="formData.rememberMe" class="sr-only" />
                        <div :class="[
                            'w-5 h-5 border-2 rounded flex items-center justify-center transition-all duration-200',
                            formData.rememberMe
                                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-500'
                                : 'border-gray-300 group-hover:border-indigo-400'
                        ]">
                            <svg v-if="formData.rememberMe" class="w-3 h-3 text-white" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                    d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <span class="ml-3 !m-4 text-gray-700 text-sm font-medium">Remember me for 8 hours</span>
                    </label>
                </div>

                <!-- Error message -->
                <div v-if="errors.general"
                    class="flex items-center gap-3 !p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                    <svg class="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-sm font-medium">{{ errors.general }}</span>
                </div>

                <!-- Submit button -->
                <button type="submit" :disabled="isLoading"
                    class="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-4 focus:ring-indigo-500/50">
                    <div v-if="isLoading" class="flex items-center justify-center">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        Signing In...
                    </div>
                    <span v-else>Sign In</span>
                </button>
            </form>

            <!-- Footer -->
            <div class="mt-8 pt-6 border-t border-gray-200 text-center">
                <p class="text-gray-600 text-sm">
                    Need help?
                    <a href="#"
                        class="text-indigo-600 hover:text-purple-600 font-semibold transition-colors duration-200 hover:underline">
                        Contact Support
                    </a>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out;
}
</style>