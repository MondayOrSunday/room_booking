import styled from 'styled-components'

export const FormInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 40px;
  background: #ffffff;
  border: 1px solid #bfc7d4;
  border-radius: 0.25rem;
  font-size: 16px;
  line-height: 24px;
  color: #141d21;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s, box-shadow 0.15s;
  font-family: 'Inter', system-ui, sans-serif;

  &:focus {
    border-color: #005f9f;
    box-shadow: 0 0 0 1px #005f9f;
  }

  &[aria-invalid='true'] {
    border-color: #ba1a1a;
  }

  &:disabled {
    background: #e6eff5;
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #707884;
  }
`

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  background: #ffffff;
  border: 1px solid #bfc7d4;
  border-radius: 0.25rem;
  font-size: 16px;
  line-height: 24px;
  color: #141d21;
  outline: none;
  box-sizing: border-box;
  resize: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  font-family: 'Inter', system-ui, sans-serif;

  &:focus {
    border-color: #005f9f;
    box-shadow: 0 0 0 1px #005f9f;
  }

  &:disabled {
    background: #e6eff5;
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #707884;
  }
`
