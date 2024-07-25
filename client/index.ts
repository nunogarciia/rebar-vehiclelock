import * as alt from 'alt-client';
import * as native from 'natives';
import { VehicleLockEvents } from '../shared/events.js';

alt.onServer(
    VehicleLockEvents.toClient.playAnim,
    async (player: alt.Player, vehicle: alt.Vehicle, soundName: string) => {
        const sound = soundName.split(' ');
        native.playSoundFromEntity(native.getSoundId(), sound[0], vehicle, sound[1], true, 0);
        await alt.Utils.wait(350);
        native.playSoundFromEntity(native.getSoundId(), sound[0], vehicle, sound[1], true, 0);
    },
);
