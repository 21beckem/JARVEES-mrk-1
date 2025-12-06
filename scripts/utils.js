export function verifiyENV() {
    let neededEnvVars = ['HOME_ASSISTANT_LONG_LIVED_TOKEN', 'HOME_ASSISTANT_IP', 'GOOGLE_API_KEY'];
    neededEnvVars.forEach(envVar => {
        if (!process.env[envVar]) {
            throw new Error(`Missing environment variable: ${envVar}`);
        }
    });
}