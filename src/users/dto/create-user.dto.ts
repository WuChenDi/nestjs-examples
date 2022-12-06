import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  // 使用 swagger 和 TS 配合进行参数约束说明
  @ApiProperty({ description: 'E-mail' })
  // TS 约束只读属性
  readonly email: string

  @ApiProperty({ description: 'Password', default: '123456' })
  password: string

  @ApiProperty({ description: 'User Name', default: 'monica' })
  username: string
}
