
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const randomNum = (): number => Math.floor(Math.random() * 100) + 1