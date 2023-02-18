export function Save(data) {
    window.localStorage.clear()
    window.localStorage.setItem('Data', JSON.stringify(data))
}

export function Get() {
    const raw = window.localStorage.getItem('Data') || '[]'

    return JSON.parse(raw)
}