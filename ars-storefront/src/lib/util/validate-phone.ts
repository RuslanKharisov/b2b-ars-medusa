export const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '')
    return cleaned.length === 11 && cleaned.startsWith('7')
}