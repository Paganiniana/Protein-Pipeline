export function getRandomColor():string {
    let chars = "0123456789abcdef";
    let res = "";
    for (let i = 0; i < 6; i++) {
        res+= chars[Math.floor(Math.random() * chars.length)];
    }
    return `#${res}`;
}