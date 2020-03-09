import React, { PureComponent } from 'react';
import styled from '@emotion/styled/macro';

const StyledLabel = styled('label')`
  display: flex;
  flex-direction: column;
  font-size: 13px;
`;

const Input = styled('input')`
  font: inherit;
  box-sizing: border-box;
  padding: 10px 18px;
  min-width: 300px;
  border: 1px solid #2b3553;
  box-shadow: none;
  border-radius: 0.4285rem;
  background-color: transparent;
  border-color: #2b3553;
  margin: 10px 0px 20px;
  cursor: text;
  font-size: 16px;
  // color: rgba(255, 255, 255, 0.6);
  -webkit-appearance: none;
  transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out,
    background-color 0.3s ease-in-out;

  &::placeholder {
    // color: rgba(255, 255, 255, 0.3);
    font-size: 13px;
  }

  &:focus {
    border-color: #0093fe;
    background: transparent;
    outline: 0 !important;
  }
`;

class LabeledInput extends PureComponent {
  static defaultProps = {
    type: 'text'
  };
  
  state = {};

  render() {
    const { label, ...rest } = this.props;
    return (
      <StyledLabel>
        {label}
        <Input {...rest}/>
      </StyledLabel>
    );
  }
}

LabeledInput.createInputHandler = setter => event => {
  setter(event.target.value);
};

export default LabeledInput;
