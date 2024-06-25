import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/entities/user.entity";
import { Infraestructure } from "src/infraestructures/entities/infraestructure.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('register')
export class Register {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        type: () => User,
        example: '1',
        description: 'Id del usuario',
        nullable: true,
        enum: User
    })
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'idUser' })
    idUser: User   

    @ApiProperty({
        type: () => Infraestructure,
        example: '1',
        description: 'Id de la Infraestrucura',
        nullable: true,
        

    })

    @ManyToOne(() => Infraestructure,  { onDelete: 'SET NULL' , eager: true, cascade:true})
    @JoinColumn({ name: 'idInfraestructure' })
    idInfraestructure: Infraestructure   
}
