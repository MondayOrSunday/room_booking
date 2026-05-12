import styled from 'styled-components'

const AVATAR_COLORS = [
  '#005f9f', '#36618d', '#904900', '#1b7a3e',
  '#6a1b9a', '#ad1457', '#00695c', '#bf360c',
]

export const AvatarCircle = styled.div<{ $name: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  background: ${({ $name }) => {
    let hash = 0
    for (let i = 0; i < $name.length; i++) hash = $name.charCodeAt(i) + ((hash << 5) - hash)
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
  }};
`
