import $ from 'jquery';

import Cashdrawer from './modules/Cashdrawer';

function init () {
    Cashdrawer([0, 2, 2, 1, 5, 25, 12, 10, 20, 100])
}

$(document).ready(init)
