import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Convenio } from '../models/convenio.model';
import { ConvenioService } from '../services/convenio.service';

@Injectable()
@ValidatorConstraint({ name: 'IsConvenioActive', async: true })
export class IsConvenioActiveConstraint
  implements ValidatorConstraintInterface
{
  constructor(private convenioService: ConvenioService) {}
  async validate(
    convenio: Convenio,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    args: ValidationArguments,
  ): Promise<boolean> {
    try {
      return await this.convenioService.isActive(convenio);
    } catch (e) {
      return true;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Convenio não esta ativo`;
  }
}

export function IsConvenioActive(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsConvenioActiveConstraint,
    });
  };
}
