import kleur from 'kleur';

export function logError(message,content) {
    console.error(kleur.red(message),content);
    console.log("===============================")
}

export function logSuccess(message,content) {
    console.log(kleur.green(message),content);
        console.log("===============================");
}

export function logWarning(message,content) {
    console.log(kleur.yellow(message),content);
        console.log("===============================");
}

export function logNormal(message,content) {
    console.log(kleur.cyan(message),content);
        console.log("===============================");
}
