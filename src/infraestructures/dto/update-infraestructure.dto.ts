import { PartialType } from '@nestjs/swagger';
import { CreateInfraestructureDto } from './create-infraestructure.dto';

export class UpdateInfraestructureDto extends PartialType(CreateInfraestructureDto) {}
