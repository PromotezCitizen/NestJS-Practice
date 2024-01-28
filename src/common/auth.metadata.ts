import { SetMetadata } from "@nestjs/common"

export const IS_PUBLIC_KEY = 'isPublic'
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true) // 이것으로 Guard를 무시할 수 있게 한다.