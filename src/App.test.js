import { render, screen , fireEvent} from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpace } from './App';

test('button has correct initial color', () => {
  render(<App/>);
  // find an element with a role of button and text of 'change to MidnightBlue'
   const colorButton = screen.getByRole('button' , { name: 'Change to MidnightBlue'});

  // expect the background color to be MediumVioletRed
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed'})

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be MidnightBlue
  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue'});

  // expect the button text to be 'change to MediumVioletRed'
  expect(colorButton.textContent).toBe('Change to MediumVioletRed');

});

test('initial conditions', () => {
  render(<App />);

  // check that the button starts out enabled
  const colorButton = screen.getByRole('button',{name: 'Change to MidnightBlue'});
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('Checkbox disables button on first click and enables on second click' , () => {
render(<App />);
const checkbox = screen.getByRole('checkbox', { name: 'Disable button'});
const Button = screen.getByRole('button', { name: 'Change to MidnightBlue'});

fireEvent.click(checkbox);
expect(Button).toBeDisabled();

fireEvent.click(checkbox);
expect(Button).toBeEnabled();
});

test('Disabled button has grey background and reverts to MediumVioletRed', () => {
  render(<App />)
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
  const colorButton = screen.getByRole('button', { name: 'Change to MidnightBlue'});

  // disable button 
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: gray');

  // re-enable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: MediumVioletRed');
});

test('Clicked disabled button has gray background and reverts to MidnightBlue' , () => {
  render(<App />)
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
  const colorButton = screen.getByRole('button', {name: 'Change to MidnightBlue'});

  // change button to MidnightBlue
  fireEvent.click(colorButton);

  // disable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: gray');

  // re-enable button 
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: MidnightBlue');
});


// UNIT TESTING FUNCTION

describe('spaces before camel-case letter' , () =>{
  test('works for no inner capital letters' , () => {
    expect(replaceCamelWithSpace('MediumVioletRed')).toBe('MediumVioletRed');
  });
  test('Works for one inner capital letter' , () =>{
    expect(replaceCamelWithSpace('MidnightBlue')).toBe('MidnightBlue');
  });
  test('Works for multiple inner capital letters' , () => {
    expect(replaceCamelWithSpace('MediumVioletRed')).toBe('MediumVioletRed');
  });
});