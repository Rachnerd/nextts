import * as React from "react";
import { Action } from "@loona/react";
import { SelectViewMode } from "../states/select-view-mode.action";

interface SearchResultsSelectViewModeProps {
  viewMode: string;
  disabled?: boolean;
}

export const SearchResultsSelectViewMode = ({
  viewMode,
  disabled = false
}: SearchResultsSelectViewModeProps) => (
  <Action>
    {dispatch => (
      <button
        onClick={() =>
          dispatch(new SelectViewMode({
            viewMode
          }) as any)
        }
        disabled={disabled}
      >
        {viewMode}
      </button>
    )}
  </Action>
);
