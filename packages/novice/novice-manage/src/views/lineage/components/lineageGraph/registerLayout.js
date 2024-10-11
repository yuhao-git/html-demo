import G6, { Util } from '@antv/g6';
import  CustomDagreLayout  from './components/Layout/CustomDagreLayout.js';

G6.registerLayout('lineageLayout', CustomDagreLayout);