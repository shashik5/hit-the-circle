import '/node_modules/jquery/dist/jquery.min.js';
import '/node_modules/bootstrap/dist/js/bootstrap.min.js';
import { HitTheCircle } from './game.js';


const $container = $('#appContainer');
new HitTheCircle($container);