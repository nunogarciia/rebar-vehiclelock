import * as alt from 'alt-client';
import * as native from 'natives';
import { VehicleLockEvents } from '../shared/events.js';

alt.onServer(VehicleLockEvents.toClient.playAnim, (player: alt.Player, vehicle: alt.Vehicle) => {
    native.taskPlayAnim(
        player,
        'anim@mp_player_intmenu@key_fob@',
        'fob_click_fp',
        3,
        3,
        1250,
        49,
        1,
        false,
        false,
        false,
    );
});
