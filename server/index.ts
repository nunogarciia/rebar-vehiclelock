import { useRebar } from '@Server/index.js';
import * as alt from 'alt-server';

const Rebar = useRebar();

Rebar.useKeybinder().on(85, async (player: alt.Player) => {
    if (!player || !player.valid) return;
    const rPlayer = Rebar.usePlayer(player);
    if (!rPlayer.isValid()) return;

    const vehicle = rPlayer.get.closestVehicle();
    if (!vehicle || !Rebar.document.vehicle.useVehicle(vehicle).isValid()) {
        // No vehicle document bound
        return;
    }

    const vehicleDoc = Rebar.document.vehicle.useVehicle(vehicle);
    const owner = vehicleDoc.getField('owner');
    if (owner === rPlayer.character.getField('_id')) {
        const stateProps = vehicleDoc.getField('stateProps');
        if (stateProps.lockState == 1) {
            alt.setTimeout(async () => {
                stateProps.lockState = 2;
                rPlayer.audio.playSound('/sounds/vehicle-lock-unlock.ogg');

                vehicle.lightState = 2;
                await alt.Utils.wait(300);
                vehicle.lightState = 1;
                await alt.Utils.wait(300);
                vehicle.lightState = 2;
                await alt.Utils.wait(300);
                vehicle.lightState = 1;
                await alt.Utils.wait(300);
                vehicle.lightState = 0;
            }, 720);
            await rPlayer.animation.playFinite('anim@mp_player_intmenu@key_fob@', 'fob_click_fp', 49, 1250, false);
            // TODO: Dar fix na animação
        } else {
            alt.setTimeout(async () => {
                stateProps.lockState = 1;
                rPlayer.audio.playSound('/sounds/vehicle-lock-unlock.ogg');

                vehicle.lightState = 2;
                await alt.Utils.wait(300);
                vehicle.lightState = 1;
                await alt.Utils.wait(300);
                vehicle.lightState = 2;
                await alt.Utils.wait(300);
                vehicle.lightState = 1;
                await alt.Utils.wait(300);
                vehicle.lightState = 0;
            }, 720);
            await rPlayer.animation.playFinite('anim@mp_player_intmenu@key_fob@', 'fob_click_fp', 49, 1250, false);
        }
        vehicle.lockState = stateProps.lockState;
        await vehicleDoc.set('stateProps', stateProps);
    } else {
        const keys = vehicleDoc.getField('keys');
        console.log(keys);
        // TODO: Implementar as chames, "keys" é um array com ids de players
    }
});

// left headlight (headlight_l) = 1
// right headlight (headlight_r) = 2
// left taillight (taillight_l) = 3
// right taillight (taillight_l) = 4
// front left indicator (indicator_lf) = 5
// front right indicator (indicator_lr) = 6
// rear left indicator (indicator_lr) = 7
// rear right indicator (indicator_rr) = 8
// left brakelight (brakelight_l) = 9
// right brakelight (brakelight_r) = 10
// middle brakelight (brakelight_m) = 11
// left reverse light (reversinglight_l) = 12
// right reverse light (reversinglight_r) = 13
// extra light 1 (extralight_1) = 14
// extra light 2 (extralight_2) = 15
