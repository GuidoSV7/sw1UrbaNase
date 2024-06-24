import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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
    @Column('text', 
    { array: true, 
        default: ['user'] }
    
    )
    roles: string[];


}
