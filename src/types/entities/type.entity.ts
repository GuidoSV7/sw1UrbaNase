import { ApiProperty } from '@nestjs/swagger';
import { Infraestructure } from 'src/infraestructures/entities/infraestructure.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  id: number;

  
  @ApiProperty({ example: 'Mall', description: 'The name of the type.' })
  @Column()
  name: string;

  @OneToMany(() => Infraestructure, infraestructure => infraestructure.idType)
  infraestructures: Infraestructure[];
}