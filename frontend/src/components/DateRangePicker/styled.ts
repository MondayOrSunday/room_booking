import styled from 'styled-components'

export const Popover = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 100;
  background: #ffffff;
  border: 1px solid #bfc7d4;
  border-radius: 0.75rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: 20px;
  white-space: nowrap;

  .rdp-root {
    --rdp-accent-color: #005f9f;
    --rdp-accent-background-color: #d1e4ff;
    --rdp-range_middle-background-color: #d1e4ff;
    --rdp-day_button-border-radius: 6px;
    --rdp-months-gap: 2rem;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 14px;
    color: #141d21;
  }

  .rdp-month_caption {
    font-size: 16px;
    font-weight: 700;
    color: #141d21;
  }

  .rdp-weekday {
    font-size: 12px;
    font-weight: 600;
    color: #707884;
    opacity: 1;
  }

  .rdp-day_button {
    font-size: 14px;
    font-weight: 400;
    color: #141d21;
  }

  .rdp-today:not(.rdp-outside) {
    font-weight: 700;
  }

  .rdp-disabled {
    color: #bfc7d4;
  }

  .rdp-outside {
    color: #bfc7d4;
  }

  .rdp-chevron {
    fill: #005f9f;
  }

  .rdp-button_previous,
  .rdp-button_next {
    border-radius: 6px;
    transition: background 0.15s;
    &:hover {
      background: #ecf5fb;
    }
  }
`
