import { PartialType } from '@nestjs/swagger';
import { CreateKmlDto } from './create-kml.dto';

export class UpdateKmlDto extends PartialType(CreateKmlDto) {}