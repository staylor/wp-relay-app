import { injectIntl as inject } from 'react-intl';

export const injectIntl = spec => component => inject(component, spec);
