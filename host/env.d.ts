// типизация для микросервисов
declare module 'dikApp/*'
declare module 'dikApp/DikCounter' {
  import type { ComponentType } from 'react'

  export interface DikCounterProps {
    initialValue?: number
    isBig?: boolean
  }

  export const DikCounter: ComponentType<DikCounterProps>
}
