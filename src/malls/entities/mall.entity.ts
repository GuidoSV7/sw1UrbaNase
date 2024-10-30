import { ApiProperty } from '@nestjs/swagger';
import { Entity, OneToMany, OneToOne } from 'typeorm';
import { Stand } from '../../stands/entities/stand.entity';
import { Infraestructure } from '../../infraestructures/entities/infraestructure.entity';
import { Suscription } from '../../suscriptions/entities/suscription.entity';
import { Kml } from 'src/kmls/entities/kml.entity';
import { Boundary } from 'src/boundaries/entities/boundary.entity';
import { Input } from 'src/inputs/entities/input.entity';

@Entity('malls')
export class Mall extends Infraestructure {
    @ApiProperty({
        type: () => [Stand],
        description: 'Stands in this mall',
        isArray: true
    })
    @OneToMany(() => Stand, (stand) => stand.idMall, {
        cascade: true
    })
    stands?: Stand[];

    @ApiProperty({
        type: () => [Suscription],
        description: 'Subscriptions for this mall',
        isArray: true
    })
    @OneToMany(() => Suscription, (suscription) => suscription.idMall, {
        cascade: true
    })
    suscriptions?: Suscription[];

    @ApiProperty({
        type: () => [Kml],
        description: 'KMLs for this mall',
        isArray: true
    })
    @OneToOne(() => Kml, (kml) => kml.idMall, {
        cascade: true
    })
    kml?: Kml;

    @ApiProperty({
        type: () => [Boundary],
        description: 'Boundaries for this mall',
        isArray: true
    })
    @OneToMany(() => Boundary, (boundary) => boundary.idMall, {
        cascade: true
    })
    boundary?: Boundary[];

    @ApiProperty({
        type: () => [Input],
        description: 'Inputs for this mall',
        isArray: true
    })
    @OneToMany(() => Input, (input) => input.idMall, {
        cascade: true
    })
    input?: Input[];
}