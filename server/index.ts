import { useRebar } from '@Server/index.js';
import * as alt from 'alt-server';
import { VehicleLockEvents } from '../shared/events.js';
import { VehicleLockConfig } from '../shared/config.js';

const Rebar = useRebar();

const useVehicleLock = () => {
    
    /**
     * Function to turn on and off vehicle blinkers.
     * @param vehicle Closest vehicle owned by Player
     */
async function turnBlinkersOn(vehicle: alt.Vehicle) {
    vehicle.lightState = 2;
    await alt.Utils.wait(300);
    vehicle.lightState = 1;
    await alt.Utils.wait(300);
    vehicle.lightState = 2;
    await alt.Utils.wait(300);
    vehicle.lightState = 1;
    await alt.Utils.wait(300);
    vehicle.lightState = 0;
}

    async function lockUnlock(player: alt.Player) {
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
                stateProps.lockState = 2;
            // await rPlayer.animation.playFinite('anim@mp_player_intmenu@key_fob@', 'fob_click_fp', 49, 1250, false);
                rPlayer.audio.playSound('sounds/vehicle-lock-unlock.ogg');
            alt.emitAllClients(VehicleLockEvents.toClient.playAnim, player, vehicle);
            await turnBlinkersOn(vehicle);
        } else {
                stateProps.lockState = 1;
            // await rPlayer.animation.playFinite('anim@mp_player_intmenu@key_fob@', 'fob_click_fp', 49, 1250, false);
                rPlayer.audio.playSound('sounds/vehicle-lock-unlock.ogg');
            alt.emitAllClients(VehicleLockEvents.toClient.playAnim, player, vehicle);
            await turnBlinkersOn(vehicle);
        }
        vehicle.lockState = stateProps.lockState;
        await vehicleDoc.set('stateProps', stateProps);
    } else {
        const keys = vehicleDoc.getField('keys');
        console.log(keys);
        // TODO: Implement keys system (Keys are an array with players _id)
    }
    }


    return {
        lockUnlock
    }
}

Rebar.useKeybinder().on(VehicleLockConfig.vehicleKey, useVehicleLock().lockUnlock);

