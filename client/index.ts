import * as alt from 'alt-client';
import * as native from 'natives';
import { VehicleLockEvents } from '../shared/events.js';

alt.onServer(VehicleLockEvents.toClient.playAnim, async (player: alt.Player, vehicle: alt.Vehicle) => {
    native.taskPlayAnim(
        player,
        'anim@mp_player_intmenu@key_fob@',
        'fob_click_fp',
        8.0,
        8.0,
        1250,
        1,
        1.0,
        false,
        false,
        false,
    );
    native.playSoundFromEntity(
        native.getSoundId(),
        'Bomb_Countdown_Beep',
        vehicle,
        'DLC_MPSUM2_ULP2_Rogue_Drones',
        true,
        0,
    );
    await alt.Utils.wait(350);
    native.playSoundFromEntity(
        native.getSoundId(),
        'Bomb_Countdown_Beep',
        vehicle,
        'DLC_MPSUM2_ULP2_Rogue_Drones',
        true,
        0,
    );
});
