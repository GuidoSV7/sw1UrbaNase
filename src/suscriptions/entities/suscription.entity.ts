import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'suscriptions' })
export class Suscription {
  @PrimaryGeneratedColumn()
  id: number;

  //code
  @ApiProperty({ example: '123456', description: 'The code of the subscription.' })
  @Column('text', { default: '123456' })
  code: string;

  @ApiProperty({ example: 'Suscription 1', description: 'The title of the subscription.' })
  @Column()
  title: string;

  @ApiProperty({ example: 1, description: 'The amount of the subscription.' })
  @Column()
  mount: number;

  @ApiProperty({ example: '2022-12-31', description: 'The date of the subscription.' })
  @Column()
  date: string;

  //redeemed
  @ApiProperty({ example: false, description: 'The redeemed status of the subscription.' })
  @Column('boolean', { default: false })
  redeemed: boolean;

  @ApiProperty({ example: '1', description: 'The user ID associated with the subscription.' })
  @OneToOne(() => User, { onDelete: 'SET NULL', eager: true, nullable: true })
  @JoinColumn({ name: 'userId' }) // Nombre del campo de unión en la base de datos.
  idUser: User | null;
}
