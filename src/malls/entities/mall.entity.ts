import { ApiProperty } from '@nestjs/swagger';
import { Entity, OneToMany } from 'typeorm';
import { Stand } from '../../stands/entities/stand.entity';
import { Infraestructure } from '../../infraestructures/entities/infraestructure.entity';
import { Suscription } from '../../suscriptions/entities/suscription.entity';

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
}