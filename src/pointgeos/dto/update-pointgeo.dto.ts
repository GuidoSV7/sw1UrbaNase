import { PartialType } from '@nestjs/swagger';
import { CreatePointgeoDto } from './create-pointgeo.dto';

export class UpdatePointgeoDto extends PartialType(CreatePointgeoDto) {}
