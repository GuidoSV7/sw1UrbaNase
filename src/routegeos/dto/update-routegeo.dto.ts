import { PartialType } from '@nestjs/swagger';
import { CreateRoutegeoDto } from './create-routegeo.dto';

export class UpdateRoutegeoDto extends PartialType(CreateRoutegeoDto) {}
