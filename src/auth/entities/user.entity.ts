import { ApiProperty } from "@nestjs/swagger";
import { Register } from "src/registers/entities/register.entity";
import { Stand } from "src/stands/entities/stand.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
/* import { Stand } from "src/stands/entities/stand.entity"; */

@Entity('users')
export class User {
  @ApiProperty({
    example: 'qwfhasfmasvkoaspcwajfioasjfvnasvkasdkaskcjascnvasjcvasv',
    description: 'Es un UUID automatico se genera',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Ronaldo Sahonero Puma',
    description: 'Nombre del Usuario',
  })
  @Column('text')
  name: string;

  @ApiProperty({
    example: 'Ronaldo@gmail.com',
    description: 'Email del User',
  })
  @Column('text', { unique: true })
  email: string;

  @ApiProperty({
    example: 'wefdnsdf135315135',
    description: 'La contraseña estará hasheada automaticamente',
  })
  @Column('text')
  password: string;

  @ApiProperty({
    example: ['user', 'admin'],
    description: 'Roles del Usuario',
  })
  @Column('text', {
    array: true,
  })
  roles: string[];

  @ApiProperty({
    example: true,
    description: 'Estado del Usuario',
  })
  @Column('boolean', { default: true })
  status: boolean;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        number: { type: 'string' },
        name: { type: 'string' }
      }
    },
    description: 'Stands asociados al usuario'
  })
  @OneToMany(() => Stand, (stand) => stand.idUser)
  stands?: Stand[];
}