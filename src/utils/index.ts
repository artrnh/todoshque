import { FormApi } from 'final-form';
import * as _ from 'lodash';
import { ITaskEditFormFields } from 'Stores/TaskStore';

export const normalizeFFValues = (form: FormApi): ITaskEditFormFields =>
  form
    .getRegisteredFields()
    .reduce(
      (acc, field) =>
        _.isUndefined(form.getFieldState(field).value)
          ? { ...acc, [field]: '' }
          : { ...acc, [field]: form.getFieldState(field).value },
      {} as ITaskEditFormFields,
    );
