import { colors } from './colors'

export const parseColorsToHex = (color) => {
    return {
        'Amarelo': colors.warning,
        'Azul': colors.primary,
        'Verde': colors.success,
        'Vermelho': colors.danger
    }[color]
}