import G6, { Util } from '@antv/g6';
import { CustomDagreLayout } from './components/Layout';

G6.registerLayout('lineageLayout', CustomDagreLayout);