import { effect } from "@loona/react";
import { EffectContext, Action } from "@loona/core";
import { TrackClick } from "./track-click.action";

export class TrackingEffects {
  @effect(TrackClick)
  trackClick(action: Action, _context: EffectContext) {
    console.log(
      `Tracking Effect: \n    Event: ${
        (action as TrackClick).event
      }; \n    Value: ${(action as TrackClick).value};`
    );
  }
}
