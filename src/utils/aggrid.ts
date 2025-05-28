import type { Theme, ThemeDefaultParams } from 'ag-grid-community'
import { colorSchemeDark, colorSchemeLightWarm, themeQuartz } from 'ag-grid-community'

const isDark = useDark()

export function useAgridTheme(
  {
    darkTheme = themeQuartz.withPart(colorSchemeDark),
    lightTheme = themeQuartz.withPart(colorSchemeLightWarm),
  }: {
    darkTheme?: Theme<ThemeDefaultParams>
    lightTheme?: Theme<ThemeDefaultParams>
  } = {},
) {
  return computed(() => {
    return isDark.value ? darkTheme : lightTheme
  })
}
