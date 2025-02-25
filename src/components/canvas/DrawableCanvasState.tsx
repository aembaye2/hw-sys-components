//DrawableCanvasState.tsx
"use client";
import React, {
  createContext,
  useReducer,
  useContext,
  useCallback,
} from "react";

import { isEmpty, isEqual } from "lodash";

const HISTORY_MAX_COUNT = 100;

interface CanvasHistory {
  undoStack: Object[]; // store previous canvas states
  redoStack: Object[]; // store undone canvas states
}

interface CanvasAction {
  shouldReloadCanvas: boolean; // reload currentState into app canvas, on undo/redo
}

const NO_ACTION: CanvasAction = {
  shouldReloadCanvas: false,
};

const RELOAD_CANVAS: CanvasAction = {
  shouldReloadCanvas: true,
};

interface CanvasState {
  history: CanvasHistory;
  action: CanvasAction;
  initialState: Object; // first currentState for app
  currentState: Object; // current canvas state as canvas.toJSON()
}

interface Action {
  type: "save" | "undo" | "redo" | "reset";
  state?: Object;
}

const canvasStateReducer = (
  state: CanvasState,
  action: Action
): CanvasState => {
  switch (action.type) {
    case "save":
      if (!action.state) throw new Error("No action state to save");
      if (isEmpty(state.currentState)) {
        return {
          history: {
            undoStack: [],
            redoStack: [],
          },
          action: { ...NO_ACTION },
          initialState: action.state,
          currentState: action.state,
        };
      } else if (isEqual(action.state, state.currentState)) {
        return {
          history: { ...state.history },
          action: { ...NO_ACTION },
          initialState: state.initialState,
          currentState: state.currentState,
        };
      } else {
        const undoOverHistoryMaxCount =
          state.history.undoStack.length >= HISTORY_MAX_COUNT;
        return {
          history: {
            undoStack: [
              ...state.history.undoStack.slice(undoOverHistoryMaxCount ? 1 : 0),
              state.currentState,
            ],
            redoStack: [],
          },
          action: { ...NO_ACTION },
          initialState:
            state.initialState == null
              ? state.currentState
              : state.initialState,
          currentState: action.state,
        };
      }
    case "undo":
      if (state.history.undoStack.length === 0) {
        return {
          history: { ...state.history },
          action: { ...NO_ACTION },
          initialState: state.initialState,
          currentState: state.currentState,
        };
      } else {
        const lastState =
          state.history.undoStack[state.history.undoStack.length - 1];
        return {
          history: {
            undoStack: state.history.undoStack.slice(0, -1),
            redoStack: [...state.history.redoStack, state.currentState],
          },
          action: { ...RELOAD_CANVAS },
          initialState: state.initialState,
          currentState: lastState,
        };
      }
    case "redo":
      if (state.history.redoStack.length > 0) {
        const nextState =
          state.history.redoStack[state.history.redoStack.length - 1];
        return {
          history: {
            undoStack: [...state.history.undoStack, state.currentState],
            redoStack: state.history.redoStack.slice(0, -1),
          },
          action: { ...RELOAD_CANVAS },
          initialState: state.initialState,
          currentState: nextState,
        };
      } else {
        return {
          history: { ...state.history },
          action: { ...NO_ACTION },
          initialState: state.initialState,
          currentState: state.currentState,
        };
      }
    case "reset":
      if (!action.state) throw new Error("No action state to store in reset");
      return {
        history: {
          undoStack: [],
          redoStack: [],
        },
        action: { ...RELOAD_CANVAS },
        initialState: action.state,
        currentState: action.state,
      };
    default:
      throw new Error("TS should protect from this");
  }
};

const initialState: CanvasState = {
  history: {
    undoStack: [],
    redoStack: [],
  },
  action: {
    shouldReloadCanvas: false,
  },
  initialState: {},
  currentState: {},
};

interface CanvasStateContextProps {
  canvasState: CanvasState;
  saveState: (state: Object) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  resetState: (state: Object) => void;
}

const CanvasStateContext = createContext<CanvasStateContextProps>(
  {} as CanvasStateContextProps
);

export const CanvasStateProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [canvasState, dispatch] = useReducer(canvasStateReducer, initialState);

  // Setup our callback functions for saving I think the canvas
  const saveState = useCallback(
    (state: Object) => {
      dispatch({ type: "save", state });
    },
    [dispatch]
  );

  const undo = useCallback(() => {
    dispatch({ type: "undo" });
  }, [dispatch]);

  const redo = useCallback(() => {
    dispatch({ type: "redo" });
  }, [dispatch]);

  const resetState = useCallback(
    (state: Object) => {
      dispatch({ type: "reset", state });
    },
    [dispatch]
  );

  const canUndo = canvasState.history.undoStack.length > 0;
  const canRedo = canvasState.history.redoStack.length > 0;

  return (
    <CanvasStateContext.Provider
      value={{
        canvasState,
        saveState,
        undo,
        redo,
        canUndo,
        canRedo,
        resetState,
      }}
    >
      {children}
    </CanvasStateContext.Provider>
  );
};

/**
 * Hook to get data out of context
 */
export const useCanvasState = () => {
  return useContext(CanvasStateContext);
};
