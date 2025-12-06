export function verifiyENV() {
    let neededEnvVars = ['HOME_ASSISTANT_LONG_LIVED_TOKEN', 'HOME_ASSISTANT_IP'];
    neededEnvVars.forEach(envVar => {
        if (!process.env[envVar]) {
            throw new Error(`Missing environment variable: ${envVar}`);
        }
    })
}