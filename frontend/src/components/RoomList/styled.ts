import styled from 'styled-components'

export const RoomItemButton = styled.button<{ $active: boolean; $booked?: boolean }>`
  text-align: left;
  width: 100%;
  padding: 12px;
  border-radius: 0.75rem;
  border: 1px solid ${({ $active }) => ($active ? '#005f9f' : '#bfc7d4')};
  background: ${({ $active, $booked }) =>
    $booked ? 'rgba(186, 26, 26, 0.12)' : $active ? 'rgba(0, 120, 199, 0.08)' : '#ffffff'};
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;

  &:hover {
    border-color: ${({ $active }) => ($active ? '#005f9f' : 'rgba(0, 95, 159, 0.4)')};
    background: ${({ $active, $booked }) =>
      $booked ? 'rgba(186, 26, 26, 0.15)' : $active ? 'rgba(0, 120, 199, 0.08)' : '#ecf5fb'};
  }
`
