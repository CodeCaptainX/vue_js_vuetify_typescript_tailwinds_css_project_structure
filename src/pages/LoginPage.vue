<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
// import { useChannelStore } from '@/stores/channel/channelStore';

const username = ref<string>('')
const password = ref<string>('')
const authStore = useAuthStore()
const showPassword = ref<boolean>(false)
const router = useRouter()
// const channelStore = useChannelStore()

const rememberMe = ref<boolean>(false) // Add this line
const usernameError = ref<string>('')
const passwordError = ref<string>('')
const loginError = ref<string>('')

const validateForm = (): boolean => {
    usernameError.value = ''
    passwordError.value = ''
    loginError.value = ''

    if (!username.value) {
        usernameError.value = 'Username is required'
    }
    if (!password.value) {
        passwordError.value = 'Password is required'
    }

    return !usernameError.value && !passwordError.value
}

const handleuppercase = (event: Event) => {
    const target = event.target as HTMLInputElement
    username.value = target.value.toUpperCase()
}

// Prevent space from being input
const handleNoSpace = (event: KeyboardEvent) => {
    if (event.key === ' ') {
        event.preventDefault();
    }
};

// Remove spaces from pasted content
const handlePaste = (event: ClipboardEvent) => {
    event.preventDefault(); // Prevent default paste action
    const clipboardData = event.clipboardData;
    if (clipboardData) {
        const pastedData = clipboardData.getData("text"); // Get pasted text
        const sanitizedData = pastedData.replace(/\s/g, ""); // Remove spaces
        username.value = sanitizedData.toUpperCase(); // Update the model directly
    }
};


const handleLogin = async (): Promise<void> => {
    if (!validateForm()) return

    try {
        await authStore.login({
            auth: {
                username: username.value,
                password: password.value,
            },
        })

        if (authStore.isAuthenticated) {
            const platformName = "cockfightAdmin";
            if (rememberMe.value) {
                const minutes = 480; //8 hour
                const expirationTime = minutes * 60; // Convert minutes to seconds

                // Change this for each platform, e.g., "platform2" for the second one

                document.cookie = `${platformName}_username=${username.value}; path=/; max-age=${expirationTime}`;
                document.cookie = `${platformName}_password=${password.value}; path=/; max-age=${expirationTime}`;

            } else {
                // If Remember Me is unchecked, remove the cookies
                document.cookie = `${platformName}_username=; path=/; max-age=0`;
                document.cookie = `${platformName}_password=; path=/; max-age=0`;

                // Optionally clear the values from the form fields as well
                username.value = '';
                password.value = '';
            }

            router.push(`/`)
        }
    } catch (error) {
        loginError.value = 'Login failed. Please check your credentials and try again.'
        console.error('Login failed:', error)
    }

}
onMounted(() => {

    const platformName = "cockfightAdmin";

    // Fetch the stored username and password from cookies specific to the platform
    const storedUsername = document.cookie.split('; ').find(row => row.startsWith(`${platformName}_username=`));
    const storedPassword = document.cookie.split('; ').find(row => row.startsWith(`${platformName}_password=`));

    // console.log(storedUsername, "storedUsername");
    // console.log(storedPassword, "storedPassword");

    // If cookies are found, set them as the initial values of the username and password
    if (storedUsername) {
        rememberMe.value = true;
        username.value = storedUsername.split('=')[1];
    }

    if (storedPassword) {
        password.value = storedPassword.split('=')[1];
    }
});

</script>


<template>

    <div class="loginContainer flex justify-center items-center w-full h-screen">
        <v-form class="md:w-[450px] w-[90%]" @submit.prevent="handleLogin">
            <v-container
                class="mb-20 flex flex-col items-center rounded-md w-full bg-opacity-90 backdrop-blur-sm bg-zinc-800 p-0 overflow-hidden text-white border border-solid border-custom-border">
                <!-- HEADER -->
                <div
                    class="header w-full flex items-center bg-opacity-60 backdrop-blur justify-center bg-transparent py-5 text-white">
                    <span class="text-3xl font-bold text-custom-light-blue">USER LOGIN</span>
                </div>

                <v-row class="flex w-full flex-col items-center  mt-3 justify-center">
                    <!-- INPUT USER NAME -->
                    <v-col>
                        <v-text-field v-model="username" @keydown="handleNoSpace" @paste="handlePaste"
                            @input="handleuppercase" label="User Name" :error-messages="usernameError" hide-details
                            required class="user-name bg-[#000] bg-opacity-75"></v-text-field>
                    </v-col>

                    <!-- INPUT PASSWORD -->
                    <v-col>
                        <v-text-field v-model="password" :type="showPassword ? 'text' : 'password'" label="Password"
                            append-inner-icon="mdi-eye" @click:append-inner="showPassword = !showPassword"
                            :error-messages="passwordError" hide-details required
                            class="user-password bg-[#000] bg-opacity-75"></v-text-field>
                    </v-col>

                    <!-- LOGIN ERROR MESSAGE -->
                    <v-col v-if="loginError">
                        <v-alert type="error" class="mt-2">{{ loginError }}</v-alert>
                    </v-col>

                    <div class="w-full ml-1">
                        <v-checkbox v-model="rememberMe" hide-details label="Remember Me"></v-checkbox>
                    </div>


                    <!-- BUTTON SUBMIT -->
                    <v-col class="mb-[25px]">
                        <button type="submit"
                            class="w-full bg-red- text-2xl py-[10px] bg-opacity-70 backdrop-blur-sm font-medium bg-custom-light-blue duration-100 hover:bg-opacity-80">
                            <v-progress-circular v-if="authStore.loading" color="white"
                                indeterminate></v-progress-circular>
                            <span v-if="!authStore.loading">LOGIN</span>
                        </button>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>

</template>



<style scoped>
.loginContainer {
    background-image: url('/images/wallspaper/admin_cockfight_2.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.v-container {
    box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
}

.header:after {
    content: '';
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, transparent, rgb(61, 61, 61), transparent);
    position: absolute;
    bottom: 0px;
}
</style>
