import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({name: 'suscriptions'})
export class Suscription {
  @PrimaryGeneratedColumn()
  id: number;
    
  @ApiProperty({ example: 'Suscription 1', description: 'The title of the suscription.' })
  @Column()
  title: string;

  @ApiProperty({ example: 1, description: 'The mount of the suscription.' })
  @Column()
  mount: number;

  @ApiProperty({ example: '2022-12-31', description: 'The date of the suscription.' })
  @Column()
  date: string;

  @ApiProperty({ example: '1', description: 'The user ID associated with the suscription.' })
  @ManyToOne(() => User,  { onDelete: 'SET NULL', eager: true})
  @JoinColumn({ name: 'userId' }) // This line is optional. It specifies the column name in the database.
  idUser: User;

}