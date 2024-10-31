import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Mall } from 'src/malls/entities/mall.entity';

@Entity({ name: 'suscriptions' })
export class Suscription {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The ID of the subscription.' })
  id: number;

  @ApiProperty({ example: '123456', description: 'The code of the subscription.' })
  @Column('text', { default: '123456' })
  code: string;

  @ApiProperty({ example: 'Free', description: 'The title of the subscription.' })
  @Column()
  title: string;

  @ApiProperty({ example: 1, description: 'The amount of the subscription.' })
  @Column()
  mount: number;

  @ApiProperty({ example: '2022-12-31', description: 'The date of the subscription.' })
  @Column()
  date: string;

  @ApiProperty({ example: false, description: 'The redeemed status of the subscription.' })
  @Column('boolean', { default: false })
  redeemed: boolean;

  @ApiProperty({
    type: () => User,
    nullable: true,
    description: 'The user associated with the subscription'
  })
  @OneToOne(() => User, {
    onDelete: 'SET NULL',
    eager: true,
    nullable: true
  })
  @JoinColumn({ name: 'userId' })
  idUser: User | null;

  @ApiProperty({
    type: () => Mall,
    description: 'The mall associated with the subscription'
  })
  @ManyToOne(() => Mall, (mall) => mall.suscriptions, {
    onDelete: 'SET NULL',
    eager: true,
    nullable: false
  })
  @JoinColumn({ name: 'mallId' })
  idMall: Mall;
}