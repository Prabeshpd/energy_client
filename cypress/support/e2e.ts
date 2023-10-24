import { configure } from '@testing-library/cypress';

import './commands';
import './types';

configure({ testIdAttribute: 'data-test-id' });
