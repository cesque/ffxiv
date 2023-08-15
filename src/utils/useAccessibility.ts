import { KeyboardEvent, UIEventHandler } from "react";

export default function useAccessibility(callback: UIEventHandler) {
    return {
        role: 'button',
        onClick: callback,
        tabIndex: 0,
        onKeyDown: (event: KeyboardEvent) => {
            if (event.key === 'Enter' || event.key === 'Space') callback(event)
        }
    }
}
